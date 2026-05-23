// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HYPERION-20 Token Standard
 * @author Hyperion Trust Legal & Compliance Division
 * @notice An institutional-grade extension of the ERC-20 token standard designed specifically 
 * for tokenized real-world assets. Integrates compliance whitelisting, configurable 
 * secondary transaction volume fees, a centralized liquidation freeze mechanic, 
 * and onchain stablecoin redemption claiming while maintaining historical balances as mementos.
 */
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract Hyperion20 is IERC20Metadata {
    // --- ERC-20 State Variables ---
    string private _name;
    string private _symbol;
    uint8 private constant _decimals = 18;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // --- Roles and Governance ---
    address public owner;
    address public complianceOfficer;

    // --- Compliance Whitelisting ---
    mapping(address => bool) public isWhitelisted;

    // --- Secondary Market Fee Configuration ---
    uint256 public tradingFeeBps; // Capped at 150 Bps (1.5%)
    address public feeRecipient;
    mapping(address => bool) public isFeeExempt;

    // --- Central Liquidation & Mementos State ---
    bool public isFrozen;
    uint256 public liquidationUsdcPerToken; // Amount of USDC (6 decimals) per 1 full token (18 decimals)
    address public usdcTokenAddress;
    mapping(address => bool) public hasRedeemed;

    // --- Events ---
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ComplianceOfficerUpdated(address indexed previousOfficer, address indexed newOfficer);
    event WhitelistStatusUpdated(address indexed account, bool status);
    event TradingFeeUpdated(uint256 bps, address recipient);
    event FeeExemptionUpdated(address indexed account, bool isExempt);
    event LiquidationTriggered(uint256 usdcPayoutPerToken, address usdcAssetAddress);
    event LiquidationRedeemed(address indexed investor, uint256 tokenBalance, uint256 usdcPayoutClaimed);

    // --- Modifiers ---
    modifier onlyOwner() {
        require(msg.sender == owner, "Hyperion20: caller is not the owner");
        _;
    }

    modifier onlyCompliance() {
        require(
            msg.sender == complianceOfficer || msg.sender == owner,
            "Hyperion20: caller is not the compliance officer"
        );
        _;
    }

    modifier whenNotFrozen() {
        require(!isFrozen, "Hyperion20: transfers are frozen due to liquidation");
        _;
    }

    /**
     * @notice Initializes the HYPERION-20 property token.
     * @param name_ Name of the property asset token (e.g. "Hyperion Dubai Tower 1")
     * @param symbol_ Symbol of the property asset token (e.g. "HPR-D1")
     * @param initialSupply_ Initial total supply minted to the treasury/owner (18 decimal scaling)
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_
    ) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
        complianceOfficer = msg.sender;

        // Exempt system roles from fees
        isFeeExempt[msg.sender] = true;
        isFeeExempt[address(this)] = true;

        // Auto-whitelist treasury
        isWhitelisted[msg.sender] = true;
        isWhitelisted[address(this)] = true;

        // Mint initial supply
        _totalSupply = initialSupply_;
        _balances[msg.sender] = initialSupply_;
        emit Transfer(address(0), msg.sender, initialSupply_);
    }

    // --- ERC-20 Metadata ---
    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function decimals() public pure override returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    // --- ERC-20 Interface Implementations ---
    function transfer(address to, uint256 value) public override whenNotFrozen returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function allowance(address owner_, address spender) public view override returns (uint256) {
        return _allowances[owner_][spender];
    }

    function approve(address spender, uint256 value) public override returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public override whenNotFrozen returns (bool) {
        _spendAllowance(from, msg.sender, value);
        _transfer(from, to, value);
        return true;
    }

    // --- Governance and Roles Functions ---
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Hyperion20: new owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        isFeeExempt[newOwner] = true;
        isWhitelisted[newOwner] = true;
    }

    function setComplianceOfficer(address newOfficer) external onlyOwner {
        require(newOfficer != address(0), "Hyperion20: new compliance officer is zero address");
        emit ComplianceOfficerUpdated(complianceOfficer, newOfficer);
        complianceOfficer = newOfficer;
        isWhitelisted[newOfficer] = true;
    }

    // --- Compliance Whitelist Management ---
    function setWhitelistStatus(address account, bool status) external onlyCompliance {
        require(account != address(0), "Hyperion20: invalid address");
        isWhitelisted[account] = status;
        emit WhitelistStatusUpdated(account, status);
    }

    function setWhitelistStatusBatch(address[] calldata accounts, bool status) external onlyCompliance {
        for (uint256 i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            require(account != address(0), "Hyperion20: invalid address in batch");
            isWhitelisted[account] = status;
            emit WhitelistStatusUpdated(account, status);
        }
    }

    // --- Trading Fee Management ---
    /**
     * @notice Updates the transaction volume fee.
     * @param bps Fee basis points (e.g. 150 Bps = 1.5% maximum)
     * @param recipient Address where secondary fees are forwarded (e.g. platform treasury)
     */
    function updateTradingFee(uint256 bps, address recipient) external onlyOwner {
        require(bps <= 150, "Hyperion20: fee cannot exceed 1.5% (150 Bps)");
        require(recipient != address(0), "Hyperion20: invalid fee recipient address");
        tradingFeeBps = bps;
        feeRecipient = recipient;
        emit TradingFeeUpdated(bps, recipient);
    }

    function setFeeExemption(address account, bool isExempt) external onlyOwner {
        isFeeExempt[account] = isExempt;
        emit FeeExemptionUpdated(account, isExempt);
    }

    // --- Centralized Liquidation & Memento Mechanism ---
    /**
     * @notice Triggers absolute property liquidation. 
     * Freezes all transfers forever, converting tokens into non-transferable mementos.
     * Establishes the stablecoin redemption price.
     * @param usdcPayoutPerToken_ Redemption rate of USDC (6 decimals) per 1 full token (18 decimals)
     * @param usdcAddress_ Address of the USDC stablecoin ERC-20 contract
     */
    function triggerLiquidationFreeze(
        uint256 usdcPayoutPerToken_,
        address usdcAddress_
    ) external onlyOwner whenNotFrozen {
        require(usdcAddress_ != address(0), "Hyperion20: invalid USDC address");
        require(usdcPayoutPerToken_ > 0, "Hyperion20: invalid payout rate");

        isFrozen = true;
        liquidationUsdcPerToken = usdcPayoutPerToken_;
        usdcTokenAddress = usdcAddress_;

        emit LiquidationTriggered(usdcPayoutPerToken_, usdcAddress_);
    }

    /**
     * @notice Claims pro-rata liquidation stablecoin proceeds.
     * Checks token balance and transfers the pro-rata USDC amount to the user.
     * User's token balance remains untouched in their wallet as a permanent digital memento, 
     * but their claim status in the `hasRedeemed` registry is permanently checked.
     */
    function redeemLiquidationPayout() external {
        require(isFrozen, "Hyperion20: liquidation has not been triggered");
        require(!hasRedeemed[msg.sender], "Hyperion20: payout already redeemed by caller");

        uint256 investorBalance = _balances[msg.sender];
        require(investorBalance > 0, "Hyperion20: caller holds no tokens");

        // Calculate payout (USDC is 6 decimals, token is 18 decimals)
        // payout = (token balance * rate) / 10^18
        uint256 payoutAmount = (investorBalance * liquidationUsdcPerToken) / 1e18;
        require(payoutAmount > 0, "Hyperion20: redemption payout amount rounds to zero");

        // Mark as redeemed first to prevent re-entrancy
        hasRedeemed[msg.sender] = true;

        // Execute stablecoin transfer from this contract
        IERC20 usdcToken = IERC20(usdcTokenAddress);
        require(
            usdcToken.transfer(msg.sender, payoutAmount),
            "Hyperion20: stablecoin transfer failed"
        );

        emit LiquidationRedeemed(msg.sender, investorBalance, payoutAmount);
    }

    // --- Internal Helpers ---
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal {
        require(from != address(0), "Hyperion20: transfer from the zero address");
        require(to != address(0), "Hyperion20: transfer to the zero address");

        // Enforce compliance whitelisting on standard transfers
        require(isWhitelisted[from], "Hyperion20: sender is not KYC/AML whitelisted");
        require(isWhitelisted[to], "Hyperion20: recipient is not KYC/AML whitelisted");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "Hyperion20: transfer amount exceeds balance");

        uint256 feeAmount = 0;

        // Calculate secondary market trading fee if applicable
        if (tradingFeeBps > 0 && !isFeeExempt[from] && !isFeeExempt[to]) {
            feeAmount = (amount * tradingFeeBps) / 10000;
        }

        unchecked {
            _balances[from] = fromBalance - amount;
        }

        if (feeAmount > 0) {
            uint256 netAmount = amount - feeAmount;
            _balances[to] += netAmount;
            _balances[feeRecipient] += feeAmount;
            
            emit Transfer(from, to, netAmount);
            emit Transfer(from, feeRecipient, feeAmount);
        } else {
            _balances[to] += amount;
            emit Transfer(from, to, amount);
        }
    }

    function _approve(
        address owner_,
        address spender,
        uint256 value
    ) internal {
        require(owner_ != address(0), "Hyperion20: approve from the zero address");
        require(spender != address(0), "Hyperion20: approve to the zero address");

        _allowances[owner_][spender] = value;
        emit Approval(owner_, spender, value);
    }

    function _spendAllowance(
        address owner_,
        address spender,
        uint256 amount
    ) internal {
        uint256 currentAllowance = _allowances[owner_][spender];
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "Hyperion20: insufficient allowance");
            unchecked {
                _approve(owner_, spender, currentAllowance - amount);
            }
        }
    }
}

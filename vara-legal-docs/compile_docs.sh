#!/bin/bash

# ==============================================================================
# HYPERION REALTY - VARA REGULATORY FILINGS AUTOMATED BUILD PIPELINE
# ==============================================================================
# This script compiles the LaTeX source filings into premium corporate PDFs 
# using the self-contained Tectonic compiler engine.
# ==============================================================================

# Set strict shell parameters
set -e

# Output Colors
GOLD='\033[0;33m'
CHARCOAL='\033[0;90m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print Header
echo -e "${GOLD}======================================================================${NC}"
echo -e "${GOLD}         HYPERION REALTY — VARA DUBAI COMPLIANCE COMPILATION          ${NC}"
echo -e "${GOLD}======================================================================${NC}"
echo -e "${CHARCOAL}Initiating Fortune-500 level PDF compilation...${NC}"
echo ""

# Verify compiler is present
if ! command -v tectonic &> /dev/null; then
    echo -e "${RED}[ERROR] Tectonic compiler was not found on this system.${NC}"
    echo -e "Please install tectonic using: ${GOLD}brew install tectonic${NC}"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Tectonic compiler verified."

# Create output folder if not exists
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

OUTPUT_DIR="compiled"
mkdir -p "$OUTPUT_DIR"
echo -e "${GREEN}[OK]${NC} Output directory '${GOLD}${OUTPUT_DIR}/${NC}' prepared."
echo ""

# List of documents to compile
DOCUMENTS=(
    "1_regulatory_business_plan"
    "2_aml_kyc_compliance_policy"
    "3_technology_key_management"
    "4_fit_proper_governance"
    "5_regulatory_standards_mapping"
    "6_letter_of_intent"
)

# Compilation Loop
for DOC in "${DOCUMENTS[@]}"; do
    echo -e "${GOLD}>>> Compiling: ${DOC}.tex${NC}"
    if [ -f "${DOC}.tex" ]; then
        # Run Tectonic compilation
        # Tectonic runs cleanly without leaving standard LaTeX clutter (aux, log, etc.)
        if tectonic "${DOC}.tex"; then
            echo -e "${GREEN}[SUCCESS]${NC} Compiled ${DOC}.pdf successfully."
            # Move compiled PDF to outputs
            mv "${DOC}.pdf" "${OUTPUT_DIR}/"
            echo -e "${CHARCOAL}Moved ${DOC}.pdf to ${OUTPUT_DIR}/${NC}"
        else
            echo -e "${RED}[FAILED]${NC} Tectonic compilation failed for ${DOC}.tex"
            exit 1
        fi
    else
        echo -e "${RED}[ERROR] File ${DOC}.tex does not exist.${NC}"
        exit 1
    fi
    echo ""
done

# Print Summary Dashboard
echo -e "${GOLD}======================================================================${NC}"
echo -e "${GREEN}                  COMPILATION COMPLETE — SUMMARY                      ${NC}"
echo -e "${GOLD}======================================================================${NC}"
echo -e "All documents compiled successfully and are saved in the Git-ignored"
echo -e "directory: ${GOLD}vara-legal-docs/compiled/${NC}"
echo ""
for DOC in "${DOCUMENTS[@]}"; do
    if [ -f "${OUTPUT_DIR}/${DOC}.pdf" ]; then
        SIZE=$(du -h "${OUTPUT_DIR}/${DOC}.pdf" | cut -f1)
        echo -e " - ${GOLD}${DOC}.pdf${NC} (${SIZE})"
    fi
done
echo -e "${GOLD}======================================================================${NC}"
echo -e "${CHARCOAL}Classification: STRICTLY CONFIDENTIAL // VARA REGULATORY FILING${NC}"
echo -e "${GOLD}======================================================================${NC}"

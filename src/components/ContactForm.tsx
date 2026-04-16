'use client';

import { useEffect, useRef } from 'react';

interface ContactFormProps {
    themeColor?: string;
}

export default function ContactForm({ themeColor = '#d4af37' }: ContactFormProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const formSlug = "hyperion-realty-contact-form-45b08318";

    useEffect(() => {
        if (!containerRef.current) return;
        if (containerRef.current.querySelector('form')) return;

        const apiEndpoint = "https://crm.basalthq.com/api/forms/submit";

        const theme = {
            primaryColor: themeColor,
            backgroundColor: "rgba(13, 8, 0, 0.6)",
            textColor: "#ffffff",
            borderColor: "rgba(212, 175, 55, 0.2)",
            borderRadius: "12px",
            fontFamily: "inherit",
            buttonTextColor: "#000000",
            labelColor: "#f3e5ab",
            inputBgColor: "rgba(0, 0, 0, 0.6)"
        };

        const form = document.createElement("form");
        form.id = "crm-form-" + formSlug;
        form.enctype = "multipart/form-data";
        form.style.cssText = `display:grid; grid-template-columns: repeat(12, 1fr); column-gap: 20px; row-gap: 24px; max-width:800px; margin:0 auto; font-family:${theme.fontFamily}; background:${theme.backgroundColor}; padding:40px; border-radius:${theme.borderRadius}; border: 1px solid ${theme.borderColor}; backdrop-filter: blur(10px); box-shadow: 0 0 20px rgba(0,0,0,0.5); transition: box-shadow 0.3s ease;`;

        const countryOptions = [
            "United States", "Canada", "United Kingdom", "Australia",
            "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (DRC)", "Congo (Republic)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "The Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "South Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Other"
        ];

        const interestOptions = [
            "Fractional Ownership",
            "Commercial Property Yields",
            "Residential Portfolios",
            "Governance & DAO",
            "Tokenizing My Own Asset",
            "Strategic Partnership"
        ];

        const fields = [
            { "name": "first_name", "label": "First Name", "type": "text", "required": false, "placeholder": "Enter your first name", "span": 6 },
            { "name": "last_name", "label": "Last Name", "type": "text", "required": false, "placeholder": "Enter your last name", "span": 6 },
            { "name": "email", "label": "Email Address", "type": "email", "required": true, "placeholder": "your.email@example.com", "span": 6 },
            { "name": "phone", "label": "Phone Number", "type": "phone", "required": false, "placeholder": "(555) 123-4567", "span": 6 },
            { "name": "company", "label": "Company or Organization", "type": "text", "required": false, "placeholder": "e.g., Atlas Capital Partners", "span": 6 },
            { "name": "website", "label": "Company Website (optional)", "type": "text", "required": false, "placeholder": "https://yourcompany.com", "span": 6 },
            { "name": "country", "label": "Country", "type": "select", "required": false, "placeholder": null, "span": 6, "options": countryOptions },
            { "name": "interest_type", "label": "Interest in Tokenized Real Estate", "type": "select", "required": false, "placeholder": null, "span": 6, "options": interestOptions },
            { "name": "investment_amount", "label": "Target Investment Range", "type": "text", "required": false, "placeholder": "e.g., $50,000 - $100,000", "span": 6 },
            { "name": "additional_info", "label": "Any Additional Information", "type": "textarea", "required": false, "placeholder": "Tell us about your investment goals or specific properties you're interested in...", "span": 12 }
        ];

        const allInputs: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[] = [];

        fields.forEach(function (field, index) {
            const wrapper = document.createElement("div");
            wrapper.style.gridColumn = `span ${field.span || 12}`;
            wrapper.style.position = "relative";
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";

            const label = document.createElement("label");
            label.textContent = field.label + (field.required ? " *" : "");
            label.style.cssText = "display:block;margin-bottom:8px;font-weight:600;color:" + theme.labelColor + ";font-size:11px;letter-spacing: 0.15em;text-transform:uppercase;transition:color 0.3s ease;";
            wrapper.appendChild(label);

            let input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

            if (field.type === "textarea") {
                input = document.createElement("textarea");
                input.rows = 4;
                input.style.cssText = "width:100%;padding:14px 16px;border:1px solid " + theme.borderColor + ";border-radius:4px;font-size:14px;background:" + theme.inputBgColor + ";color:" + theme.textColor + ";box-sizing:border-box;outline:none;transition:all 0.3s ease;resize:vertical;";
            } else if (field.type === "select") {
                input = document.createElement("select");
                const options = (field as any).options || [];
                const defaultOpt = document.createElement("option");
                defaultOpt.text = "Select an option...";
                defaultOpt.value = "";
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                input.appendChild(defaultOpt);
                options.forEach((opt: string) => {
                    const el = document.createElement("option");
                    el.text = opt;
                    el.value = opt;
                    el.style.backgroundColor = "#1a1a1a";
                    el.style.color = theme.textColor;
                    input.appendChild(el);
                });
                input.style.cssText = "width:100%;padding:14px 16px;border:1px solid " + theme.borderColor + ";border-radius:4px;font-size:14px;background:" + theme.inputBgColor + ";color:" + theme.textColor + ";box-sizing:border-box;outline:none;transition:all 0.3s ease;cursor:pointer;";
            } else {
                input = document.createElement("input");
                input.type = field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text";
                input.style.cssText = "width:100%;padding:14px 16px;border:1px solid " + theme.borderColor + ";border-radius:4px;font-size:14px;background:" + theme.inputBgColor + ";color:" + theme.textColor + ";box-sizing:border-box;outline:none;transition:all 0.3s ease;";
            }

            input.name = field.name;
            input.required = field.required;
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                if (field.placeholder) input.placeholder = field.placeholder;
            }

            if (field.name === 'phone' && input instanceof HTMLInputElement) {
                input.addEventListener('input', (e) => {
                    const target = e.target as HTMLInputElement;
                    let x = target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                    if (x) {
                        target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
                    }
                });
            }

            if (field.name === 'investment_amount' && input instanceof HTMLInputElement) {
                input.addEventListener('input', (e) => {
                    const target = e.target as HTMLInputElement;
                    let cleaned = target.value.replace(/[^\d-]/g, '');
                    let parts = cleaned.split('-');
                    let formatted = parts.map((p, i) => {
                        if (p) return '$' + parseInt(p, 10).toLocaleString('en-US');
                        return '';
                    });
                    
                    if (cleaned.includes('-')) {
                        target.value = formatted[0] + ' - ' + (formatted[1] || '');
                    } else {
                        target.value = formatted[0] || '';
                    }
                });
            }

            input.onfocus = () => {
                input.style.borderColor = theme.primaryColor;
                input.style.boxShadow = `0 0 15px ${theme.primaryColor}20`;
                label.style.color = theme.primaryColor;
            };
            input.onblur = () => {
                input.style.borderColor = theme.borderColor;
                input.style.boxShadow = "none";
                label.style.color = theme.labelColor;
            };

            allInputs.push(input);
            wrapper.appendChild(input);
            form.appendChild(wrapper);
        });

        const submit = document.createElement("button");
        submit.type = "submit";
        submit.textContent = "SUBMIT INQUIRY";
        submit.style.cssText = "background:" + theme.primaryColor + ";color:" + theme.buttonTextColor + ";border:none;padding:16px 28px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700;width:100%;margin-top:16px;letter-spacing:0.1em;text-transform:uppercase;transition:all 0.3s ease;";

        const submitWrapper = document.createElement("div");
        submitWrapper.style.gridColumn = "span 12";
        submitWrapper.appendChild(submit);
        form.appendChild(submitWrapper);

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            submit.disabled = true;
            submit.textContent = "TRANSMITTING...";
            
            const formData = new FormData(form);
            formData.append("form_slug", formSlug);
            formData.append("source_url", window.location.href);
            if (document.referrer) formData.append("referrer", document.referrer);
            
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has("utm_source")) formData.append("utm_source", urlParams.get("utm_source")!);
            if (urlParams.has("utm_medium")) formData.append("utm_medium", urlParams.get("utm_medium")!);
            if (urlParams.has("utm_campaign")) formData.append("utm_campaign", urlParams.get("utm_campaign")!);

            fetch(apiEndpoint, {
                method: "POST",
                body: formData
            })
            .then(async (response) => {
                if (response.ok) {
                    form.innerHTML = `<div style='grid-column:span 12;text-align:center;padding:40px;'><div style='margin-bottom:20px;display:flex;justify-content:center;'><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.primaryColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><h3 style='color:${theme.primaryColor};font-size:24px;margin-bottom:12px;font-weight:bold;'>ENTRY RECORDED</h3><p style='color:#fff;opacity:0.8;'>Your interest has been ledgered.</p></div>`;
                    return;
                }
                throw new Error("Server error");
            })
            .catch(() => {
                alert("Submission failed");
                submit.disabled = false;
                submit.textContent = "SUBMIT INQUIRY";
            });
        });

        containerRef.current.appendChild(form);
    }, [themeColor]);

    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4 uppercase">
                    Build Your <span className="text-hr-gold">Global Portfolio</span>
                </h2>
                <p className="text-gray-400 mb-12 font-light">
                    Ready to scale your real estate investments on the blockchain? Tell us your strategy.
                </p>
                <div id={"form-" + formSlug} ref={containerRef} className="w-full mx-auto" />
            </div>
        </section>
    );
}

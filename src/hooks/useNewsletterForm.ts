'use client';

import { useState, useCallback } from 'react';

const FORM_SLUG = 'hyperion-newsletter-form-9db1366a';
const API_ENDPOINT = 'https://crm.basalthq.com//api/forms/submit';

interface UseNewsletterFormOptions {
    onSuccess?: (message: string) => void;
}

export function useNewsletterSubmit(options?: UseNewsletterFormOptions) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const submit = useCallback(async (email: string) => {
        setStatus('submitting');

        const formData = new FormData();
        formData.append('email', email);
        formData.append('form_slug', FORM_SLUG);
        formData.append('source_url', window.location.href);
        if (document.referrer) formData.append('referrer', document.referrer);

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('utm_source')) formData.append('utm_source', urlParams.get('utm_source')!);
        if (urlParams.has('utm_medium')) formData.append('utm_medium', urlParams.get('utm_medium')!);
        if (urlParams.has('utm_campaign')) formData.append('utm_campaign', urlParams.get('utm_campaign')!);

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setMessage(result.message || 'You\'ve been added to the priority access queue.');
                options?.onSuccess?.(result.message || 'Success');
                if (result.redirect_url) window.location.href = result.redirect_url;
            } else {
                setStatus('error');
                setMessage(result.error || 'Submission failed. Please try again.');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    }, [options]);

    const reset = useCallback(() => {
        setStatus('idle');
        setMessage('');
    }, []);

    return { status, message, submit, reset };
}

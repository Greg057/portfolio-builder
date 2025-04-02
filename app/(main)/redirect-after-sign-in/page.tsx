'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectAfterSignIn() {
    const router = useRouter();

    useEffect(() => {
        const portfolioSessionData = sessionStorage.getItem("portfolioSessionData") ? true : false;

        if (portfolioSessionData) {
            router.push("/editor");
        } else {
            router.push("/");
        }
    }, [router]);

    return null;
}
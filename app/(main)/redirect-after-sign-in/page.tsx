'use client'

export default function RedirectAfterSignIn() {
    const portfolioSessionData: Boolean = sessionStorage.getItem("portfolioSessionData") ? true : false

    if (portfolioSessionData) {
        return window.location.href = "/editor"
    } 

    return window.location.href = "/"
}
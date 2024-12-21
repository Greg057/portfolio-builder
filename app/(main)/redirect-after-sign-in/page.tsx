'use client'

export default function RedirectAfterSignIn() {
    const unsavedConfig: Boolean = sessionStorage.getItem("unsavedConfig") ? true : false

    if (unsavedConfig) {
        return window.location.href = "/editor"
    } 

    return window.location.href = "/"
}
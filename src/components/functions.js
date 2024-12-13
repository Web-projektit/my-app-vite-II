import { csrfUrl } from './constants';

export const closeFetch = () => {
  console.log('closeFetch')
}

export const loaderCsrfToken = async (setError, setLoading) => {
    let csrf = null;
    try {
        const response = await fetch(csrfUrl, { credentials: 'include' });
        console.log("Response status:", response.status);
        if (!response.ok) {
            throw new Error("Csrf-haku epäonnistui!");
        }
        csrf = response.headers.get("X-CSRFToken");
        console.log('csrf,csrfToken:', csrf);
        return { csrfToken: csrf, error: null };
    } catch (error) {
        console.error("Virhe csrf:n haussa:", error);
        return { csrfToken: null, error: error };
    } finally {
        console.log('csrf-haku, finally, csrf:', csrf);
    }
}
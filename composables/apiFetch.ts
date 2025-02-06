import type { UseFetchOptions } from "nuxt/app";
import swal from 'sweetalert2'
export function apiFetch<T>(path: string, data: Object, options: UseFetchOptions<T> = {}) {
    const config = useRuntimeConfig();
    return useFetch(config.public.apiUrl + path, {
        method: "POST",
        watch: false,
        body: data,
        ...options,
        server: false,
        headers: {
            "Content-Type": "application/json"
        },
        onRequest({ request, options }) {
        },
        onRequestError({ request, options, error }) {
            console.log('onRequestError')
        },
        onResponseError({ request, response, options }) {
            console.log('onResponseError')
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong.',
            })
        }
    })
}
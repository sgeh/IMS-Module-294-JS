import { environment } from "./notes-api.js";

export async function login(email, password) {
    const request = await fetch(`${environment.apiRoot}/api/users/login`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ 'email': email, 'password': password })
    });
    const data = await request.json();
    return data;
}

export async function register(email, password) {
    const request = await fetch(`${environment.apiRoot}/api/users/register`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ 'email': email, 'password': password })
    });
    const data = await request.json();
    return data;
}

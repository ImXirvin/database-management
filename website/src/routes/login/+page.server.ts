/** @type {import('./$types').Action} */

import { error, redirect } from '@sveltejs/kit';
import type { Action } from './$types.js';



function getPostion() {
    return "Corporate";
}

const login: Action = async ({ cookies, request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    if (email === 'test@email.com' && password === 'password') {
        cookies.set('userPosition', getPostion(), {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
        });
        throw redirect(302, '/');

    } else {
        return {invalid: true}
    }
};

export const actions = { 
    default : login
 };
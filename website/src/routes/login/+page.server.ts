/** @type {import('./$types').Action} */

import { error, redirect } from '@sveltejs/kit';
import type { Action } from './$types.js';
import PERMISSIONS from '$lib/server/permissions';


const login: Action = async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const email: string = formData.get('email') as string;
    const password: string = formData.get('password') as string;
    // get the word before the @ symbol
    let position: string = email?.toString().split('@')[0];

    // capitalize the first letter
    position = position.charAt(0).toUpperCase() + position.slice(1);

    //see if the email contains '@email.co

    //see if position is a string in 
    if (PERMISSIONS[position] === undefined) {
        return {invalid: true}
    }


    if (email?.toString().includes('@email.com') && password === 'password') {
        cookies.set('userPosition', position, {
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
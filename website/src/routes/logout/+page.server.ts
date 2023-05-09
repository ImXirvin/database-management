import { redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.set('userPosition', '', { 
        path: '/',
        expires: new Date(0),
    });

    console.log('logout');

    throw redirect(302, '/');
};


// const logout: Action = async ({ cookies }) => {

// }


// export const actions: Actions = {
//     default: logout
// } as any as Actions;
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ETL } from '$lib/server/ETL';
import type { Action } from './$types.js';


let etl: ETL;

export const load = (async ({ cookies }) => {
    const position = cookies.get("userPosition");
    if (!position) throw redirect(307, '/login');
    etl = new ETL('staff', position);;
    if (etl) {
        return {
            table : etl.getData(),
            columns : etl.getColumns()
        };
    }

    throw error(404, 'Not found');
}) satisfies PageServerLoad;


/** @type {import('./$types').Action} */




const add: Action = async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const row = {
        store_id : formData.get('store_id') as string,
        staff_id : formData.get('staff_id') as string,
        first_name : formData.get('first_name') as string,
        last_name : formData.get('last_name') as string,
        date_of_birth : formData.get('date_of_birth') as string,
        role : formData.get('role') as string,
        authorised : formData.get('authorised') as string,
        tenure : formData.get('tenure') as string,
        annual_salary : formData.get('annual_salary') as string,
    };
    etl.addRow(row);
    throw redirect(302, '/staff');
};

const remove: Action = async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const row = {
        store_id : formData.get('store_id') as string,
        staff_id : formData.get('staff_id') as string,
        first_name : formData.get('first_name') as string,
        last_name : formData.get('last_name') as string,
        date_of_birth : formData.get('date_of_birth') as string,
        role : formData.get('role') as string,
        authorised : formData.get('authorised') as string,
        tenure : formData.get('tenure') as string,
        annual_salary : formData.get('annual_salary') as string,
    };

    etl.removeRow(row);
};

export const actions = { 
    add : add,
    remove : remove
 };
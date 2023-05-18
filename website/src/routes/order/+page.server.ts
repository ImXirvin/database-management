import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ETL } from '$lib/server/ETL';
import type { Action } from './$types.js';


let etl: ETL;

export const load = (async ({ cookies }) => {
    const position = cookies.get("userPosition");
    if (!position) throw redirect(307, '/login');
    etl = new ETL('order', position);;
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
        order_name : formData.get('order_name') as string,
        order_id : formData.get('order_id') as string,
        store_id : formData.get('store_id') as string,
        order_date : formData.get('order_date') as string,
        status : formData.get('status') as string,
        delivery_eta : formData.get('delivery_eta') as string,
    };
    etl.addRow(row);
    throw redirect(302, '/order');
};

const remove: Action = async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const row = {
        order_name : formData.get('order_name') as string,
        order_id : formData.get('order_id') as string,
        store_id : formData.get('store_id') as string,
        order_date : formData.get('order_date') as string,
        status : formData.get('status') as string,
        delivery_eta : formData.get('delivery_eta') as string,
    };

    etl.removeRow(row);
};

export const actions = { 
    add : add,
    remove : remove
 };
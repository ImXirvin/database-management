import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ETL } from '$lib/server/ETL';
import type { Action } from './$types.js';


let etl: ETL;

export const load = (async ({ cookies }) => {
    const position = cookies.get("userPosition");
    if (!position) throw redirect(307, '/login');
    etl = new ETL('store', position);;
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
        store_address : formData.get('store_address') as string,
        postcodes : formData.get('postcodes') as string,
        warehouse_id : formData.get('warehouse_id') as string,
        stock : formData.get('stock') as string,
    };
    etl.addRow(row);
    throw redirect(302, '/store');
};

const remove: Action = async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const row = {
        store_id : formData.get('store_id') as string,
        store_address : formData.get('store_address') as string,
        postcodes : formData.get('postcodes') as string,
        warehouse_id : formData.get('warehouse_id') as string,
        stock : formData.get('stock') as string,
    };

    etl.removeRow(row);
};

export const actions = { 
    add : add,
    remove : remove
 };
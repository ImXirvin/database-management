import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ETL } from '$lib/server/ETL';
import type { Action } from './$types.js';


let etl: ETL;

export const load = (async ({ cookies }) => {
    const position = cookies.get("userPosition");
    if (!position) throw redirect(307, '/login');
    etl = new ETL('item', position);;
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
        category_id : "",
        category_name : "",
        product_id : "",
        item_name : formData.get('item_name') as string,
        description : formData.get('description') as string,
        detail_3 : "",
        standard_cost : "",
        item_price : formData.get('item_price') as string,
        quantity : "",
        sku : formData.get('sku') as string,
    };
    etl.addRow(row);
    throw redirect(302, '/item');
};

const remove: Action = async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const row = {
        category_id : "",
        category_name : "",
        product_id : "",
        item_name : formData.get('item_name') as string,
        description : formData.get('description') as string,
        detail_3 : "",
        standard_cost : "",
        item_price : formData.get('item_price') as string,
        quantity : "",
        sku : formData.get('sku') as string,
    };

    etl.removeRow(row);
};

export const actions = { 
    add : add,
    remove : remove
 };
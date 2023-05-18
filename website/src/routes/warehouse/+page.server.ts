import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ETL } from '$lib/server/ETL';
import type { Action } from './$types.js';


let etl: ETL;

export const load = (async ({ cookies }) => {
    const position = cookies.get("userPosition");
    if (!position) throw redirect(307, '/login');
    etl = new ETL('warehouse', position);;
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
        warehouse_number : formData.get('warehouse_number') as string,
        warehouse_id : formData.get('warehouse_id') as string,
        warehouse_address : formData.get('warehouse_address') as string,
        cargo_arrival : formData.get('cargo_arrival') as string,
        shipment_errors : formData.get('shipment_errors') as string,
        customer_rating : formData.get('customer_rating') as string,
        total_capacity : formData.get('total_capacity') as string,
        remaining_capacity : formData.get('remaining_capacity') as string,
        store_id : formData.get('store_id') as string,
        sku : formData.get('sku') as string,
    };
    etl.addRow(row);
    throw redirect(302, '/warehouse');
};

// 'warehouse_number',
// 'warehouse_id',
// 'warehouse_address',
// 'cargo_arrival',
// 'shipment_errors',
// 'customer_rating',
// 'total_capacity',
// 'remaining_capacity',
// 'store_id',
// 'sku'

const remove: Action = async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const row = {
        warehouse_number : formData.get('warehouse_number') as string,
        warehouse_id : formData.get('warehouse_id') as string,
        warehouse_address : formData.get('warehouse_address') as string,
        cargo_arrival : formData.get('cargo_arrival') as string,
        shipment_errors : formData.get('shipment_errors') as string,
        customer_rating : formData.get('customer_rating') as string,
        total_capacity : formData.get('total_capacity') as string,
        remaining_capacity : formData.get('remaining_capacity') as string,
        store_id : formData.get('store_id') as string,
        sku : formData.get('sku') as string,
    };

    etl.removeRow(row);
};

export const actions = { 
    add : add,
    remove : remove
 };
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ETL } from '$lib/server/ETL';


export const load = (async ({ cookies }) => {
    const position = cookies.get("userPosition");
    if (!position) throw redirect(307, '/login');
    let etl = new ETL('warehouse', position);;
    if (etl)
        return {
            table : etl.getData(),
            columns : etl.getColumns()
        };
    throw error(404, 'Not found');
}) satisfies PageServerLoad;
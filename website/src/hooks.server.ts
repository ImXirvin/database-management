import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
     const position = event.cookies.get("userPosition");

    
    if (!position) {
        return await resolve(event)
    }

    if (position) {
        event.locals.userPosition = position;
    }


     return await resolve(event);

}
<script lang="ts">

	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';

    // Retrieve user store from context


    let popupSettings: PopupSettings = {
	// Set the event as: click | hover | hover-click | focus | focus-click
	event: 'click',
	// Provide a matching 'data-popup' value.
	target: 'logoutPopup',
};
</script>


<div class="card w-fit variant-filled-surface hover:bg-surface-700 hover:cursor-pointer">
    <button class="flex items-center w-fit flex-row h-full " use:popup={popupSettings}>
        <Avatar initials={`T${$page.data.userPosition.charAt(0)}`} width="w-10" rounded="rounded-full" />
        <div class="ml-3 mr-5 max-w-sm">
            <div class="text-sm font-medium text-white">
                { $page.data.userPosition } Account
            </div>
            <div class="text-sm text-gray-400">
                {$page.data.userPosition} Manager
            </div>
        </div>
    </button>
</div>

<div class="card w-fit h-fit p-4 grid place-items-center bg-surface-900" data-popup="logoutPopup">
        <button on:click={()=>location.href="/logout"} type="submit" class="btn variant-filled-primary text-gray-900 font-semibold rounded-md px-4 py-2 transition duration-200 ease-in-out">
            Log Out
        </button>
</div>

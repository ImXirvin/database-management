<script>
	import { Avatar } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    // Retrieve user store from context
</script>


<div class="card w-fit variant-filled-surface ">
    <div class="flex items-center w-fit flex-row h-full ">
        <Avatar initials={`T${$page.data.userPosition.charAt(0)}`} width="w-10" rounded="rounded-full" />
        <div class="ml-3 mr-5 max-w-sm">
            <div class="text-sm font-medium text-white">
                Test { $page.data.userPosition }
            </div>
            <div class="text-sm text-gray-400">
                {$page.data.userPosition}
            </div>
        </div>
    </div>
</div>
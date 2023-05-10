<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { page } from "$app/stores";
	
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center">
		{#if $page.data.userPosition}
			<h2 class="font-bold">Your are a {$page.data.userPosition}. Select one of the tabs in the header.</h2>
		{:else}
		<h2 class="font-bold">Please sign in to see the inventory.</h2>
		{/if}
		
	</div>	
</div>


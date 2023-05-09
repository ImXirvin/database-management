<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	$: sourceData = data.table;
	let tableSimple: TableSource;

	$: if (sourceData) {
		tableSimple = {
			head: data.columns,
			body: tableMapperValues(sourceData, data.columns)
		};
	}

</script>

<div class="w-full h-full p-8 flex items-start justify-center">
	{#if $page.data.userPosition}
		{#if tableSimple}
			<Table source={tableSimple} interactive={false} />
		{/if}
	{:else}
		<div class="card variant-filled-surface p-4 gap-4 flex flex-col items-center justify-center">
			<div class="text-red-500 text-sm font-medium">You are not authorized to view this page</div>
		</div>
	{/if}
</div>

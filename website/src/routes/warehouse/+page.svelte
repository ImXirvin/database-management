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

<div class="w-full h-full p-8 flex flex-col items-start justify-center gap-y-8">
	<div class="flex flex-row justify-center items-center w-full">
		<h1 class="text-2xl font-semibold text-gray-50">Warehouse</h1>
		<button class="ml-4 btn variant-filled-surface text-gray-900 font-semibold rounded-md px-4 py-2 transition duration-200 ease-in-out" on:click={() => location.reload()}>
			Reload
		</button>
	</div>
	
	{#if $page.data.userPosition == "Corporate"}
	<form class=" card p-5 flex flex-col gap-4 w-full" method="POST" action="?/add">
		<h3 class="text-xl font-semibold text-gray-50">Add Item</h3>
			<div class="flex-row flex gap-4 w-full">
				{#each data.columns as column}
					{#if column !== 'id'}
						<div class="flex flex-col gap-2 w-full">
							<label class="text-gray-50 font-semibold" for={column}>{column}</label>
							<input class="input variant-filled-surface" type="text" id={column} name={column} />
						</div>
					{/if}
				{/each}
			</div>
			<button
				class="btn variant-filled-surface text-gray-900 font-semibold rounded-md px-4 py-2 transition duration-200 ease-in-out"
				type="submit"
			>
				Add
			</button>
		</form>
	{/if}

	{#if $page.data.userPosition == "Corporate"}
	<form class=" card p-5 flex flex-col gap-4 w-full" method="POST" action="?/remove">
		<h3 class="text-xl font-semibold text-gray-50">Remove Item</h3>
			<div class="flex-row flex gap-4 w-full">
				{#each data.columns as column}
					{#if column !== 'id'}
						<div class="flex flex-col gap-2 w-full">
							<label class="text-gray-50 font-semibold" for={column}>{column}</label>
							<input class="input variant-filled-surface" type="text" id={column} name={column} />
						</div>
					{/if}
				{/each}
			</div>
			<button
				class="btn variant-filled-surface text-gray-900 font-semibold rounded-md px-4 py-2 transition duration-200 ease-in-out"
				type="submit"
			>
				Remove
			</button>
		</form>
	{/if}


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

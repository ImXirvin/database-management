<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import UserChip from '$lib/components/UserChip.svelte';
	import NavBar from '$lib/components/NavBar.svelte';


	export let data: LayoutData;
	// Create a store and update it when necessary...
	// @ts-ignore

	// ...and add it to the context for child components to access
</script>

<!-- App Shell -->
<AppShell slotPageHeader="h-[2.5rem]">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class>
			<svelte:fragment slot="lead">
				<a class="text-xl uppercase h-10 flex items-center" href="/">WHMS</a>
			</svelte:fragment>
			{#if $page.data.userPosition !== null}
				<NavBar />
			{/if}
			<svelte:fragment slot="trail">
				{#if $page.data.userPosition == null}
					<a class="btn variant-filled h-10" href="/login">Sign In</a>
				{:else}
					<UserChip />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import PageLoadingIndicator from '$lib/components/PageLoadingIndicator.svelte';
	import { navigating } from '$app/stores';
	import Toasts from '$lib/components/Toasts';
	import type { LayoutData } from './$types';
	import { themeStore } from '$lib/stores/themeStore';
	import Navbar from '$lib/components/Site/Navbar.svelte';

	export let data: LayoutData;

	themeStore.set(data.theme);

	onMount(async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await import('bootstrap/dist/js/bootstrap.bundle');
	});
</script>

<PageLoadingIndicator show={Boolean($navigating)} />

<Toasts position="bottom-right" />

<header>
	<Navbar user={data.currentUser} />
</header>

<slot />

<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		content: string;
		class?: string;
	}

	export let content: string;
	let klass = '';
	export { klass as class };
</script>

<svelte:head>
	{#if $themeStore === 'dark'}
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css"
			integrity="sha512-USRvpT7dJFA7mrRx4+esmy+2mYr8vlgmDLFpkNeVEd+D5CgQvULKPYVnDV97Ywfek+e//HdSA0NlaPe4oqkwfQ=="
			crossorigin="anonymous"
			referrerpolicy="no-referrer"
		/>
	{:else}
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css"
			integrity="sha512-zb2pp+R+czM7GAemdSUQt6jFmr3qCo6ikvBgVU6F5GvwEDR0C2sefFiPEJ9QUpmAKdD5EqDUdNRtbOYnbF/eyQ=="
			crossorigin="anonymous"
			referrerpolicy="no-referrer"
		/>
	{/if}
</svelte:head>

<div {...$$restProps} class="markdown-body {klass}">
	{@html content}
</div>

<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let content: string;

	let renderedContent = '';

	onMount(() => {
		renderedContent = DOMPurify.sanitize(marked(content));
	});

	$: {
		if (browser) {
			renderedContent = DOMPurify.sanitize(marked(content));
		}
	}
</script>

{@html renderedContent}

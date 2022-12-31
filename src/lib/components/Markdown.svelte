<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let content: string;

	let renderedContent = '';

	function renderToMarkdown(value: string) {
		return DOMPurify.sanitize(marked(value));
	}

	onMount(() => {
		renderedContent = renderToMarkdown(content);
	});

	$: {
		if (browser) {
			renderedContent = renderToMarkdown(content);
		}
	}
</script>

{@html renderedContent}

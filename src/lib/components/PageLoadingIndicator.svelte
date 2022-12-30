<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let show: boolean;

	const progress = tweened(0, { easing: cubicOut });
	const opacity = tweened(1, { easing: cubicOut });

	$: {
		if (show) {
			opacity.set(1, { duration: 0 });
			progress.set(0.7, { duration: 3500 });
		} else {
			const duration = 1000;
			progress.set(1, { duration });
			opacity.set(0, { duration: duration / 2, delay: duration / 2 });
			setTimeout(() => {
				progress.set(0, { duration: 0 });
			}, duration);
		}
	}
</script>

<div class="page-loading-indicator" style:opacity={$opacity}>
	<div class="bar" style:width={`${$progress * 100}%`} />
</div>

<style>
	.page-loading-indicator {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 0.5rem;
		z-index: 99;
		pointer-events: none;
	}

	.bar {
		height: 100%;
		background-color: var(--bs-blue);
	}
</style>

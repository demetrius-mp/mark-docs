<script lang="ts">
	export let sm = false;
	let klass = '';
	export { klass as class };
</script>

<div class="spinner-border {klass}" class:spinner-border-sm={sm} role="status">
	<span class="visually-hidden">Loading...</span>
</div>

<script lang="ts">
	import { page } from '$app/stores';

	type Tab = {
		href: string;
		name: string;
	};

	const tabs: Tab[] = [
		{
			href: '/app/settings/user',
			name: 'User settings'
		},
		{
			href: '/app/settings/preferences',
			name: 'Preferences'
		}
	];
</script>

<main class="container mt-4">
	<ul class="nav nav-tabs mb-4">
		{#each tabs as { href, name }}
			{@const active = $page.url.pathname === href}
			<li class="nav-item">
				<a class="nav-link" class:active aria-current={active ? 'page' : undefined} {href}>
					{name}
				</a>
			</li>
		{/each}
	</ul>

	<slot />
</main>

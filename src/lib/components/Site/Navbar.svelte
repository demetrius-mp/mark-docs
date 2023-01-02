<script lang="ts">
	import IconCog from '~icons/mdi/Cog';
	import IconThemeLightDark from '~icons/mdi/ThemeLightDark';
	import IconLogoutVariant from '~icons/mdi/LogoutVariant';
	import IconLanguageMarkdown from '~icons/mdi/LanguageMarkdown';
	import IconMenu from '~icons/mdi/Menu';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Form from '$lib/components/Form/Form.svelte';
	import { themeStore } from '$lib/stores/themeStore';
	import { docListPaneSizeStore } from '$lib/stores/docListPaneSizeStore';

	type User = {
		name: string;
		profilePictureUrl: string;
	};

	export let user: User | undefined;

	function handleAfterSubmitToggleTheme() {
		themeStore.toggle();

		document.documentElement.setAttribute('data-bs-theme', $themeStore);
	}

	$: signUpLinkIsActive = $page.route.id && $page.route.id === '/sign-up';
	$: signInLinkIsActive = $page.route.id && $page.route.id === '/sign-in';
</script>

<nav class="navbar bg-body-secondary">
	<div class="container-fluid">
		<div class="d-flex gap-2">
			<button
				type="button"
				class="menu"
				title="Show/hide documents"
				on:click={docListPaneSizeStore.toggle}
			>
				<IconMenu style="vertical-align: bottom; font-size: 1.35rem;" />
			</button>
			<a class="navbar-brand" href="/app">
				<IconLanguageMarkdown style="vertical-align: sub;" />
				Mark Docs
			</a>
		</div>
		<ul class="navbar-nav flex-row gap-3">
			{#if !user}
				<li class="nav-item">
					<a class="nav-link" class:active={signUpLinkIsActive} href="/sign-up"> Sign up </a>
				</li>
				<li class="nav-item">
					<a class="nav-link" class:active={signInLinkIsActive} href="/sign-in"> Sign in </a>
				</li>
			{:else}
				<li class="nav-item dropdown">
					<button
						tabindex="0"
						class="nav-link p-0 border-0"
						style="background-color: inherit;"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<img class="rounded-circle" height="40" src={user.profilePictureUrl} alt="profile" />
					</button>
					<ul
						class="shadow dropdown-menu dropdown-menu-end position-absolute"
						style="width: 12rem;"
					>
						<li>
							<h6 class="dropdown-header text-wrap">
								Signed in as
								<strong>
									{user.name}
								</strong>
							</h6>
						</li>
						<li>
							<hr class="dropdown-divider" />
						</li>
						<li>
							<a class="dropdown-item d-flex align-items-center gap-1" href="/app/settings">
								<IconCog />
								Settings
							</a>
						</li>
						<li>
							<Form action="/theme" method="post" afterSubmit={handleAfterSubmitToggleTheme}>
								<button type="submit" class="dropdown-item d-flex align-items-center gap-1">
									<IconThemeLightDark />
									Toggle theme
								</button>
							</Form>
						</li>
						<li>
							<hr class="dropdown-divider" />
						</li>
						<li>
							<form use:enhance action="/sign-out" method="post">
								<button
									type="submit"
									class="dropdown-item text-danger d-flex align-items-center gap-1"
								>
									<IconLogoutVariant />
									Sign out
								</button>
							</form>
						</li>
					</ul>
				</li>
			{/if}
		</ul>
	</div>
</nav>

<style>
	.menu {
		background-color: inherit;
		border: none;
		color: var(--bs-navbar-brand-color);
	}
</style>

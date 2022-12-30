<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import IconCog from '~icons/mdi/Cog';
	import IconLogoutVariant from '~icons/mdi/LogoutVariant';
	import PageLoadingIndicator from '$lib/components/PageLoadingIndicator.svelte';
	import { navigating, page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Toasts from '$lib/components/Toasts';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	onMount(async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await import('bootstrap/dist/js/bootstrap.bundle');
	});

	$: signUpLinkIsActive = $page.route.id && $page.route.id === '/sign-up';
	$: signInLinkIsActive = $page.route.id && $page.route.id === '/sign-in';
</script>

<PageLoadingIndicator show={Boolean($navigating)} />

<Toasts position="bottom-right" />

<header>
	<nav class="navbar bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand" href="/app">Task Manager</a>
			<ul class="navbar-nav flex-row gap-3">
				{#if !data.currentUser}
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
							<img
								class="rounded-circle"
								height="40"
								src={data.currentUser.profilePictureUrl}
								alt="profile"
							/>
						</button>
						<ul
							class="shadow dropdown-menu dropdown-menu-end position-absolute"
							style="width: 12rem;"
						>
							<li>
								<h6 class="dropdown-header text-wrap">
									Signed in as
									<strong>
										{data.currentUser.name}
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
</header>

<slot />

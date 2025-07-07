<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="theme-color" content="#8b5cf6" />
	<meta name="description" content="Maximize your credit card cash back rewards with smart recommendations" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content="CashCat" />
	<link rel="manifest" href="/manifest.json" />
	<link rel="apple-touch-icon" href="/icon-192.svg" />
</svelte:head>

<div class="pb-20">
	{@render children()}
</div>

<Navigation />

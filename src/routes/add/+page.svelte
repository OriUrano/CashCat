<script lang="ts">
	import { onMount } from 'svelte';
	import { creditCards } from '$lib/stores.js';
	import CardForm from '$lib/components/CardForm.svelte';
	import { Plus, CreditCard } from 'lucide-svelte';

	let showCardForm = false;

	onMount(() => {
		creditCards.loadCards();
	});

	function openAddForm() {
		showCardForm = true;
	}

	function closeForm() {
		showCardForm = false;
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
	<div class="max-w-md mx-auto">
		<header class="text-center mb-8">
			<h1 class="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
				<Plus class="w-7 h-7 text-white" />
				Add New Card
			</h1>
			<p class="text-purple-100">Add your credit cards to maximize cash back rewards</p>
		</header>

		<div class="bg-white rounded-2xl p-8 shadow-xl text-center">
			<CreditCard class="w-20 h-20 mx-auto mb-4 text-purple-500" />
			<h2 class="text-2xl font-bold text-gray-800 mb-2">Ready to Add a Card?</h2>
			<p class="text-gray-600 mb-6">Enter your credit card details and configure cash back categories to get personalized recommendations.</p>
			
			<button 
				on:click={openAddForm}
				class="bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors w-full"
			>
				Add Credit Card
			</button>
		</div>

		{#if $creditCards.length > 0}
			<div class="mt-6 bg-white rounded-2xl p-4 shadow-lg">
				<h3 class="text-gray-800 font-semibold mb-2">Your Cards ({$creditCards.length})</h3>
				<div class="space-y-2">
					{#each $creditCards as card}
						<div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white">
							<div class="font-medium">{card.name}</div>
							<div class="text-sm opacity-90">{card.issuer}</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

{#if showCardForm}
	<CardForm onClose={closeForm} />
{/if}
<script lang="ts">
	import { onMount } from 'svelte';
	import { creditCards } from '$lib/stores.js';
	import CardForm from '$lib/components/CardForm.svelte';
	import { Plus, CreditCard } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

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

	function isLightColor(color: string): boolean {
		// Convert hex to RGB
		const hex = color.replace('#', '');
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);
		
		// Calculate relative luminance
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.6;
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
				class="bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 hover:shadow-lg active:scale-95 transform transition-all duration-200 w-full"
			>
				Add Credit Card
			</button>
		</div>

		{#if $creditCards.length > 0}
			<div class="mt-6 bg-white rounded-2xl p-6 shadow-xl">
				<h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
					<CreditCard class="w-6 h-6 text-blue-500" />
					Your Cards
				</h2>
				<div class="space-y-3">
					{#each $creditCards as card, i (card.id)}
						{@const cardColor = card.color || '#8b5cf6'}
						{@const isLight = isLightColor(cardColor)}
						<div 
							class="p-4 rounded-lg {isLight ? 'text-black border border-black' : 'text-white'}" 
							style="background: linear-gradient(135deg, {cardColor}, {cardColor}aa)"
							transition:fly={{ x: 20, duration: 300, delay: i * 50, easing: quintOut }}
						>
							<div class="font-bold text-lg">{card.name}</div>
							<div class="text-sm {isLight ? 'opacity-70' : 'opacity-90'}">{card.issuer}</div>
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
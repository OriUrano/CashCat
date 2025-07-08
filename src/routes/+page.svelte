<script lang="ts">
	import { onMount } from 'svelte';
	import { creditCards, recommendations } from '$lib/stores.js';
	import { CASH_BACK_CATEGORIES } from '$lib/types.js';
	import CardForm from '$lib/components/CardForm.svelte';
	import { CreditCard, Cat, DollarSign } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let showCardForm = false;

	onMount(() => {
		creditCards.loadCards();
	});

	$: {
		if ($creditCards.length > 0) {
			recommendations.updateRecommendations($creditCards);
		}
	}

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
			<h1 class="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
				<CreditCard class="w-8 h-8 text-white" />
				CashCat
			</h1>
			<p class="text-purple-100">Maximize your cash back rewards</p>
		</header>

		{#if $creditCards.length === 0}
			<div class="bg-white rounded-2xl p-6 shadow-xl mb-6">
				<div class="text-center">
					<Cat class="w-20 h-20 mx-auto mb-4 text-purple-500" />
					<h2 class="text-2xl font-bold text-gray-800 mb-2">Welcome to CashCat!</h2>
					<p class="text-gray-600 mb-6">Add your credit cards to get started and find the best cash back rewards for every purchase.</p>
					<button 
						on:click={openAddForm}
						class="bg-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-600 hover:shadow-lg active:scale-95 transform transition-all duration-200 min-h-[56px] touch-manipulation"
					>
						Add Your First Card
					</button>
				</div>
			</div>
		{:else}
			<div class="bg-white rounded-2xl p-6 shadow-xl mb-6">
				<h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
					<DollarSign class="w-6 h-6 text-yellow-500" />
					Best Cash Back
				</h2>
				<div class="space-y-3">
					{#each $recommendations as rec, i (rec.category)}
						<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg" 
							 transition:fly={{ x: 20, duration: 300, delay: i * 50, easing: quintOut }}>
							<div class="flex items-center space-x-3">
								<svelte:component this={CASH_BACK_CATEGORIES.find(cat => cat.value === rec.category)?.icon || CreditCard} class="w-5 h-5 text-gray-600" />
								<div>
									<div class="font-semibold text-gray-800">
										{CASH_BACK_CATEGORIES.find(cat => cat.value === rec.category)?.label}
									</div>
									<div class="text-sm text-gray-600">{rec.bestCard.name}</div>
								</div>
							</div>
							<div class="text-right">
								<div class="text-lg font-bold text-purple-600">{rec.percentage}%</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-white rounded-2xl p-6 shadow-xl">
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

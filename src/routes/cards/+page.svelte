<script lang="ts">
	import { onMount } from 'svelte';
	import { creditCards } from '$lib/stores.js';
	import { CASH_BACK_CATEGORIES } from '$lib/types.js';
	import CardForm from '$lib/components/CardForm.svelte';
	import type { CreditCard } from '$lib/types.js';

	let showCardForm = false;
	let editingCard: CreditCard | null = null;

	onMount(() => {
		creditCards.loadCards();
	});

	function openAddForm() {
		editingCard = null;
		showCardForm = true;
	}

	function openEditForm(card: CreditCard) {
		editingCard = card;
		showCardForm = true;
	}

	function closeForm() {
		showCardForm = false;
		editingCard = null;
	}

	function deleteCard(cardId: string) {
		if (confirm('Are you sure you want to delete this card?')) {
			creditCards.deleteCard(cardId);
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
	<div class="max-w-md mx-auto">
		<header class="flex items-center justify-between mb-8">
			<h1 class="text-3xl font-bold text-white">🎴 Your Cards</h1>
			<button 
				on:click={openAddForm}
				class="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
			>
				+ Add Card
			</button>
		</header>

		{#if $creditCards.length === 0}
			<div class="bg-white rounded-2xl p-8 shadow-xl text-center">
				<div class="text-6xl mb-4">💳</div>
				<h2 class="text-2xl font-bold text-gray-800 mb-2">No Cards Yet</h2>
				<p class="text-gray-600 mb-6">Add your first credit card to start tracking cash back rewards.</p>
				<button 
					on:click={openAddForm}
					class="bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors"
				>
					Add Your First Card
				</button>
			</div>
		{:else}
			<div class="space-y-4">
				{#each $creditCards as card (card.id)}
					<div class="bg-white rounded-2xl p-6 shadow-xl">
						<div class="flex items-start justify-between mb-4">
							<div class="flex items-center space-x-3">
								<div 
									class="w-12 h-8 rounded-lg"
									style="background: linear-gradient(135deg, {card.color || '#8b5cf6'}, {card.color || '#8b5cf6'}aa)"
								></div>
								<div>
									<h3 class="font-bold text-gray-800">{card.name}</h3>
									<p class="text-sm text-gray-600">{card.issuer}</p>
								</div>
							</div>
							<div class="flex space-x-2">
								<button 
									on:click={() => openEditForm(card)}
									class="text-purple-600 hover:text-purple-700 text-sm font-medium"
								>
									Edit
								</button>
								<button 
									on:click={() => deleteCard(card.id)}
									class="text-red-600 hover:text-red-700 text-sm font-medium"
								>
									Delete
								</button>
							</div>
						</div>

						{#if card.cashBackRules.length > 0}
							<div>
								<h4 class="text-sm font-semibold text-gray-700 mb-2">Cash Back Categories</h4>
								<div class="grid grid-cols-2 gap-2">
									{#each card.cashBackRules as rule}
										{@const category = CASH_BACK_CATEGORIES.find(cat => cat.value === rule.category)}
										{#if category && rule.isActive}
											<div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
												<div class="flex items-center space-x-2">
													<span class="text-sm">{category.icon}</span>
													<span class="text-xs text-gray-700">{category.label}</span>
												</div>
												<span class="text-xs font-bold text-purple-600">{rule.percentage}%</span>
											</div>
										{/if}
									{/each}
								</div>
							</div>
						{:else}
							<div class="text-center py-4">
								<p class="text-sm text-gray-500">No cash back categories configured</p>
								<button 
									on:click={() => openEditForm(card)}
									class="text-purple-600 hover:text-purple-700 text-sm font-medium mt-1"
								>
									Add Categories
								</button>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if showCardForm}
	<CardForm {editingCard} onClose={closeForm} />
{/if}
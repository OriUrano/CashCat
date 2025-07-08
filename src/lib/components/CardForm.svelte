<script lang="ts">
	import { creditCards } from '$lib/stores.js';
	import { CASH_BACK_CATEGORIES } from '$lib/types.js';
	import type { CreditCard, CashBackRule } from '$lib/types.js';
	import { X } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let onClose: () => void;
	export let editingCard: CreditCard | null = null;

	let cardName = editingCard?.name || '';
	let cardIssuer = editingCard?.issuer || '';
	let cardColor = editingCard?.color || '#8b5cf6';
	let cashBackRules: CashBackRule[] = CASH_BACK_CATEGORIES.map(cat => {
		const existingRule = editingCard?.cashBackRules.find(rule => rule.category === cat.value);
		return existingRule || {
			category: cat.value,
			percentage: 0,
			isActive: false
		};
	});

	function handleSubmit() {
		if (!cardName.trim() || !cardIssuer.trim()) return;

		const card: CreditCard = {
			id: editingCard?.id || crypto.randomUUID(),
			name: cardName.trim(),
			issuer: cardIssuer.trim(),
			color: cardColor,
			cashBackRules: cashBackRules.filter(rule => rule.isActive && rule.percentage > 0)
		};

		if (editingCard) {
			creditCards.updateCard(editingCard.id, card);
		} else {
			creditCards.addCard(card);
		}

		onClose();
	}

	function updateCashBackRule(categoryValue: string, percentage: number) {
		cashBackRules = cashBackRules.map(rule => 
			rule.category === categoryValue 
				? { ...rule, percentage, isActive: percentage > 0 }
				: rule
		);
	}
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" transition:fade={{ duration: 200 }}>
	<div class="bg-white w-full max-h-[90vh] rounded-t-3xl overflow-y-auto" transition:fly={{ y: 400, duration: 300, easing: quintOut }}>
		<div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold text-gray-800">
					{editingCard ? 'Edit Card' : 'Add New Card'}
				</h2>
				<button 
					on:click={onClose}
					class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 min-h-[44px] min-w-[44px] touch-manipulation"
				>
					<X class="w-6 h-6" />
				</button>
			</div>
		</div>

		<div class="p-6 space-y-6">
			<div class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Card Name
					</label>
					<input 
						bind:value={cardName}
						type="text" 
						placeholder="e.g., Chase Freedom Unlimited"
						class="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:shadow-md text-base min-h-[56px] touch-manipulation transition-all duration-200"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Issuer
					</label>
					<input 
						bind:value={cardIssuer}
						type="text" 
						placeholder="e.g., Chase"
						class="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:shadow-md text-base min-h-[56px] touch-manipulation transition-all duration-200"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Card Color
					</label>
					<div class="flex items-center space-x-3">
						<input 
							bind:value={cardColor}
							type="color"
							class="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
						/>
						<div class="flex-1">
							<div 
								class="w-full h-12 rounded-lg border border-gray-200"
								style="background: linear-gradient(135deg, {cardColor}, {cardColor}aa)"
							></div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold text-gray-800 mb-4">Cash Back Categories</h3>
				<div class="space-y-3">
					{#each CASH_BACK_CATEGORIES as category}
						{@const rule = cashBackRules.find(r => r.category === category.value)}
						<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div class="flex items-center space-x-3">
								<svelte:component this={category.icon} class="w-5 h-5 text-gray-600" />
								<span class="font-medium text-gray-800">{category.label}</span>
							</div>
							<div class="flex items-center space-x-2">
								<input 
									type="number"
									min="0"
									max="10"
									step="0.25"
									value={rule?.percentage || 0}
									on:input={(e) => updateCashBackRule(category.value, parseFloat(e.target.value) || 0)}
									class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:shadow-md min-h-[44px] touch-manipulation transition-all duration-200"
								/>
								<span class="text-sm text-gray-600 font-medium">%</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex space-x-3 pt-4">
				<button 
					on:click={onClose}
					class="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 active:scale-95 transform transition-all duration-200 min-h-[56px] touch-manipulation"
				>
					Cancel
				</button>
				<button 
					on:click={handleSubmit}
					disabled={!cardName.trim() || !cardIssuer.trim()}
					class="flex-1 px-6 py-4 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transform transition-all duration-200 min-h-[56px] touch-manipulation"
				>
					{editingCard ? 'Update Card' : 'Add Card'}
				</button>
			</div>
		</div>
	</div>
</div>
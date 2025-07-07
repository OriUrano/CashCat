import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { CreditCard, CategoryRecommendation } from './types.js';

function createCreditCardStore() {
	const { subscribe, set, update } = writable<CreditCard[]>([]);

	return {
		subscribe,
		addCard: (card: CreditCard) => {
			update(cards => {
				const newCards = [...cards, card];
				if (browser) {
					localStorage.setItem('cashcat_cards', JSON.stringify(newCards));
				}
				return newCards;
			});
		},
		updateCard: (id: string, updatedCard: Partial<CreditCard>) => {
			update(cards => {
				const newCards = cards.map(card => 
					card.id === id ? { ...card, ...updatedCard } : card
				);
				if (browser) {
					localStorage.setItem('cashcat_cards', JSON.stringify(newCards));
				}
				return newCards;
			});
		},
		deleteCard: (id: string) => {
			update(cards => {
				const newCards = cards.filter(card => card.id !== id);
				if (browser) {
					localStorage.setItem('cashcat_cards', JSON.stringify(newCards));
				}
				return newCards;
			});
		},
		loadCards: () => {
			if (browser) {
				const stored = localStorage.getItem('cashcat_cards');
				if (stored) {
					try {
						const cards = JSON.parse(stored);
						set(cards);
					} catch (e) {
						console.error('Error loading cards from localStorage:', e);
					}
				}
			}
		}
	};
}

function createRecommendationStore() {
	const { subscribe, set } = writable<CategoryRecommendation[]>([]);

	return {
		subscribe,
		updateRecommendations: (cards: CreditCard[]) => {
			const recommendations = generateRecommendations(cards);
			set(recommendations);
		}
	};
}

function generateRecommendations(cards: CreditCard[]): CategoryRecommendation[] {
	const categories = ['groceries', 'gas', 'restaurants', 'travel', 'entertainment', 'shopping', 'streaming', 'utilities', 'pharmacies', 'general'] as const;
	
	return categories.map(category => {
		let bestCard = cards[0];
		let bestPercentage = 0;

		for (const card of cards) {
			const rule = card.cashBackRules.find(r => r.category === category && r.isActive);
			if (rule && rule.percentage > bestPercentage) {
				bestCard = card;
				bestPercentage = rule.percentage;
			}
		}

		return {
			category,
			bestCard,
			percentage: bestPercentage
		};
	}).filter(rec => rec.bestCard && rec.percentage > 0);
}

export const creditCards = createCreditCardStore();
export const recommendations = createRecommendationStore();
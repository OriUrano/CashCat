export interface CreditCard {
	id: string;
	name: string;
	issuer: string;
	color?: string;
	cashBackRules: CashBackRule[];
}

export interface CashBackRule {
	category: CashBackCategory;
	percentage: number;
	limit?: number;
	isActive: boolean;
}

export type CashBackCategory = 
	| 'groceries'
	| 'gas'
	| 'restaurants'
	| 'travel'
	| 'entertainment'
	| 'shopping'
	| 'streaming'
	| 'utilities'
	| 'pharmacies'
	| 'general';

export interface CategoryRecommendation {
	category: CashBackCategory;
	bestCard: CreditCard;
	percentage: number;
}

export const CASH_BACK_CATEGORIES: { value: CashBackCategory; label: string; icon: string }[] = [
	{ value: 'groceries', label: 'Groceries', icon: '🛒' },
	{ value: 'gas', label: 'Gas', icon: '⛽' },
	{ value: 'restaurants', label: 'Restaurants', icon: '🍽️' },
	{ value: 'travel', label: 'Travel', icon: '✈️' },
	{ value: 'entertainment', label: 'Entertainment', icon: '🎬' },
	{ value: 'shopping', label: 'Shopping', icon: '🛍️' },
	{ value: 'streaming', label: 'Streaming', icon: '📺' },
	{ value: 'utilities', label: 'Utilities', icon: '💡' },
	{ value: 'pharmacies', label: 'Pharmacies', icon: '💊' },
	{ value: 'general', label: 'General', icon: '💳' }
];
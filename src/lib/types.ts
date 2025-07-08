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

import { 
	ShoppingCart, 
	Fuel, 
	UtensilsCrossed, 
	Plane, 
	Film, 
	Store, 
	Tv, 
	Zap, 
	Pill, 
	CreditCard 
} from 'lucide-svelte';

export const CASH_BACK_CATEGORIES: { value: CashBackCategory; label: string; icon: any }[] = [
	{ value: 'groceries', label: 'Groceries', icon: ShoppingCart },
	{ value: 'gas', label: 'Gas', icon: Fuel },
	{ value: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
	{ value: 'travel', label: 'Travel', icon: Plane },
	{ value: 'entertainment', label: 'Entertainment', icon: Film },
	{ value: 'shopping', label: 'Shopping', icon: Store },
	{ value: 'streaming', label: 'Streaming', icon: Tv },
	{ value: 'utilities', label: 'Utilities', icon: Zap },
	{ value: 'pharmacies', label: 'Pharmacies', icon: Pill },
	{ value: 'general', label: 'General', icon: CreditCard }
];
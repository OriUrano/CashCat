<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Home, CreditCard, Plus } from 'lucide-svelte';

	$: activeTab = $page.url.pathname === '/cards' ? 'cards' : 
	               $page.url.pathname === '/add' ? 'add' : 'home';

	function navigateTo(path: string) {
		goto(path);
	}
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
	<div class="flex justify-around items-center max-w-md mx-auto">
		<button 
			class="flex flex-col items-center p-3 min-h-[60px] rounded-lg transition-all duration-300 active:scale-95 transform {activeTab === 'home' ? 'text-purple-600 bg-purple-50 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}"
			on:click={() => navigateTo('/')}
		>
			<Home class="w-5 h-5 mb-1 transition-colors duration-300 {activeTab === 'home' ? 'text-purple-600' : 'text-gray-500'}" />
			<span class="text-xs font-medium transition-colors duration-300">Home</span>
		</button>
		
		<button 
			class="flex flex-col items-center p-3 min-h-[60px] rounded-lg transition-all duration-300 active:scale-95 transform {activeTab === 'cards' ? 'text-purple-600 bg-purple-50 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}"
			on:click={() => navigateTo('/cards')}
		>
			<CreditCard class="w-5 h-5 mb-1 transition-colors duration-300 {activeTab === 'cards' ? 'text-purple-600' : 'text-gray-500'}" />
			<span class="text-xs font-medium transition-colors duration-300">Cards</span>
		</button>
		
		<button 
			class="flex flex-col items-center p-3 min-h-[60px] rounded-lg transition-all duration-300 active:scale-95 transform {activeTab === 'add' ? 'text-purple-600 bg-purple-50 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}"
			on:click={() => navigateTo('/add')}
		>
			<Plus class="w-5 h-5 mb-1 transition-colors duration-300 {activeTab === 'add' ? 'text-purple-600' : 'text-gray-500'}" />
			<span class="text-xs font-medium transition-colors duration-300">Add</span>
		</button>
	</div>
</nav>

<style>
	.safe-area-pb {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
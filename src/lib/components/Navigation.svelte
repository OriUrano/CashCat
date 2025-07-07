<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: activeTab = $page.url.pathname === '/cards' ? 'cards' : 
	               $page.url.pathname === '/add' ? 'add' : 'home';

	function navigateTo(path: string) {
		goto(path);
	}
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
	<div class="flex justify-around items-center max-w-md mx-auto">
		<button 
			class="flex flex-col items-center p-2 {activeTab === 'home' ? 'text-purple-600' : 'text-gray-500'}"
			on:click={() => navigateTo('/')}
		>
			<span class="text-xl mb-1">🏠</span>
			<span class="text-xs font-medium">Home</span>
		</button>
		
		<button 
			class="flex flex-col items-center p-2 {activeTab === 'cards' ? 'text-purple-600' : 'text-gray-500'}"
			on:click={() => navigateTo('/cards')}
		>
			<span class="text-xl mb-1">🎴</span>
			<span class="text-xs font-medium">Cards</span>
		</button>
		
		<button 
			class="flex flex-col items-center p-2 {activeTab === 'add' ? 'text-purple-600' : 'text-gray-500'}"
			on:click={() => navigateTo('/add')}
		>
			<span class="text-xl mb-1">➕</span>
			<span class="text-xs font-medium">Add</span>
		</button>
	</div>
</nav>

<style>
	.safe-area-pb {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
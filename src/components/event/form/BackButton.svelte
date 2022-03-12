<script>
	export let send;
</script>

<button
	type="button"
	on:click={() => send('CLOSE_EVENT')}
	class="mr-2 inline-flex items-center border border-transparent text-sm font-medium rounded-md text-indigo-500 hover:text-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
>
	<span class="material-icons"> arrow_back </span>
</button>

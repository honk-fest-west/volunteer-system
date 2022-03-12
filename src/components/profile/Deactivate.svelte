<script>
	export let send;

	function deleteAccount() {
		if (window.confirm('Are you sure you want to delete your account?')) {
			send('DELETE_ACCOUNT');
		}
	}
</script>

<button
	class="shrink flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	on:click={deleteAccount}>Delete Account</button
>

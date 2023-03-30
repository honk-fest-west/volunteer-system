<script lang="ts">
	import { getContext } from 'svelte';

	const { send, state } = getContext('auth');
	const data = { displayName: '', email: '', phoneNumber: '', password: '', re_enter_password: '' };

	const signUpHandler = async (e: Event) => {
		send('SIGN_UP', { data });
	};
</script>

<form on:submit|preventDefault={signUpHandler} class="space-y-6">
	<div class="space-y-1">
		<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
		<div class="mt-1">
			<input
				id="password"
				name="password"
				type="password"
				autocomplete="current-password"
				required
				class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				bind:value={data.password}
			/>
		</div>
	</div>
	
	<div class="space-y-1">
		<label for="re-enter-password" class="block text-sm font-medium text-gray-700"> Re-enter Password </label>
		<div class="mt-1">
			<input
				id="re-enter-password"
				name="re-enter-password"
				type="password"
				autocomplete="current-password"
				required
				class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				bind:value={data.re_enter_password}
			/>
		</div>
	</div>

	<div class="pt-2">
		<button
			type="submit"
			class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Sign up
		</button>
	</div>
</form>

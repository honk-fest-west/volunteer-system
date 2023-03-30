<script lang="ts">
  import { getContext } from 'svelte';

  const { state, send } = getContext('auth');

  const loginHandler = async (event) => {
    const { email, password } = event.target.elements;
    // send login event
    send('LOGIN', {
      provider: 'email_password',
      email: email.value,
      password: password.value,
    });
  };
</script>

<form on:submit|preventDefault={loginHandler} class="space-y-6">
  <div class="space-y-1">
    <label for="password" class="block text-sm font-medium text-gray-700">
      Password
    </label>
    <div class="mt-1">
      <input
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        data-testid="signin-password"
        required
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  </div>

  <!-- <div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
				</div>

				<div class="text-sm">
					<a href="/auth/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
						Forgot your password?
					</a>
				</div>
			</div> -->

  <div class="pt-2">
    <button
      data-testid="signin-submit"
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign in
    </button>
  </div>
</form>

<script lang="ts">
	export let send;
</script>

<!-- <div>
	<button
		class="w-full inline-flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm bg-white text-sm font-medium text-[#1877F2] hover:bg-gray-50"
		on:click={() => send('LOGIN', { provider: 'facebook' })}
	>
		<span class="sr-only">Sign in with Facebook</span>
		<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</div> -->

<div>
	<button
		class="w-full inline-flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
		on:click={() => send('LOGIN', { provider: 'google' })}
	>
		<span class="sr-only">Sign in with Google</span>
		<svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 256 256">
			<path
				fill="#4285F4"
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
			/>
			<path
				fill="#34A853"
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
			/>
			<path
				fill="#FBBC05"
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
			/>
			<path
				fill="#EB4335"
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
			/>
		</svg>
	</button>
</div>

<div>
	<button
		class="w-full inline-flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm bg-white text-sm font-medium text-[#6CADDE] hover:bg-gray-50"
		on:click={() => send('LOGIN', { provider: 'twitter' })}
	>
		<span class="sr-only">Sign in with Twitter</span>
		<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
			<path
				d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
			/>
		</svg>
	</button>
</div>

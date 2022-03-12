<div
	class="max-w-7xl mx-auto  
	 py-6 px-4 py-6 sm:px-6 lg:px-8 flex justify-between sticky top-12 sm:top-0 bg-white"
>
	<slot name="header" />
	<slot name="actions" />
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<main>
		<slot />
	</main>
</div>

<div
  class="max-w-7xl mx-auto z-30 
	 py-6 px-4 sm:px-6 lg:px-8 flex justify-between sticky top-12 sm:top-0 bg-white"
>
  <div class="my-1">
    <slot name="header" />
  </div>

  <slot name="actions" />
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
  <main>
    <slot />
  </main>
</div>

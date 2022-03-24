<div class="flex flex-col">
  <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle px-1">
      <div class="">
        <table class="min-w-full border-separate" style="border-spacing: 0">
          <thead class="bg-gray-50">
            <slot name="head" />
          </thead>
          <tbody class="bg-white">
            <slot />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

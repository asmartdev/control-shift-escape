<template>
  <div>
    <div class="bg-gray-100 min-h-screen border-t-4 border-indigo-700">
      <div class="container mx-auto">
        <div class="h-10 flex justify-between pt-3">
          <span class="ml-4 -mt-1">
            <span class="text-sm bg-indigo-700 text-white px-4 py-3 rounded-b">
              <router-link to="/">
                Control Shift
                <span class="font-semibold">Escape</span>
              </router-link>
            </span>
            <span class="text-indigo-700 ml-2 uppercase text-sm font-semibold">Beta</span>
          </span>
          <span class="-mt-1">
            <a href="https://github.com/asmartdev/control-shift-escape">
              <font-awesome-icon
                :icon="['fab', 'github']"
                class="h-5 w-5 text-indigo-700"
                size="lg"
              />
            </a>
          </span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

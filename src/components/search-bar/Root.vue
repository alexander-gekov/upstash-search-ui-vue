<script
  setup
  lang="ts"
  generic="T extends { id: string, name: string, description: string, icon: any }">
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandSeparator,
  CommandEmpty,
  Command,
} from "../../ui/command";

import { ref, watch, onMounted, computed } from "vue";
import { useSearch } from "../../composables/useSearch";

const props = defineProps<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchFn: (query: string) => Promise<T[]>;
}>();

const loading = ref(false);
const results = ref<T[]>([]);

const { debouncedQuery, immediateQuery } = useSearch();

watch(debouncedQuery, async (val) => {
  if (!val.trim()) {
    results.value = [];
    return;
  }

  loading.value = true;
  try {
    const res = await props.searchFn(val);
    results.value = Array.isArray(res) ? res : [];
  } catch (e) {
    results.value = [];
  } finally {
    loading.value = false;
  }
});

function reset() {
  immediateQuery.value = "";
  results.value = [];
}
</script>

<template>
  <CommandDialog :open="open" @update:open="onOpenChange">
    <Command
      class="bg-white text-black overflow-hidden p-2 sm:p-5 flex h-full w-full flex-col">
      <!-- Input Field -->
      <div class="relative">
        <div class="absolute inset-y-0 left-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </div>
        <CommandInput
          v-model="immediateQuery"
          class="placeholder:text-gray-400 border border-gray-800 ring-2 ring-transparent border-opacity-50 bg-clip-padding shadow focus:ring-emerald-500 pl-12 flex h-12 w-full rounded-lg py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
          @keydown.esc="reset" />
      </div>

      <!-- Results -->
      <CommandList
        class="outline-none border-none max-h-[300px] mt-5 scroll-py-5 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
        <template v-if="loading">
          <div
            v-for="n in 3"
            :key="n"
            class="relative flex cursor-default items-center gap-3 rounded-xl p-3 text-sm outline-hidden select-none">
            <div
              class="flex items-center justify-center size-10 rounded-lg border border-gray-200 bg-gray-100 shrink-0 animate-pulse" />
            <div class="flex flex-col flex-1 min-w-0">
              <div
                class="h-4 bg-gray-200 rounded animate-pulse mb-1.5"
                :style="{ width: `${60 + Math.random() * 30}%` }" />
              <div class="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
            </div>
          </div>
        </template>

        <template v-else-if="results.length === 0">
          <CommandEmpty class="py-6 text-center text-sm"
            >No results found</CommandEmpty
          >
        </template>

        <template v-else>
          <ShadCommandItem
            v-for="item in results"
            :key="item.id"
            :value="item.id"
            class="group data-[selected=true]:bg-gray-100 relative flex cursor-default items-center gap-3 rounded-xl p-3 text-sm outline-hidden select-none hover:bg-gray-50">
            <div
              class="flex items-center justify-center size-10 rounded-lg p-2.5 border border-gray-200 bg-white shrink-0">
              <component :is="item.icon" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900" />
              <p class="text-xs text-gray-500 mt-0.5" v-if="item.description">
                {{ item.description }}
              </p>
            </div>
          </ShadCommandItem>
        </template>
      </CommandList>
    </Command>
  </CommandDialog>
</template>

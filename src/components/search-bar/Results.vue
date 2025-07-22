<script setup lang="ts" generic="T">
import { CommandList, CommandEmpty } from "../../ui/command";
import { ref, watch } from "vue";

export interface ResultsProps<T> {
  searchFn: (query: string) => Promise<T[]>;
  query: string;
}

const props = defineProps<ResultsProps<T>>();

const loading = ref(false);
const results = ref<T[]>([]);

watch(
  () => props.query,
  async (val) => {
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
  }
);
</script>

<template>
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
      <slot :results="results" />
    </template>
  </CommandList>
</template>

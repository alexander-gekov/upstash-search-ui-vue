<script setup lang="ts" generic="T extends { id: string }">
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
  <CommandList>
    <CommandEmpty v-if="!loading && results.length === 0">
      No results found.
    </CommandEmpty>

    <div v-if="loading" class="space-y-2 p-2">
      <div
        v-for="i in 5"
        :key="i"
        class="flex items-center space-x-4 rounded-md px-2 py-3">
        <div class="h-7 w-7 animate-pulse rounded-md bg-gray-100" />
        <div class="space-y-2">
          <div class="h-4 w-[100px] animate-pulse rounded-md bg-gray-100" />
          <div class="h-3 w-[200px] animate-pulse rounded-md bg-gray-100" />
        </div>
      </div>
    </div>

    <div v-if="!loading && results.length > 0">
      <slot
        name="default"
        v-for="result in results"
        :key="result.id"
        :result="result" />
    </div>
  </CommandList>
</template>

<script setup lang="ts" generic="T extends { id: string }">
import { ref, VNode, watch } from "vue";
import { useSearch } from "../../composables/useSearch";
import List from "./List.vue";
import Item from "./Item.vue";
import ItemContent from "./ItemContent.vue";

export interface ResultsProps<T> {
  children: (result: T) => VNode;
  searchFn: (query: string) => Promise<T[]>;
  debounceMs?: number;
}

const props = defineProps<ResultsProps<T>>();

const results = ref<T[]>([]);
const isLoading = ref(false);
const { debouncedQuery, immediateQuery } = useSearch();
const currentQueryRef = ref<string>("");

const search = async ({ query }: { query: string }) => {
  if (query.trim() && props.searchFn) {
    currentQueryRef.value = query;
    isLoading.value = true;
    try {
      const searchResults = await props.searchFn(query);
      if (currentQueryRef.value === query) {
        results.value = Array.isArray(searchResults) ? searchResults : [];
      }
    } catch (error) {
      console.error("Search error:", error);
      if (currentQueryRef.value === query) {
        results.value = [];
      }
    } finally {
      if (currentQueryRef.value === query) {
        isLoading.value = false;
      }
    }
  } else {
    currentQueryRef.value = "";
    results.value = [];
    isLoading.value = false;
  }
};

watch(
  immediateQuery,
  () => {
    if (!Boolean(immediateQuery.value?.trim())) {
      currentQueryRef.value = "";
      results.value = [];
      isLoading.value = false;
      return;
    }
  },
  { immediate: true }
);

watch(
  debouncedQuery,
  () => {
    if (debouncedQuery !== undefined && debouncedQuery.value.trim()) {
      search({ query: debouncedQuery.value });
    } else {
      currentQueryRef.value = "";
      results.value = [];
      isLoading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <List v-if="isLoading" v-bind="$attrs">
    <div
      v-for="i in 3"
      :key="i"
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
  </List>
  <List v-else-if="!isLoading && results.length === 0" v-bind="$attrs">
    <div class="text-sm text-gray-500">No results found.</div>
  </List>
  <List v-else v-bind="$attrs">
    <Item v-for="result in results" :key="result.id" :value="result.id">
      <ItemContent>
        <slot :result="result" />
      </ItemContent>
    </Item>
  </List>
</template>

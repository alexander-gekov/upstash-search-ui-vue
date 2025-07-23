<script setup lang="ts" generic="T">
import { ref, watch, type HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { type DialogContentEmits, useForwardPropsEmits } from "reka-ui";

import { useSearch } from "../../composables/useSearch";
import CommandList, {
  type CommandListProps,
} from "../../ui/command/CommandList.vue";
import CommandGroup from "../../ui/command/CommandGroup.vue";
import CommandEmpty from "../../ui/command/CommandEmpty.vue";

export type OptionalPromise<T> = Promise<T> | T;

export type searchFnType<T> = (query: string) => OptionalPromise<T[]>;

export interface SearchResultsProps<T> extends CommandListProps {
  class?: HTMLAttributes["class"];
  searchFn?: searchFnType<T>;
  debounceMs?: number;
}

const props = defineProps<SearchResultsProps<T>>();

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const results = ref<T[]>([]);
const isLoading = ref(false);

const searchContext = useSearch();
const { debouncedQuery, immediateQuery } = searchContext || {};
let currentQuery = "";

const search = async ({ query }: { query: string }) => {
  if (query.trim() && props.searchFn) {
    currentQuery = query;
    isLoading.value = true;
    try {
      const searchResults = await props.searchFn(query);
      if (currentQuery === query) {
        results.value = Array.isArray(searchResults) ? searchResults : [];
      }
    } catch (error) {
      console.error("Search error:", error);
      if (currentQuery === query) {
        results.value = [];
      }
    } finally {
      if (currentQuery === query) {
        isLoading.value = false;
      }
    }
  } else {
    currentQuery = "";
    results.value = [];
    isLoading.value = false;
  }
};

watch(
  () => immediateQuery?.value,
  (val) => {
    if (!Boolean(val?.trim())) {
      results.value = [];
      isLoading.value = false;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => debouncedQuery?.value,
  (val) => {
    if (val !== undefined && val.trim()) {
      search({ query: val });
    } else {
      currentQuery = "";
      results.value = [];
      isLoading.value = false;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<template>
  <CommandList v-bind="forwarded">
    <CommandGroup>
      <template v-if="isLoading">
        <div
          v-for="index in 3"
          :key="index"
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
      <template v-else>
        <template v-for="(result, idx) in results" :key="idx">
          <slot name="result" :result="result" :item-value="idx" />
        </template>
      </template>
    </CommandGroup>
    <CommandEmpty v-if="!results.length && !isLoading"
      >No results found</CommandEmpty
    >
  </CommandList>
</template>

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
}

const props = defineProps<SearchResultsProps<T>>();

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const results = ref<T[]>([]);
const isLoading = ref(false);

const searchContext = useSearch();
const { debouncedQuery, immediateQuery } = searchContext;

const search = async (query: string) => {
  if (query.trim() && props.searchFn) {
    isLoading.value = true;
    try {
      const searchResults = await props.searchFn(query);
      results.value = Array.isArray(searchResults)
        ? searchResults
        : [searchResults];
      isLoading.value = false;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    results.value = [];
    immediateQuery.value = "";
    isLoading.value = false;
  }
};

watch(
  () => debouncedQuery.value,
  (val) => {
    search(val);
  }
);

watch(
  () => immediateQuery.value,
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
</script>

<template>
  <template v-if="isLoading">
    <CommandList v-bind="forwarded">
      <div
        v-for="index in 3"
        :key="'skeleton-' + index"
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
    </CommandList>
  </template>

  <template v-else>
    <CommandList v-bind="forwarded" v-if="results.length">
      <CommandGroup>
        <template v-for="(result, idx) in results" :key="idx">
          <slot name="result" :result="result" :item-value="idx" />
        </template>
      </CommandGroup>
    </CommandList>

    <CommandList v-bind="forwarded" v-else>
      <CommandEmpty>No results found.</CommandEmpty>
    </CommandList>
  </template>
</template>

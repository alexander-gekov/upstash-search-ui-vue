<script setup lang="ts">
import { ref, useTemplateRef, watch, type HTMLAttributes } from "vue";
import { reactiveOmit, useDebounce } from "@vueuse/core";
import {
  type DialogContentEmits,
  type DialogContentProps,
  useForwardPropsEmits,
} from "reka-ui";

import { cn } from "../../utils";

import { useSearch } from "../../composables/useSearch";
import CommandInput from "../../ui/command/CommandInput.vue";

interface Props extends DialogContentProps {
  class?: HTMLAttributes["class"];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Search for a movie...",
});

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const query = ref("");
const debouncedQuery = useDebounce(query, 300);
const inputRef = useTemplateRef<HTMLInputElement>("inputRef");

const searchContext = useSearch();

watch(debouncedQuery, (val) => {
  searchContext.debouncedQuery.value = val;
});

watch(query, (val) => {
  searchContext.immediateQuery.value = val;
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    query.value = "";
    searchContext.immediateQuery.value = "";
    searchContext.debouncedQuery.value = "";
  }
};
</script>

<template>
  <div className="relative flex flex-col justify-center p-2">
    <div
      className="absolute inset-y-0 left-6 flex items-center text-muted-foreground justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 shrink-0 opacity-50"
        aria-hidden="true">
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
    </div>
    <CommandInput
      ref="inputRef"
      @keydown="handleKeyDown"
      v-model="query"
      v-bind="forwarded"
      data-slot="command-input"
      :class="
        cn(
          'placeholder:text-gray-400 border border-gray-800 ring-2 ring-transparent border-opacity-50 bg-clip-padding shadow focus:ring-emerald-500 rounded-lg pl-12 flex h-12 w-full py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
      aria-label="Search"
      aria-describedby="search-help" />
  </div>
</template>

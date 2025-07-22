<script setup lang="ts">
import { useTemplateRef } from "vue";
import CommandInput from "../../ui/command/CommandInput.vue";
import { useSearch } from "../../composables/useSearch";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");

const { immediateQuery } = useSearch();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    immediateQuery.value = "";
  }
};
</script>

<template>
  <div className="relative">
    <div className="absolute inset-y-0 left-4 flex items-center justify-center">
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
      :model-value="immediateQuery"
      @update:model-value="immediateQuery = $event"
      @keydown="handleKeyDown"
      :class="
        cn(
          'placeholder:text-gray-400 border border-gray-800 ring-2 ring-transparent border-opacity-50 bg-clip-padding shadow focus:ring-emerald-500 pl-12 flex h-12 w-full rounded-lg py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className
        )
      "
      aria-label="Search"
      aria-describedby="search-help"
      v-bind="$attrs"
      autoFocus />
  </div>
</template>

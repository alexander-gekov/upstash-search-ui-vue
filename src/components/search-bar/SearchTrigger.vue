<script setup lang="ts">
import { DialogTrigger } from "../dialog";
import { cn } from "../../utils";

defineProps<{
  placeholder?: string;
  className?: string;
}>();
</script>

<template>
  <DialogTrigger asChild v-bind="$attrs">
    <button
      type="button"
      :class="
        cn(
          'flex items-center gap-3 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50',
          className
        )
      ">
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
        className="size-4 shrink-0">
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
      <span class="flex-1 text-left">{{ placeholder }}</span>
    </button>
  </DialogTrigger>
</template>

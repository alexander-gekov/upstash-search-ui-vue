<script setup lang="ts">
import { CommandInput } from "../../ui/command";

export interface InputProps {
  placeholder?: string;
  modelValue: string;
}

export interface InputEmits {
  (e: "update:modelValue", value: string): void;
}

const props = defineProps<InputProps>();
const emit = defineEmits<InputEmits>();
</script>

<template>
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
      :model-value="modelValue"
      @update:model-value="(value: string) => emit('update:modelValue', value)"
      :placeholder="placeholder"
      class="placeholder:text-gray-400 border border-gray-800 ring-2 ring-transparent border-opacity-50 bg-clip-padding shadow focus:ring-emerald-500 pl-12 flex h-12 w-full rounded-lg py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50" />
  </div>
</template>

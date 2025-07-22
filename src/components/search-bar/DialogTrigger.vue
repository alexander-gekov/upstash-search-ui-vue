<script setup lang="ts">
export interface DialogTriggerProps {
  placeholder?: string;
  open?: boolean;
}

export interface DialogTriggerEmits {
  (e: "update:open", value: boolean): void;
}

const props = defineProps<DialogTriggerProps>();
const emit = defineEmits<DialogTriggerEmits>();
</script>

<template>
  <button
    type="button"
    class="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-left text-gray-500 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    @click="() => emit('update:open', true)">
    <div class="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2">
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
      <span>{{ placeholder }}</span>
    </div>
    <kbd
      class="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-100 bg-gray-100 px-1.5 font-mono text-[10px] font-medium opacity-100">
      <span class="text-xs">⌘</span>K
    </kbd>
  </button>
</template>

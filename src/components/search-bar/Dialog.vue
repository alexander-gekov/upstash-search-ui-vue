<script setup lang="ts">
import { CommandDialog, Command } from "../../ui/command";

export interface DialogProps {
  open?: boolean;
}

export interface DialogEmits {
  (e: "update:open", value: boolean): void;
}

const props = defineProps<DialogProps>();
const emit = defineEmits<DialogEmits>();
</script>

<template>
  <CommandDialog
    :open="open"
    @update:open="(value) => emit('update:open', value)">
    <Command
      class="bg-white text-black overflow-hidden p-2 sm:p-5 flex h-full w-full flex-col">
      <slot />
    </Command>
  </CommandDialog>
</template>

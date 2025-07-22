<script setup lang="ts">
import { CommandItem } from "../../ui/command";

export interface ItemProps {
  value: string;
}

defineProps<ItemProps>();
</script>

<template>
  <CommandItem
    :value="value"
    class="group data-[selected=true]:bg-gray-100 relative flex cursor-default items-center gap-3 rounded-xl p-3 text-sm outline-hidden select-none hover:bg-gray-50">
    <slot />
  </CommandItem>
</template>

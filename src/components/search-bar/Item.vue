<script setup lang="ts">
import { CommandItem } from "../../ui/command";
import { cn } from "../../utils";

defineProps<{
  className?: string;
  value: string;
}>();

const emits = defineEmits({
  "on-select": (value: string) => value,
});
</script>

<template>
  <CommandItem
    data-slot="command-item"
    :value="value"
    :class="
      cn(
        'group data-[selected=true]:bg-gray-100 relative flex cursor-default items-center gap-3 rounded-xl p-3 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-gray-50',
        className
      )
    "
    v-bind="$attrs"
    @select="emits('on-select', value)">
    <slot />
    <slot name="icon" />
  </CommandItem>
</template>

<script setup lang="ts">
import CommandSeparator from "../../ui/command/CommandSeparator.vue";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <CommandSeparator
    data-slot="command-separator"
    :class="cn('bg-gray-200 -mx-1 h-px', className)"
    v-bind="$attrs">
    <slot />
  </CommandSeparator>
</template>

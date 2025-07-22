<script setup lang="ts">
import { Command } from "../../ui/command";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <Command
    data-slot="command"
    :class="
      cn(
        'bg-white text-black overflow-hidden p-2 sm:p-5 flex h-full w-full flex-col',
        className
      )
    "
    v-bind="$attrs"
    :props="$props">
    <slot />
  </Command>
</template>

<script setup lang="ts">
import CommandList from "../../ui/command/CommandList.vue";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <CommandList
    data-slot="command-list"
    :class="
      cn(
        'outline-none border-none',
        'max-h-[300px] mt-5 scroll-py-5 overflow-x-hidden overflow-y-auto',
        '[&::-webkit-scrollbar]:w-1.5',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-gray-200',
        '[&::-webkit-scrollbar-thumb]:rounded-full',
        '[&::-webkit-scrollbar-thumb:hover]:bg-gray-300',
        className
      )
    "
    :style="{
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgb(229 231 235) transparent',
    }"
    v-bind="$attrs">
    <slot />
  </CommandList>
</template>

<script setup lang="ts">
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-center size-10 rounded-lg p-2.5 border border-gray-200 bg-white shrink-0',
        className
      )
    ">
    <slot />
  </div>
</template>

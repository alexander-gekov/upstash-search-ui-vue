<script setup lang="ts">
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="
      cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)
    "
    v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="cn('flex flex-col gap-2 text-center sm:text-left', className)"
    v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <div :class="cn('flex-1 min-w-0', className)" v-bind="$attrs">
    <slot />
  </div>
</template>

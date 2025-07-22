<script setup lang="ts">
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <p :class="cn('text-xs text-gray-500 mt-0.5', className)" v-bind="$attrs">
    <slot></slot>
  </p>
</template>

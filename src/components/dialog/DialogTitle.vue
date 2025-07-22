<script setup lang="ts">
import { DialogTitle } from "reka-ui";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    :class="cn('text-lg leading-none font-semibold', className)"
    v-bind="$attrs">
    <slot />
  </DialogTitle>
</template>

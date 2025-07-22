<script setup lang="ts">
import { DialogOverlay } from "reka-ui";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    v-bind="$attrs"
    :class="
      cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )
    ">
    <slot />
  </DialogOverlay>
</template>

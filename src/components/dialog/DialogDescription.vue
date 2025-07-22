<script setup lang="ts">
import { DialogDescription } from "reka-ui";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    :class="cn('text-muted-foreground text-sm', className)"
    v-bind="$attrs">
    <slot />
  </DialogDescription>
</template>

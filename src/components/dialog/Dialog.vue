<script setup lang="ts">
import { DialogRoot } from "reka-ui";

defineProps<{
  open?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
</script>

<template>
  <DialogRoot
    data-slot="dialog"
    v-bind="$attrs"
    :open="open"
    @update:open="(value) => emit('update:open', value)">
    <slot />
  </DialogRoot>
</template>

<script setup lang="ts">
import Dialog from "../dialog/Dialog.vue";

export interface DialogProps {
  open?: boolean;
}

export interface DialogEmits {
  (e: "update:open", value: boolean): void;
}

defineProps<DialogProps>();
const emit = defineEmits<DialogEmits>();
</script>

<template>
  <Dialog
    :open="open"
    @update:open="(value) => emit('update:open', value)"
    v-bind="$attrs">
    <slot />
  </Dialog>
</template>

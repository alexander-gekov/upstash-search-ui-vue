<script setup lang="ts">
import {
  type DialogRootEmits,
  type DialogRootProps,
  useForwardPropsEmits,
} from "reka-ui";
import Dialog from "../../ui/dialog/Dialog.vue";

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <Dialog v-bind="forwarded">
    <slot />
  </Dialog>
</template>

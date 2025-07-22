<script setup lang="ts">
import { DialogPortal } from "reka-ui";
</script>

<template>
  <DialogPortal data-slot="dialog-portal" v-bind="$attrs">
    <slot />
  </DialogPortal>
</template>

<script setup lang="ts">
import { DialogClose } from "reka-ui";
</script>

<template>
  <DialogClose data-slot="dialog-close" v-bind="$attrs">
    <slot />
  </DialogClose>
</template>

<script setup lang="ts">
import { DialogContent } from "reka-ui";
import DialogPortal from "./DialogPortal.vue";
import DialogOverlay from "./DialogOverlay.vue";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <DialogPortal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      :class="
        cn(
          'fixed inset-x-0 mx-auto z-50 grid w-full gap-4 border bg-background duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[15px] data-[state=open]:slide-in-from-top-[15px] max-w-[calc(100%-2rem)] sm:max-w-[512px]',
          className
        )
      "
      v-bind="$attrs">
      <slot />
    </DialogContent>
  </DialogPortal>
</template>

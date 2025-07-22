<script setup lang="ts">
import { cn } from "../../utils";
import { DialogHeader } from "../dialog";
import { DialogTitle } from "../dialog";
import { DialogDescription } from "../dialog";
import { DialogContent } from "../dialog";
import Root from "./Root.vue";

defineProps<{
  title?: string;
  description?: string;
  className?: string;
}>();
</script>

<template>
  <div class="relative">
    <DialogHeader class="sr-only">
      <DialogTitle>{{ title }}</DialogTitle>
      <DialogDescription>{{ description }}</DialogDescription>
    </DialogHeader>
    <DialogContent
      :class="
        cn('top-24 overflow-hidden p-0 rounded-2xl sm:rounded-3xl', className)
      "
      v-bind="$attrs">
      <Root
        className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        <slot />
      </Root>
    </DialogContent>
  </div>
</template>

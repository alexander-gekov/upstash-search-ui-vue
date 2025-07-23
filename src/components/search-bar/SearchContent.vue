<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
  type DialogContentEmits,
  type DialogContentProps,
  useForwardPropsEmits,
} from "reka-ui";

import DialogHeader from "../../ui/dialog/DialogHeader.vue";
import DialogTitle from "../../ui/dialog/DialogTitle.vue";
import DialogDescription from "../../ui/dialog/DialogDescription.vue";
import DialogContent from "../../ui/dialog/DialogContent.vue";
import { cn } from "../../utils";
import Command from "../../ui/command/Command.vue";

interface Props extends DialogContentProps {
  class?: HTMLAttributes["class"];
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Search",
  description: "Search for a movie",
});

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <div className="relative">
    <DialogHeader className="sr-only">
      <DialogTitle>{{ title }}</DialogTitle>
      <DialogDescription>{{ description }}</DialogDescription>
    </DialogHeader>
    <DialogContent
      :class="
        cn('top-24 overflow-hidden p-0 rounded-xl sm:rounded-2xl', props.class)
      "
      v-bind="forwarded">
      <Command
        :class="
          cn(
            '[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'
          )
        ">
        <slot />
      </Command>
    </DialogContent>
  </div>
</template>

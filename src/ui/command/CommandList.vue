<script setup lang="ts">
import type { ListboxContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ListboxContent, useForwardProps } from "reka-ui";
import { cn } from "../../utils";

export type CommandListProps = ListboxContentProps & {
  class?: HTMLAttributes["class"];
};

const props = defineProps<CommandListProps>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ListboxContent
    v-bind="forwarded"
    :class="
      cn('max-h-[300px] overflow-y-scroll overflow-x-hidden', props.class)
    ">
    <div role="presentation">
      <slot />
    </div>
  </ListboxContent>
</template>

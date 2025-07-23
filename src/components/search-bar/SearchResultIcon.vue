<script setup lang="ts" generic="T">
import { type HTMLAttributes } from "vue";
import { useForwardProps } from "reka-ui";

import { cn } from "../../utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const forwarded = useForwardProps(props);
</script>

<template>
  <div
    v-bind="forwarded"
    :class="
      cn(
        'flex items-center justify-center size-10 rounded-lg p-2.5 border border-gray-200 bg-white shrink-0',
        props.class
      )
    ">
    <slot />
  </div>
</template>

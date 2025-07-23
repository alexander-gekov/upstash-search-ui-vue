<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { type DialogContentProps, useForwardProps } from "reka-ui";

import { cn } from "../../utils";

import CommandSeparator from "../../ui/command/CommandSeparator.vue";

interface Props extends DialogContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const forwarded = useForwardProps(props);
</script>

<template>
  <CommandSeparator
    v-bind="forwarded"
    :class="cn('bg-gray-200 -mx-1 h-px', props.class)" />
</template>

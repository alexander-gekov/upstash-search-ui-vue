<script setup lang="ts" generic="T">
import { type HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { useForwardPropsEmits } from "reka-ui";

import CommandItem from "../../ui/command/CommandItem.vue";
import { cn } from "../../utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  itemValue: string;
  result: any;
}>();

const emits = defineEmits<{
  select: [event: Event];
}>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const handleSelect = (event: Event) => {
  emits("select", event);
};
</script>

<template>
  <CommandItem
    data-slot="command-item"
    :value="props.itemValue"
    v-bind="forwarded"
    @select="handleSelect"
    :class="
      cn(
        'group data-[selected=true]:bg-gray-100 relative flex cursor-default items-center gap-3 rounded-xl p-3 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-gray-50',
        props.class
      )
    ">
    <!-- icon slot -->
    <slot name="icon" />
    <!-- title slot -->
    <div>
      <slot name="title" />
    </div>
    <!-- description slot -->
    <div>
      <slot name="description" />
    </div>
    <!-- shortcut slot -->
    <slot name="shortcut" />
  </CommandItem>
</template>

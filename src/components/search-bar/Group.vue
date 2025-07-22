<script setup lang="ts">
import CommandGroup from "../../ui/command/CommandGroup.vue";
import { cn } from "../../utils";

defineProps<{
  className?: string;
}>();
</script>

<template>
  <CommandGroup
    data-slot="command-group"
    :class="
      cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className
      )
    "
    v-bind="$attrs">
    <slot />
  </CommandGroup>
</template>

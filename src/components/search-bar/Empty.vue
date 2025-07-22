<script setup lang="ts">
import CommandEmpty from "../../ui/command/CommandEmpty.vue";
</script>

<template>
  <CommandEmpty
    data-slot="command-empty"
    class="py-6 text-center text-sm"
    v-bind="$attrs">
    <slot />
  </CommandEmpty>
</template>

<template>
  <div class="gekata-container w-full bg-red-100 p-4" v-bind="forwarded">
    <span class="emoji-slot">
      <slot name="emoji"></slot>
    </span>
    <h1 class="gekata-text font-sans text-2xl font-bold">Gekata</h1>
  </div>
</template>

<script setup lang="ts">
import { useForwardProps } from "reka-ui";

const props = defineProps<{
  class: string;
}>();

const forwarded = useForwardProps(props);
</script>

<style scoped></style>

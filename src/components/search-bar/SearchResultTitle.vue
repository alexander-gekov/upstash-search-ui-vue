<script setup lang="ts" generic="T">
import { type HTMLAttributes, computed } from "vue";
import { useForwardProps } from "reka-ui";

import { cn } from "../../utils";
import { useSearch } from "../../composables/useSearch";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  highlightClass?: HTMLAttributes["class"];
  text: string;
}>();

const forwarded = useForwardProps(props);
const searchContext = useSearch();
const query = searchContext?.debouncedQuery.value || "";

const levenshtein = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[b.length][a.length];
};

const highlightMatches = (text: string, query: string) => {
  if (!query.trim() || typeof text !== "string") return text;

  const searchWords = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length >= 2);
  if (searchWords.length === 0) return text;

  const tokenLower = text.toLowerCase();
  let result = text;

  searchWords.forEach((searchWord) => {
    const exactIndex = tokenLower.indexOf(searchWord);
    if (exactIndex !== -1) {
      const prefix = result.slice(0, exactIndex);
      const match = result.slice(exactIndex, exactIndex + searchWord.length);
      const suffix = result.slice(exactIndex + searchWord.length);
      result = `${prefix}<span class="${cn(
        "underline underline-offset-3 decoration-2 decoration-emerald-500 text-emerald-500",
        props.highlightClass
      )}">${match}</span>${suffix}`;
      return;
    }

    const maxDistance =
      searchWord.length <= 2 ? 0 : searchWord.length <= 4 ? 1 : 2;

    for (let i = 0; i <= tokenLower.length - searchWord.length; i++) {
      const substring = tokenLower.slice(i, i + searchWord.length);
      if (levenshtein(substring, searchWord) <= maxDistance) {
        const prefix = result.slice(0, i);
        const match = result.slice(i, i + searchWord.length);
        const suffix = result.slice(i + searchWord.length);
        result = `${prefix}<span class="${cn(
          "underline underline-offset-3 decoration-2 decoration-emerald-500 text-emerald-500",
          props.highlightClass
        )}">${match}</span>${suffix}`;
        return;
      }
    }
  });

  return result;
};

const highlightedText = computed(() => {
  return highlightMatches(props.text, query);
});
</script>

<template>
  <p
    v-if="query && typeof text === 'string'"
    v-bind="forwarded"
    :class="cn('font-medium text-gray-900', props.class)"
    v-html="highlightedText" />
  <p
    v-else
    v-bind="forwarded"
    :class="cn('font-medium text-gray-900', props.class)"
    v-html="text" />
</template>

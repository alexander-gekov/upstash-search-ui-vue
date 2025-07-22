<script setup lang="ts">
import { computed } from "vue";
import { useSearch } from "../../composables/useSearch";
import { cn } from "../../utils";

defineProps<{
  className?: string;
  highlightClassName?: string;
}>();

const { debouncedQuery } = useSearch();
const query = computed(() => debouncedQuery.value);

// const levenshtein = (a: string, b: string): number => {
//   if (a.length === 0) return b.length;
//   if (b.length === 0) return a.length;

//   const matrix = Array(b.length + 1)
//     .fill(null)
//     .map(() => Array(a.length + 1).fill(null));

//   for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
//   for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

//   for (let j = 1; j <= b.length; j++) {
//     for (let i = 1; i <= a.length; i++) {
//       const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
//       matrix[j][i] = Math.min(
//         matrix[j][i - 1] + 1,
//         matrix[j - 1][i] + 1,
//         matrix[j - 1][i - 1] + indicator
//       );
//     }
//   }

//   return matrix[b.length][a.length];
// };

// const highlightMatches = (text: string, query: string): (VNode | string)[] => {
//   if (!query.trim() || typeof text !== "string") return [text];

//   const searchWords = query
//     .trim()
//     .toLowerCase()
//     .split(/\s+/)
//     .filter((word) => word.length >= 2);
//   if (searchWords.length === 0) return [text];

//   const tokens = text.split(/(\s+|[.,!?;])/g);

//   return tokens.map((token, i) => {
//     const tokenLower = token.trim().toLowerCase();
//     if (!tokenLower) return token;

//     let highlightedToken: VNode | string = token;
//     let shouldHighlight = false;

//     searchWords.forEach((searchWord) => {
//       const exactIndex = tokenLower.indexOf(searchWord);
//       if (exactIndex !== -1) {
//         shouldHighlight = true;
//         if (token.length > searchWord.length) {
//           const prefix = token.slice(0, exactIndex);
//           const match = token.slice(exactIndex, exactIndex + searchWord.length);
//           const suffix = token.slice(exactIndex + searchWord.length);
//           highlightedToken = h(Fragment, null, [
//             prefix,
//             h(
//               "span",
//               {
//                 class: cn(
//                   "underline underline-offset-3 decoration-2 decoration-emerald-500 text-emerald-500",
//                   props.highlightClassName
//                 ),
//               },
//               match
//             ),
//             suffix,
//           ]);
//         }
//         return;
//       }

//       const maxDistance =
//         searchWord.length <= 2 ? 0 : searchWord.length <= 4 ? 1 : 2;

//       for (let i = 0; i <= tokenLower.length - searchWord.length; i++) {
//         const substring = tokenLower.slice(i, i + searchWord.length);
//         if (levenshtein(substring, searchWord) <= maxDistance) {
//           shouldHighlight = true;
//           const prefix = token.slice(0, i);
//           const match = token.slice(i, i + searchWord.length);
//           const suffix = token.slice(i + searchWord.length);
//           highlightedToken = h(Fragment, null, [
//             prefix,
//             h(
//               "span",
//               {
//                 class: cn(
//                   "underline underline-offset-3 decoration-2 decoration-emerald-500 text-emerald-500",
//                   props.highlightClassName
//                 ),
//               },
//               match
//             ),
//             suffix,
//           ]);
//           return;
//         }
//       }
//     });

//     return shouldHighlight
//       ? typeof highlightedToken === "string"
//         ? h(
//             "span",
//             {
//               key: i,
//               class: cn(
//                 "underline underline-offset-3 decoration-2 decoration-emerald-500 text-emerald-500",
//                 props.highlightClassName
//               ),
//             },
//             token
//           )
//         : h("span", { key: i }, highlightedToken)
//       : token;
//   });
// };
</script>

<template>
  <p
    v-if="query && $slots.default"
    :class="cn('font-medium text-gray-900', className)"
    v-bind="$attrs">
    <slot></slot>
  </p>
</template>

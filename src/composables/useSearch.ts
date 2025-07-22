import { ref } from "vue";
import { useDebounce } from "@vueuse/core";

const immediateQuery = ref("");
const debouncedQuery = useDebounce(immediateQuery, 300);

export function useSearch() {
  return { immediateQuery, debouncedQuery };
}

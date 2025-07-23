import { ref } from "vue";

const immediateQuery = ref("");
const debouncedQuery = ref("");

export function useSearch() {
  return {
    immediateQuery,
    debouncedQuery,
  };
}

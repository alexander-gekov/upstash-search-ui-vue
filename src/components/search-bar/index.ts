import Dialog from "./Dialog.vue";
import DialogTrigger from "./DialogTrigger.vue";
import DialogContent from "./DialogContent.vue";
import Input from "./Input.vue";
import Results from "./Results.vue";
import Item from "./Item.vue";
import ResultIcon from "./ResultIcon.vue";
import ResultContent from "./ResultContent.vue";
import ResultTitle from "./ResultTitle.vue";

export const SearchBar = {
  Dialog,
  DialogTrigger,
  DialogContent,
  Input,
  Results,
  Result: Item,
  ResultIcon,
  ResultContent,
  ResultTitle,
} as const;

export type SearchBarNamespace = typeof SearchBar;

export default SearchBar;

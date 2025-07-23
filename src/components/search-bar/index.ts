import type { App, Plugin } from "vue";
import { registerComponent } from "../../utils";

import Dialog from "./SearchDialog.vue";
import DialogTrigger from "./SearchTrigger.vue";
import DialogContent from "./SearchContent.vue";
import SearchInput from "./SearchInput.vue";
import SearchResults from "./SearchResults.vue";
import SearchResult from "./SearchResult.vue";
import SearchResultIcon from "./SearchResultIcon.vue";
import SearchResultContent from "./SearchResultContent.vue";
import SearchResultTitle from "./SearchResultTitle.vue";
import Separator from "./Separator.vue";

export default {
  install(app: App) {
    registerComponent(app, Dialog);
    registerComponent(app, DialogTrigger);
    registerComponent(app, DialogContent);
    registerComponent(app, SearchInput);
    registerComponent(app, SearchResults);
    registerComponent(app, SearchResult);
    registerComponent(app, SearchResultIcon);
    registerComponent(app, SearchResultContent);
    registerComponent(app, SearchResultTitle);
    registerComponent(app, Separator);
  },
} as Plugin;

export { Dialog as SearchBarDialog };
export { DialogTrigger as SearchBarDialogTrigger };
export { DialogContent as SearchBarDialogContent };
export { SearchInput as SearchBarInput };
export { SearchResults as SearchBarResults };
export { SearchResult as SearchBarResult };
export { SearchResultIcon as SearchBarResultIcon };
export { SearchResultContent as SearchBarResultContent };
export { SearchResultTitle as SearchBarResultTitle };
export { Separator as SearchBarSeparator };

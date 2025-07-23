import type { App, Plugin } from "vue";
import { registerComponent } from "../../utils";

import Dialog from "./SearchDialog.vue";
import DialogTrigger from "./SearchTrigger.vue";
import DialogContent from "./SearchContent.vue";
import SearchInput from "./SearchInput.vue";
// import Input from "./SearchInput.vue";
// import Item from "./SearchItem.vue";
// import Title from "./SearchTitle.vue";
// import ItemContent from "./SearchItemContent.vue";
// import Separator from "./SearchSeparator.vue";
// import Results from "./SearchResults.vue";

export default {
  install(app: App) {
    registerComponent(app, Dialog);
    registerComponent(app, DialogTrigger);
    registerComponent(app, DialogContent);
    registerComponent(app, SearchInput);
    // registerComponent(app, Input);
    // registerComponent(app, Item);
    // registerComponent(app, Title);
    // registerComponent(app, ItemContent);
    // registerComponent(app, Separator);
    // registerComponent(app, Results);
  },
} as Plugin;

export { Dialog as SearchBarDialog };
export { DialogTrigger as SearchBarDialogTrigger };
export { DialogContent as SearchBarDialogContent };
export { SearchInput as SearchBarInput };
// export { Input as SearchBarInput };
// export { Item as SearchBarResult };
// export { Title as SearchBarResultTitle };
// export { ItemContent as SearchBarResultContent };
// export { Separator as SearchBarSeparator };
// export { Results as SearchBarResults };

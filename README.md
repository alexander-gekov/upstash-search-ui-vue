# Upstash Search UI (Vue port)

This library is inspired by [@upstash/search-ui](https://github.com/upstash/search-ui). Props to their team for building it.

A beautifully-designed, accessible search component. Built on top of [Reka UI](https://reka-ui.com/)

<img width="895" height="536" alt="showcase" src="https://github.com/user-attachments/assets/da828272-ea9d-4f9c-872d-943f4d6a5efe" />

---

## Features

- **Built-in highlighting**: Automatic result keyword highlighting
- **Loading states**: Beautiful, minimal skeleton loading states
- **Keyboard navigation**: Full keyboard support
- **Debounced search**: Optimized for performance
- **Customizable**: Smart defaults, but 100% customizable

---

## 1. Installation

```bash
npm install upstash-search-ui-vue
```

### Plugin Installation

### 1.1 Vue App

```typescript
// main.ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// import plugin and css
import UpstashSearchUi from "upstash-search-ui-vue";
import "upstash-search-ui-vue/dist/index.css";

// use it
createApp(App).use(UpstashSearchUi).mount("#app");
```

### 1.2 Nuxt Module

There is no Nuxt module for this package yet. If you want to use it in a Nuxt project, you can use the plugin installation method above.

---

## 2. Code Example

Our search component is designed to be **provider agnostic**.

In the code below we're using [Upstash Search](https://upstash.com/docs/search/overall/whatisupstashsearch) - Upstash's solution for fast, reliable and highly scalable serverless search.

Creating a search database takes less than a minute: [get started here](https://upstash.com/docs/search/overall/getstarted). To follow along with Upstash Search, install the package:

```bash
npm install @upstash/search
```

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@upstash/search";
import {
  SearchBarDialog,
  SearchBarDialogTrigger,
  SearchBarDialogContent,
  SearchBarInput,
  SearchBarResults,
  SearchBarResult,
  SearchBarResultTitle,
  SearchBarResultContent,
  SearchBarResultIcon,
  SearchBarSeparator,
} from "upstash-search-ui-vue";

const client = new Search({
  url: "UPSTASH_URL",
  token: "UPSTASH_READ_ONLY_TOKEN",
});

type Record = {
  title: string;
  overview: string;
};

type Metadata = {
  poster_link: string;
};

const query = ref("");

const index = client.index<Record, Metadata>("movies");
const searchFn = async (q: string) => {
  return index.search({ query: q, limit: 10, reranking: true });
};
</script>

<template>
  <main class="max-w-2xl mx-auto p-4">
    <SearchBarDialog>
      <SearchBarDialogTrigger :placeholder="'Type to search movies...'" />
      <SearchBarDialogContent class="bg-white" :title="query">
        <SearchBarInput v-model="query" placeholder="Search movies..." />
        <SearchBarResults :searchFn="searchFn">
          <template #result="{ result }">
            <SearchBarResult
              :result="result"
              :itemValue="result.content.title"
              class="flex justify-between">
              <SearchBarResultIcon class="w-10 aspect-auto p-0">
                <img
                  :src="result.metadata?.poster_link"
                  class="w-full rounded-md"
                  alt="" />
              </SearchBarResultIcon>
              <SearchBarResultContent>
                <SearchBarResultTitle :text="result.content.title" />
                <div class="text-sm line-clamp-3">
                  {{ result.content.overview }}
                </div>
              </SearchBarResultContent>
            </SearchBarResult>
            <SearchBarSeparator />
          </template>
        </SearchBarResults>
      </SearchBarDialogContent>
    </SearchBarDialog>
  </main>
</template>
```

## Customization

This component is beautifully pre-styled, but 100% customizable. You can change every piece of it yourself by passing normal props to each component (such as `class`). **For example**: If you wanted to change the primary color, change the CSS classes:

```vue
<SearchBarResultTitle
  class="font-medium text-gray-900"
  highlightClass="decoration-red-500 text-red-500"
  :text="result.content.title">
</SearchBarResultTitle>
```

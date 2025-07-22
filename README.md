# Upstash Search UI (Vue port)

A beautifully-designed, accessible search component. Built on top of [Reka UI](https://reka-ui.com/)

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

```typescript
// 👇 import components and optimized styles
import {
  SearchBarDialog,
  SearchBarDialogTrigger,
  SearchBarDialogContent,
  SearchBarInput,
  SearchBarResults,
  SearchBarResult,
  SearchBarResultIcon,
  SearchBarResultContent,
  SearchBarResultTitle,
} from "upstash-search-ui-vue";
import "upstash-search-ui-vue/dist/index.css";
```

---

## 2. Code Example

Our search component is designed to be **provider agnostic**.

In the code below we're using [Upstash Search](https://upstash.com/docs/search/overall/whatisupstashsearch) - our solution for fast, reliable and highly scalable serverless search.

Creating a search database takes less than a minute: [get started here](https://upstash.com/docs/search/overall/getstarted). To follow along with Upstash Search, install the package:

```bash
npm install @upstash/search
```

````vue
<script setup lang="ts">
import {
  SearchBarDialog,
  SearchBarDialogTrigger,
  SearchBarDialogContent,
  SearchBarInput,
  SearchBarResults,
  SearchBarResult,
  SearchBarResultIcon,
  SearchBarResultContent,
  SearchBarResultTitle,
} from "upstash-search-ui-vue";
import "upstash-search-ui-vue/dist/index.css";

import { Search } from "@upstash/search";
import { FileText } from "lucide-vue-next";

const client = new Search({
  url: "<UPSTASH_SEARCH_URL>",
  token: "<YOUR_SEARCH_READONLY_TOKEN>",
});

// 👇 your search index name
const index = client.index<{ title: string }>("movies");
</script>

<template>
  <SearchBarDialog>
    <SearchBarDialogTrigger>
      <SearchBarInput placeholder="Type to search movies..." />
    </SearchBarDialogTrigger>

    <SearchBarDialogContent>
      <SearchBarResults
        :searchFn="
          (query) => index.search({ query, limit: 10, reranking: true })
        ">
        <template #default="{ result }">
          <SearchBarResult :value="result.id">
            <SearchBarResultIcon>
              <FileText class="text-gray-600" />
            </SearchBarResultIcon>

            <SearchBarResultContent>
              <SearchBarResultTitle>
                {{ result.content.title }}
              </SearchBarResultTitle>
              <p class="text-xs text-gray-500 mt-0.5">Movie</p>
            </SearchBarResultContent>
          </SearchBarResult>
        </template>
      </SearchBarResults>
    </SearchBarDialogContent>
  </SearchBarDialog>
</template>

## Customization This component is beautifully pre-styled, but 100%
customizable. You can change every piece of it yourself by passing normal props
to each component (such as `class`). **For example**: If you wanted to change
the primary color, change the CSS classes: ```vue
<SearchBarInput
  class="focus:ring-red-500"
  placeholder="Type to search movies..." />

<SearchBarResultTitle
  class="font-medium text-gray-900"
  highlightClass="decoration-red-500 text-red-500">
  {{ result.content.title }}
</SearchBarResultTitle>
````

---

This component is based on the [Reka UI Dialog Primitive](https://reka-ui.com/docs/components/dialog).

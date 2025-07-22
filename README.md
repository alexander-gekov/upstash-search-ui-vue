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
// 👇 import package and optimized styles
import { SearchBar } from "upstash-search-ui-vue";
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

```vue
<script setup lang="ts">
import { SearchBar } from "upstash-search-ui-vue";
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
  <div class="max-w-sm mt-24 mx-auto">
    <SearchBarDialog>
      <SearchBarDialogTrigger placeholder="Search movies..." />
      <SearchBarDialogContent>
        <SearchBarInput placeholder="Type to search movies..." />
        <SearchBarResults
          :searchFn="
            (query) => {
              // 👇 100% type-safe: whatever you return here is
              // automatically typed as `result` below
              return index.search({ query, limit: 10, reranking: true });
            }
          ">
          <template #result="{ result }">
            <SearchBarResult :value="result.id" :key="result.id">
              <SearchBarResultIcon>
                <FileText className="text-gray-600" />
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
  </div>
</template>
```

---

## Using a Readonly Token (recommended)

The token used in the `Search` client above is a read-only token.

<Frame><img src='/img/search/readonly_token.png' /></Frame>

This token is safe to expose on the frontend. This allows your application to perform search queries without the need for a backend API.

To use environment variables for the token, set it as `NEXT_PUBLIC_YOUR_READONLY_TOKEN` in your `.env` file.

Optionally, you can also create a separate backend API to handle search on the server.

---

## Handling Results

You can perform actions with the search results by using the `onSelect` prop on `SearchBar.Item`:

```vue
<SearchBarResult
  :onSelect="() => {
    // 👇 do something with result
    console.log(result)
  }"
  :value="result.id"
  :key="result.id"
>
```

---

## Customization

This component is beautifully pre-styled, but 100% customizable. You can change every piece of it yourself by passing normal props to each component (such as `class`).

**For example**: If you wanted to change the primary color, change the CSS classes:

```vue
<SearchBarInput
  class="focus:ring-red-500"
  placeholder="Type to search movies..." />

<SearchBarResultTitle
  class="font-medium text-gray-900"
  highlightClass="decoration-red-500 text-red-500">
  {{ result.content.title }}
</SearchBarResultTitle>
```

---

This component is based on the [Reka UI Dialog Primitive](https://reka-ui.com/docs/components/dialog).

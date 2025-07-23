import type { App, Plugin, defineComponent } from "vue";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export let VueInstance: App | undefined;

/** set the global vue instance */
export const setVueInstance = (Vue: App): void => {
  VueInstance = Vue;
};

/** register a plugin to the vue app instance */
export const registerPlugin = (app: App, plugin: Plugin): void => {
  app.use(plugin);
};

/** register a component to the vue app instance */
export const registerComponent = (
  app: App,
  component: ReturnType<typeof defineComponent> // type Component isn't correct since vue 3.5 any more
): void => {
  app.component(component.name, component);
};

/// <reference types="vite/client" />

declare module '*.jsx' {
    import type { ReactElement } from 'react';
    const component: () => ReactElement;
    export default component;
  }
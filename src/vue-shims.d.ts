/* eslint-disable @typescript-eslint/no-empty-object-type */

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/* eslint-enable @typescript-eslint/no-empty-object-type */

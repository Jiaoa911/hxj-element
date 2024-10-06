import type { App, Plugin } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

// 一次性安装多个Vue插件，而不需要单独调用app.use()多次
export function makeInstaller(components: Plugin[]) {
  const install = (app: App) =>
    each(components, (c) => {
      app.use(c);
    });

  return install;
}
// withInstall则允许将Vue组件转换为可通过app.use()或app.component()进行全局注册的插件形式
// withInstall函数是一个泛型函数，它接收一个Vue组件component作为参数，并返回这个组件的增强版本。这个增强版本的组件多了一个install方法，允许它被Vue应用实例通过app.use()或app.component()进行全局注册。
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name || "UnnamedComponent";
    app.component(name, component as SFCWithInstall<T>);
  };
  return component as SFCWithInstall<T>;
};

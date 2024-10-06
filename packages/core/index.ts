import {makeInstaller}  from '@hxj-element/utils'
import components from './components'
import '@hxj-element/theme/index.css'
const installer=makeInstaller(components)

export * from "@hxj-element/components"
export default installer

// 用户使用这个包的时候可以以一个vue插件的方式使用 app.use挂载到实例上
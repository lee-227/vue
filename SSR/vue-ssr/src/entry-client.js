import { createApp } from './app'

// 客户端特定引导逻辑……
console.log('浏览器执行，用于接管页面交互')
const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
  app.$mount('#app')
})

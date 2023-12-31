let id = 0
export class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  depend() {
    Dep.target.addDep(this) // 让 watcher 存放 dep
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}
Dep.target = null
export function pushTarget(watcher) {
  Dep.target = watcher
}
export function popTarget() {
  Dep.target = null
}

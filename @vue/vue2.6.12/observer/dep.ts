import Watcher from './watcher'
let uid = 0;

export default class Dep {
  static target: Watcher
  public id: number
  private subs: Watcher[]

  constructor() {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

}

export function remove (subs: Watcher[], sub: Watcher) {
  if (subs.length) {
    const index = subs.indexOf(sub)
    if (index > -1) {
      return subs.splice(index, 1)
    }
  }
}
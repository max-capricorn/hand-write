import { noop } from '../shared';
import { parsePath, SimpleSet } from '../utils';
import Dep from './dep'

let uid = 0
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Dep[]
  newDeps: Dep[]
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: Function;
  getter: Function;
  value: any;

  constructor(vm: Component, expOrEn: string | Function, cb: Function, options?: any, isRenderWatcher?: boolean) {
    this.vm = vm;

    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this);

    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }

    this.cb = cb
    this.id = ++uid;

    this.active = true;
    this.dirty = this.lazy
    this.deps = [];
    this.newDeps = []
    this.expression = process.env.NODE_ENV !== 'production' ? expOrEn.toString() : ''

    if (typeof expOrEn === 'function') {
      this.getter = expOrEn
    } else {
      this.getter = parsePath(expOrEn)
      if (!this.getter) {
        this.getter = noop
      }
    }

    this.value = this.lazy? undefined : this.get()
  }

  get () {
    let value: any;
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        // handleError(e, vm, `getter for watcher ${this. expression}`)
      } else {
        throw e;
      }
    } finally {
      if (this.deep) {
        traverse(value)
      }

      this.cleanupDeps();
    }
    return value
  }

  addDep (dep: Dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    // this.deps = this.newDeps
    // this.newDeps = tmp
    // this.newDeps.length = 0;
  }
}
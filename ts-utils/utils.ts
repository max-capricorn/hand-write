// 实现PickPromise，能够获取泛型的类型，例如
// type A = Promise<number>
// type B = PickPromise<A> // number
type PickPromise<T extends Promise<unknown>> = T extends Promise<infer K> ? K : never;

type A = Promise<number>

type B = PickPromise<A>

// --------------------------------------------------------------------------------




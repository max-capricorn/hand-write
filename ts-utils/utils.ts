// 实现PickPromise，能够获取泛型的类型，例如
// type A = Promise<number>
// type B = PickPromise<A> // number

type PickPromise<T extends Promise<unknown>> = T extends Promise<infer K> ? K : never;

type A = Promise<number>

type B = PickPromise<A>

// --------------------------------------------------------------------------------


// 实现一个 ts 的工具函数 GetOnlyFnProps<T> ，提取泛型类型 T 中字段类型是函数的工具函数，其中 T 属于一个对象。

type GetOnlyFnKeys<T extends object> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

type GetOnlyFnProps<T extends object> = { [K in GetOnlyFnKeys<T>]: T[K] }

type example = {
  a: number;
  b: () => void
}

type result = GetOnlyFnKeys<example>

//---------------------------------------------------------------------------------


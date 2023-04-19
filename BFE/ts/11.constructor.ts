// your code here, dont' use ConstructorParameters<T> in your code
type MyConstructorParameters<T extends new (...args: any[]) => any> =
  T extends new (...args: infer Args) => any ? Args : never;

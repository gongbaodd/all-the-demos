type LastChar<T extends string> = T extends `${infer L}${infer R}`
  ? R extends ""
    ? L
    : LastChar<R>
  : never;
// your code here

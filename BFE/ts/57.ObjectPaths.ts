type ObjectPaths<O extends Record<string, any>> = {
  [K in keyof O]: K extends string
    ? O[K] extends Record<string, any>
      ? `${K}.${ObjectPaths<O[K]>}`
      : K
    : never;
}[keyof O];

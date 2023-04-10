function completeAssign(target, ...sources) {
  // your code here
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result = typeof target === "object" ? target : Object(target);

  sources
    .filter((s) => {
      return s !== null && s !== undefined;
    })
    .forEach((source) => {
      Object.defineProperties(result, Object.getOwnPropertyDescriptors(source));
    });

  return result;
}

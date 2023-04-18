console.log(String.raw`BFE\n.${"dev"}`); // "BFE\n.dev"
console.log(String.raw({ raw: "BFE" }, "d", "e", "v")); // "BdFeE"

/**
 * String.raw() works like an interweaving function. The first argument is an object with a raw property whose value is an iterable(could be a string or an array) representing the separated strings in the template literal. The rest of the arguments are the substitutions. Extra substitutions are ignored
 */

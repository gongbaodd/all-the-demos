// This is a JavaScript coding problem from BFE.dev

type IsBad = (version: number) => boolean;

function firstBadVersion(isBad: IsBad) {
  // firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  return (version: number): number => {
    // write your code to return the first bad version
    // if none found, return -1
    if (!isBad(version)) {
      return -1;
    }

    while (isBad(version) && version > -1) {
      version = Math.floor(version / 2);
    }

    for (let i = version * 2; i > version; i--) {
      if (!isBad(i)) return i + 1;
    }

    return -1;
  };
}

console.log(firstBadVersion((i) => i >= 4)(100));

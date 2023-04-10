// enable myCookie
function install() {
  // your code here
  const store = new Map();

  Object.defineProperty(document, "myCookie", {
    get() {
      let str = "";
      let count = 0;
      const now = Date.now();
      for (const [key, { value, end }] of store) {
        if (end <= now) {
          store.delete(key);
          continue;
        }
        str += `${key}=${value}` + (store.size - 1 === count ? "" : "; ");
        count++;
      }

      return str;
    },
    set(str) {
      let items = str.split(";");
      let end = Infinity;
      const now = Date.now();
      items = items
        .map((item) => item.trim().split("="))
        .map(([k, v]) => [k.trim(), v.trim()])
        .filter(([k, v]) => {
          if (k === "max-age") {
            const age = Number(v);
            if (isNaN(age)) end = Infinity;
            else end = now + age * 1000;
            return false;
          }
          return true;
        });
      items.forEach(([k, value]) =>
        store.set(k, {
          value,
          end,
        })
      );
    },
    configurable: true,
  });
}

// disable myCookie
function uninstall() {
  // your code here
  delete document.myCookie;
}

install();
document.myCookie = "bfe = dev; max-age=0";
document.myCookie = "bfe1 = dev1; max-age=1";
document.myCookie = "bfe2 = dev2; max-age=2";

console.log(document.myCookie);
console.log(document.myCookie.split("; ").sort());
//.toEqual("bfe1=dev1; bfe2=dev2".split("; ").sort());
setTimeout(() => {
  console.log(document.myCookie.split("; ").sort());
  //.toEqual("bfe2=dev2".split("; ").sort());
}, 1000);
setTimeout(() => {
  console.log(document.myCookie);
  //.toBe("");
  //done();
}, 2000);

Array.prototype.myMap = function (callback, obj) {
  // your code here
  let arr = [];
  const length = this.length;
  for (let i = 0; i < length; i++) {
    if (i in this) {
      arr[i] = callback.call(obj ?? this, this[i], i, this);
    }
  }
  return arr;
};

const arr = [1, 2, 3];
const arr2 = [1, 2, 3];

const callback = (item, i, array) => {
  array[1] = 4;
  array[2] = 6;
  return item;
};

const result = arr.myMap(callback);
console.log(result);

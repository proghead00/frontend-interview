const arr = [[[1, 2], 3], 4];

const flattenArrayFn = (arr) => {
  let flattenedArray = [];

  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flattenedArray = flattenedArray.concat(flattenArrayFn(element));
    } else {
      flattenedArray.push(element);
    }
  });

  return flattenedArray;
};

const result = flattenArrayFn(arr);
console.log(result);

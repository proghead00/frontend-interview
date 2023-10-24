const add = (...params) => params.reduce((total, num) => total + num, 0);

const myMemoize = (fn) => {
  // fn here is the add function (to be memoized)
  const cache = {};
  // closure is formed

  // we will return the following function that will be invoked further with the args
  return (...params) => {
    // params -> 1, 2, 3 passed as arguments
    let key = JSON.stringify(params);
    if (cache[key]) {
      console.log("Found in cache! ", cache);
      return cache[key];
    } else {
      cache[key] = fn(...params); // here, fn is equivalent to the add function hence
      console.log("Didn't find in cache - storing it right away!", cache);
      return cache[key];
    }
  };
};

// hence myMemoize will return the function which can be called further later with the arguments
const addMemoize = myMemoize(add);

console.log(addMemoize(1, 2, 3)); // should store the value initially
console.log(addMemoize(1, 2, 3)); // should give the value from cache

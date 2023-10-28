import fetch from "node-fetch";

// Promise.all
// kinda like short-circuit -> if ANY ONE FAILS, it doesn't bother to go beyond

const myPromiseAll = (promisesArray) => {
  let result = [];
  let completedTask = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      promise
        .then((data) => {
          result.push(data);
          completedTask++;
          if (completedTask === promisesArray.length) resolve(result);
        })
        .catch((err) => reject(err));
    });
  });
};

// raw promises
const fetchPromise = fetch("https://dummyjson.com/products/1").then((res) =>
  res.json()
);

const p1 = Promise.resolve(10);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

const promisesArray = [fetchPromise, p1, p2, p3];

const res1 = Promise.all(promisesArray);
const res = myPromiseAll(promisesArray);
res.then((data) => console.log(data));

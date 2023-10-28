// waits for ALL promises to be settled (be it success or failure)

const myPromiseSettled = (promisesArray) => {
  const result = [];

  return new Promise((resolve, reject) => {
    // we don't really need reject here since we would be storing all promises
    let settledCount = 0;

    promisesArray.forEach((promise) => {
      promise
        .then((data) => {
          result.push({ status: "fulfilled", value: data });
        })
        .catch((error) => {
          result.push({ status: "rejected", reason: error });
        })
        .finally(() => {
          settledCount++;

          if (settledCount === promisesArray.length) {
            resolve(result);
          }
        });
    });
  });
};

const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const promisesArray = [p1, p2];

const result = myPromiseSettled(promisesArray);
result.then((data) => console.log(data));

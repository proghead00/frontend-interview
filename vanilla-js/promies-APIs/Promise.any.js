// Promise.any
// waits for the first SUCCESS of a promise
// if each of them fails, it gives AggregateError

const myPromiseAny = (promisesArray) => {
  return new Promise((resolve, reject) => {
    let errorCount = 0;
    const errors = [];

    promisesArray.forEach((promise) => {
      promise
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          errors.push(error);
          errorCount++;

          if (completedTasks === promisesArray.length) {
            const aggregateError = new AggregateError(
              errors,
              "All promises were rejected"
            );
            reject(aggregateError);
          }
        });
    });
  });
};

const p1 = Promise.reject(1);
const p2 = Promise.reject(2);
const p3 = Promise.reject(3);

const promisesArray = [p1, p2, p3];

const res1 = Promise.any(promisesArray);
const res = myPromiseAny(promisesArray);
res.then((data) => console.log(data));

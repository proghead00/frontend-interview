// race gives value of the FIRST settled (be it success or failure)

const myPromiseRace = (promisesArray) => {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      promise
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(0);
  }, 1000);
});

const promisesArray = [p1, p2];

const result = myPromiseRace(promisesArray);
result.then((data) => console.log(data));

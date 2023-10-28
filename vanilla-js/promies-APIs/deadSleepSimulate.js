const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
  }, 5000);
});

// this will run only after promise is resolved above
p1.then((data) => console.log(data)).then(() => console.log("HEY"));

function setTimeoutWrapper() {
  let timerId = 0;
  let timerMap = {};

  function mySetTimeOut(callback, delay, ...) {
    let newId = timerId++;
    timerMap[newId] = true;

    let start = Date.now();
    let end = start + delay;

    function triggerCallback() {
      if (!timerMap[newId]) return;

      if (Date.now() > end) {
        callback.apply(this, params);
        // callback();
      } else {
        requestIdleCallback(triggerCallback);
      }
    }

    requestIdleCallback(triggerCallback);
    return newId;
  }

  function myClearTimeout(id) {
    delete timerMap[id];
  }

  return { mySetTimeOut, myClearTimeout };
}

let { mySetTimeOut, myClearTimeout } = setTimeoutWrapper();

console.log("Start");

let id = mySetTimeOut(function () {
  console.log("Inside setTimeOut");
}, 2000);

console.log("End");

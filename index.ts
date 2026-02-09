class CustomPromise {
  thenCallback: any;
  errorCallback: any;

  constructor(
    expectedExecuter: (
      resolver: (value: unknown) => any,
      reject: (reason?: unknown) => void,
    ) => any,
  ) {
    expectedExecuter(
      (data: any) => {
        this.thenCallback(data);
      },
      (reason?: any) => {
        this.errorCallback(reason);
      },
    );
  }

  then(successCallback: (data: any) => any) {
    // store user callback for then to run after resolved
    this.thenCallback = successCallback;
  }

  catch(errrorCallback: (reason?: any) => void) {
    // store user callback for error to run after rejected
    this.errorCallback = errrorCallback;
  }
}

function setTimeoutPromisified(ms: number) {
  return new CustomPromise((resolve) =>
    setTimeout(() => {
      resolve("Har Har");
    }, ms),
  );
}

function callback(data: any) {
  console.log(data);
}

setTimeoutPromisified(3000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });

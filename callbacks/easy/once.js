// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) {
    let isCalled = false
    let cache = null;
    let waiters = []

    return function (...args) {
        const callback = args.pop()

        if (isCalled && cache)
            return callback(...cache);

        if (isCalled) {
            waiters.push(callback);
            return;
        }

        isCalled = true

        fn(...args, (err, res) => {
            cache = [err, res];

            callback(err, res);

            while (waiters.length > 0) {
                const waiterCb = waiters.shift();
                waiterCb([err, res]);
            }
        })

    }
}


module.exports = once;


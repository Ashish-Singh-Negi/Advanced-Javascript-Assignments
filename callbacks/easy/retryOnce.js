// Problem Description – retryOnce(fn)
//
// You are given a function `fn` that returns a Promise.
// Your task is to return a new function that calls `fn` and retries it once
// if the first attempt rejects.
// If the second attempt also rejects, the error should be propagated.


function retryOnce(fn) {

    return async function (...args) {
        const callback = args.pop()
        let attempts = 0

        function attempt() {
            attempts++

            fn((err, success) => {
                if (success) {
                    return callback(null, success)
                }

                if (attempts < 2) {
                    return attempt()
                }

                return callback(err, null)
            })
        }

        attempt()
    }
}

module.exports = retryOnce;

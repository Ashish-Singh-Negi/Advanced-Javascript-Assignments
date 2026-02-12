
// Problem Description – Double Try (Basic Retry)
//
// You are given an async function fn that may fail.
// Your task is to implement doubleTry(fn).
//
// Call fn once. If it succeeds, return the result.
// If it fails, call fn one more time immediately.
// If the second attempt fails, reject with the error.

async function doubleTry(fn) {
    try {
        const res = await fn()
        return res
    } catch (err) {
        const res = await fn()
        return res
    }

}

module.exports = doubleTry;
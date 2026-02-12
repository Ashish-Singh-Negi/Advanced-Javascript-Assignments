// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method. 
// The function should accept an array of values that may include Promises or plain constants. 
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.




async function promiseAll(promises) {
    const result = []

    if (!Array.isArray(promises)) throw new TypeError();

    for (const promise of promises) {
        try {
            const res = await promise
            result.push(res)
        } catch (err) {
            throw err
        }
    }

    return result;
}

module.exports = promiseAll;

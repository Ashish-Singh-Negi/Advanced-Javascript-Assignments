// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
    let nextIndex = 0;
    let activeProcess = 0;
    let results = [];
    let isFinished = false;

    function launchProcess() {
        if (isFinished || activeProcess >= limit) return;

        if (nextIndex === items.length) {
            if (activeProcess == 0) {
                onComplete(null, results);
            }
            return
        }

        const currentIndex = nextIndex;
        nextIndex++;
        activeProcess++;

        worker(items[currentIndex], (err, result) => {
            if (err) {
                isFinished = true;
                onComplete(err, result);
                return
            }

            results.push(result)

            activeProcess--;
            launchProcess()
        })
    }

    launchProcess()
}

module.exports = batchProcess;

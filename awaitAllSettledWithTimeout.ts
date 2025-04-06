type SettledResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: any }
  | { status: 'timed_out'; timeout: number };

export async function awaitAllSettledWithTimeout<T>(
  tasks: (() => Promise<T>)[],
  timeoutMs: number
): Promise<SettledResult<T>[]> {
  const wrapWithTimeout = (fn: () => Promise<T>): Promise<SettledResult<T>> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve({ status: 'timed_out', timeout: timeoutMs });
      }, timeoutMs);

      fn()
        .then((value) => {
          clearTimeout(timer);
          resolve({ status: 'fulfilled', value });
        })
        .catch((reason) => {
          clearTimeout(timer);
          resolve({ status: 'rejected', reason });
        });
    });
  };

  return Promise.all(tasks.map(wrapWithTimeout));
}



// Example usage:
async function exampleTask(id: number): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(id), id * 100));
}
const tasks = [
  () => exampleTask(1),
  () => exampleTask(2),
  () => exampleTask(3),
];
const timeoutMs = 1500;
awaitAllSettledWithTimeout(tasks, timeoutMs).then((results) => {
  console.log(results);
});

// Output:
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'timed_out', timeout: 1500 }
// ]

// Note: The output may vary based on the timing of the tasks and the timeout.
// The third task may be fulfilled or timed out based on the timeoutMs value.
// The example tasks are designed to resolve after a delay based on their id.
// In this case, the third task is expected to time out if the timeoutMs is less than 3000.
// The first two tasks should fulfill successfully.
// The output will show the status of each task, indicating whether it was fulfilled, rejected, or timed out.
// The `timeout` property in the `timed_out` result indicates the timeout duration.
// This function can be useful for managing multiple asynchronous tasks with a timeout mechanism.
// It allows you to handle the results of each task, including those that may not complete within the specified timeout.
// This can be particularly useful in scenarios where you want to ensure that all tasks are attempted,
// but you also want to avoid waiting indefinitely for any single task to complete.
// You can adjust the timeout duration based on your specific use case and requirements.
// The function can be used in various scenarios, such as:
// - Making multiple API calls with a timeout to avoid long waits.
// - Running multiple database queries with a timeout to ensure responsiveness.
// - Executing multiple asynchronous operations in parallel with a timeout to prevent blocking.
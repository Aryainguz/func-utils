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

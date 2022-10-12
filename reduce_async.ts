export function reduceAsync<T>(
  iterable: AsyncIterable<T>,
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
  ) => T,
): Promise<T>;
export function reduceAsync<T>(
  iterable: AsyncIterable<T>,
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
  ) => T,
  initialValue: T,
): Promise<T>;
export function reduceAsync<T, U>(
  iterable: AsyncIterable<T>,
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
  ) => U,
  initialValue: U,
): Promise<U>;
export async function reduceAsync<T, U>(
  iterable: AsyncIterable<T>,
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
  ) => U,
  initialValue?: U,
): Promise<U> {
  if (arguments.length === 2) {
    let previousValue: U;
    let skip = true;
    for await (const item of iterable) {
      if (skip) {
        previousValue = item;
        skip = false;
        continue;
      }
      previousValue = callbackfn(previousValue, item, 0);
    }
    return previousValue as unknown as U;
  }
}
[].reduce;

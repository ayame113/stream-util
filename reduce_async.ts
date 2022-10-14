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
    currentValue: Awaited<T>,
    currentIndex: number,
  ) => U,
  initialValue?: U,
): Promise<U> {
  if (arguments.length === 2) {
    let previousValue = undefined as U;
    let isFirst = true;
    for await (const item of iterable) {
      if (isFirst) {
        previousValue = item as U;
        isFirst = false;
      } else {
        previousValue = callbackfn(previousValue, item, 0);
      }
    }
    if (isFirst) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    return previousValue;
  } else {
    let previousValue = initialValue as U;
    for await (const item of iterable) {
      previousValue = callbackfn(previousValue, item, 0);
    }
    return previousValue;
  }
}

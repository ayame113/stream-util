/** polyfill for Array.fromAsync */
export async function arrayFromAsync<T>(iterable: AsyncIterable<T>) {
  const result: Awaited<T>[] = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}

export function mapStream<I, O>(fn: (arg: I) => O) {
  return new TransformStream<I, O>({
    transform(chunk, controller) {
      controller.enqueue(fn(chunk));
    },
  });
}

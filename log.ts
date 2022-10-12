export class ConsoleLogStream<T> extends TransformStream<T> {
  constructor() {
    super({
      transform(chunk, controller) {
        console.log(chunk);
        controller.enqueue(chunk);
      },
    });
  }
}

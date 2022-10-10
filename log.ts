export class ConsoleLogStream extends TransformStream {
  constructor() {
    super({
      transform(chunk, controller) {
        console.log(chunk);
        controller.enqueue(chunk);
      }
    })
  }
}


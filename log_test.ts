import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  stub,
} from "https://deno.land/std@0.152.0/testing/mock.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.159.0/streams/mod.ts";
import { ConsoleLogStream } from "./log.ts";
import { arrayFromAsync } from "./array_from_async.ts";

Deno.test(async function consoleLogStream() {
  const logStub = stub(console, "log", () => {});
  try {
    assertEquals(
      await arrayFromAsync(
        readableStreamFromIterable([0, 1, 2])
          .pipeThrough(new ConsoleLogStream()),
      ),
      [0, 1, 2],
    );

    assertSpyCallArgs(logStub, 0, [0]);
    assertSpyCallArgs(logStub, 1, [1]);
    assertSpyCallArgs(logStub, 2, [2]);

    assertSpyCalls(logStub, 3);
  } finally {
    logStub.restore();
  }
});

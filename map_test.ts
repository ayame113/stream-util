import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.159.0/streams/mod.ts";
import { mapStream } from "./map.ts";
import { arrayFromAsync } from "./array_from_async.ts";

Deno.test(async function mappingStream() {
  assertEquals(
    await arrayFromAsync(
      readableStreamFromIterable([0, 1, 2])
        .pipeThrough(mapStream((i) => i ** 2)),
    ),
    [0, 1, 4],
  );
});

import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.159.0/streams/mod.ts";
import { reduceAsync } from "./reduce_async.ts";

Deno.test(async function mappingStream() {
  assertEquals(
    await reduceAsync(
      readableStreamFromIterable([0, 1, 2]),
      (p, c) => p + c,
    ),
    3,
  );
});

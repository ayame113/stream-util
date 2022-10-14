import {
  assertEquals,
  assertRejects,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.159.0/streams/mod.ts";
import { reduceAsync } from "./reduce_async.ts";

Deno.test(async function reduceAsyncWithInitialValue() {
  assertEquals(
    await reduceAsync(
      readableStreamFromIterable([0, 1, 2]),
      (p, c) => p + c,
      100,
    ),
    103,
  );
});

Deno.test(async function reduceAsyncWithoutInitialValue() {
  assertEquals(
    await reduceAsync(
      readableStreamFromIterable([0, 1, 2]),
      (p, c) => p + c,
    ),
    3,
  );
});

Deno.test(async function reduceAsyncWithoutInitialValueAndEmptyStream() {
  await assertRejects(
    async () =>
      await reduceAsync(
        readableStreamFromIterable([] as number[]),
        (p, c) => p + c,
      ),
    TypeError,
    "Reduce of empty array with no initial value",
  );
});

Deno.test(async function reduceAsyncWithPassingUndefinedAsInitialValue() {
  assertEquals(
    await reduceAsync(
      readableStreamFromIterable([] as string[]),
      (p, c) => `${p}${c}`,
      undefined,
    ),
    undefined,
  );
});

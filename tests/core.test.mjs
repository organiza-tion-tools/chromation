import test from "node:test";
import assert from "node:assert/strict";
import { hash, hashToColor, textToColor } from "../packages/core/dist/index.js";

test("hash is deterministic", () => {
  assert.equal(hash("password123"), hash("password123"));
  assert.notEqual(hash("password123"), hash("password124"));
});

test("hashToColor returns stable hsl string", () => {
  const color = hashToColor(123456);
  assert.match(color, /^hsl\(\d+ 70% 52%\)$/);
  assert.equal(color, hashToColor(123456));
});

test("textToColor is deterministic", () => {
  assert.equal(textToColor("hello"), textToColor("hello"));
});

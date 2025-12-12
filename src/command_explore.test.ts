// import { describe, expect, test } from "vitest";
// import { commandExit } from "./command_exit";

// describe.each([
//   {
//     input: "  ",
//     expected: [],
//   },
//   {
//     input: "  hello  ",
//     expected: ["hello"],
//   },
//   {
//     input: "  hello  world  ",
//     expected: ["hello", "world"],
//   },
//   {
//     input: "  HellO  World  ",
//     expected: ["hello", "world"],
//   },
// ])("cleanInput($input)", ({ input, expected }) => {
//   test(`Expected: ${expected}`, () => {
//     const actual = commandExit(input);
//     expect(actual).toHaveLength(expected.length);
//     for (const i in expected) {
//       expect(actual[i]).toBe(expected[i]);
//     }
//   });
// });

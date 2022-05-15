import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/SimpleTable";

test("mount component", () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {},
  });

  expect(wrapper.html()).toMatchSnapshot();
});
test('hello vitest', () => {
  expect(genNumber(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 })
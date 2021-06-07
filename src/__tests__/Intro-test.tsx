import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import RenderEnterComps from "../components/RenderEnterComps";

test("renders correctly", () => {
  const tree = renderer.create(<RenderEnterComps />).toJSON();
  expect(tree).toMatchSnapshot();
});

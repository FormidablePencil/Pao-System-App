import React from "react";
import renderer from "react-test-renderer";
import RenderEnterComps from "../components/RenderEnterComps";

test("renders correctly", () => {
  const tree = renderer.create(<RenderEnterComps />).toJSON();
  expect(tree).toMatchSnapshot();
});

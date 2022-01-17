import { render } from "@testing-library/react";
import { Blogs } from "../Blogs";

test("shows blogs list", () => {
  render(<Blogs />);
});

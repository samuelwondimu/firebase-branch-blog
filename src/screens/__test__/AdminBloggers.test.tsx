import { render, screen } from "@testing-library/react";
import { AdminBloggers } from "../AdminBloggers";

test("data grid table should render with title", () => {
  render(<AdminBloggers />);
  const linkElement = screen.getByText(/Name/i);
  expect(linkElement).toBeInTheDocument();
});

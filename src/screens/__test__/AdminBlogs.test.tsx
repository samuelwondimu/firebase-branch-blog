import { render, screen } from "@testing-library/react";
import { AdminBlogs } from "../AdminBlogs";

test("data grid table should render with title", () => {
  render(<AdminBlogs />);
  const linkElement = screen.getByText(/Title/i);
  expect(linkElement).toBeInTheDocument();
});

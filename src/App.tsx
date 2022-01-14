import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DashboardLayout, Navbar } from "./components";
import {
  SignIn,
  SignUp,
  BlogById,
  Blogs,
  CreateBlog,
  ForgotPassword,
  AdminUsers,
  AdminBloggers,
} from "./screens";
import { NotFound } from "./screens/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/blog/:id" element={<BlogById />} />
            <Route path="/" element={<Blogs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin/" element={<DashboardLayout />}>
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="bloggers" element={<AdminBloggers />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

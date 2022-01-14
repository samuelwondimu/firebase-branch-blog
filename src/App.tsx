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
  AdminDashboard,
  MyBlogs,
  AdminBlogs,
} from "./screens";
import { NotFound } from "./screens/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogById />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin/" element={<DashboardLayout />}>
            <Route path="admin-blogs" element={<AdminBlogs />} />
            <Route path="bloggers" element={<AdminBloggers />} />
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="my-blogs" element={<MyBlogs />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

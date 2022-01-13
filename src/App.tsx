import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CenterBox, DashboardLayout, Navbar } from "./components";
import {
  SignIn,
  SignUp,
  BlogById,
  Blogs,
  CreateBlog,
  ForgotPassword,
  AdminUsers,
} from "./screens";

function NotFound() {
  return <CenterBox>not found 404</CenterBox>;
}

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
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

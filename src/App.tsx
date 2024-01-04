import AuthLayout from "./_auth/AuthLayout";
import Signinform from "./_auth/AuthLayout/SigninFotm";
import Signupform from "./_auth/AuthLayout/SignupForm";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/RootLayout/pages/Home";
import "./global.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AllUsers from "./_root/RootLayout/pages/AllUsers";
import CreatePost from "./_root/RootLayout/pages/CreatePost";
import EditPost from "./_root/RootLayout/pages/EditPost";
import Explore from "./_root/RootLayout/pages/Explore";
import PostDetails from "./_root/RootLayout/pages/PostDetails";
import Profile from "./_root/RootLayout/pages/Profile";
import Saved from "./_root/RootLayout/pages/Saved";
import UpdateProfile from "./_root/RootLayout/pages/UpdateProfile";

const App = () => {
  return (
    <main className="flex  h-screen">
      <Routes>
        {/* public route */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Signinform />} />
          <Route path="/sign-up" element={<Signupform />} />
        </Route>
        {/* private route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;

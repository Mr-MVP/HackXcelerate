import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignInForm from "./_auth/forms/SignInForm";
import { Home } from "./_root/pages";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import AllUsers from "./_root/pages/AllUsers";
import CreatePost from "./_root/pages/CreatePost";
import Saved from "./_root/pages/Saved";
import Explore from "./_root/pages/Explore";
import EditPost from "./_root/pages/EditPost";
import ProfilePage from "./_root/pages/Profile";
import Profile from "./_root/pages/Profile";
import PostDetails from "./_root/pages/PostDetails";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/home-page" element={<Home />} />
          <Route path="/explore" element={<ProfilePage />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;

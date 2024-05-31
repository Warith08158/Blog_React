import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ConfirmAccount } from "../components/component";
import ProtectedRoutes from "./ProtectedRoutes";
import PageLayout from "../PageLayout/PageLayout";

const Home = lazy(() => import("../pages/Home/Home"));
const ForgetPassword = lazy(() =>
  import("../pages/forgetPassword/ForgetPassword")
);
const SignIn = lazy(() => import("../pages/signIn/SignIn"));
const SignUp = lazy(() => import("../pages/signUp/SignUp"));
const UserDashboard = lazy(() =>
  import("../pages/userDashboard/UserDashboard")
);
const Notifications = lazy(() =>
  import("../pages/notifications/Notifications")
);

const Users = lazy(() => import("../pages/users/Users"));
const ReadBlog = lazy(() => import("../pages/readBlog/ReadBlog"));

const RoutePages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route
            index
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
          />

          <Route
            path="notifications"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <Notifications />
              </Suspense>
            }
          />

          <Route
            path="read-blog/:id"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <ReadBlog />
              </Suspense>
            }
          />

          <Route
            path="users"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <Users />
              </Suspense>
            }
          />

          <Route
            path="sign-in"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="sign-up"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="forgetPassword"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <ForgetPassword />
              </Suspense>
            }
          />
          <Route
            path="protected-route"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <ProtectedRoutes />
              </Suspense>
            }
          >
            <Route
              path="user-dashboard"
              element={
                <Suspense
                  fallback={
                    <div className="fixed inset-0 flex items-center justify-center">
                      <Spinner />
                    </div>
                  }
                >
                  <UserDashboard />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="confirm-account"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                <ConfirmAccount />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePages;

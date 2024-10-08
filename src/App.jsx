import { useState, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme/theme-provider";
import Home from "./routes/Home";
import RootLayout from "./layout/RootLayout";
import Preloader from "./components/loader/Preloader";
import SignUp from "./routes/SignUp";
import ProtectedRoute from "./context/ProtectedRoute";
import SignIn from "./routes/Login";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import DashboardLayout from "./layout/DashboardLayout";
import Lobby from "./routes/dashboard/Lobby";
import NetWorth from "./routes/dashboard/NetWorth";
import Investment from "./routes/dashboard/Investment";
import Recurring from "./routes/dashboard/Recurring";
import Settings from "./routes/dashboard/Settings";
import Transaction from "./routes/dashboard/Transaction";
import Firecalculator from "./routes/dashboard/Firecalculator";
import Overviews from "./routes/dashboard/Overviews";
import Addbudget from "./routes/dashboard/Addbudget";
import AddGoal from "./routes/dashboard/AddGoal";
import OverviewGoal from "./routes/dashboard/OverviewGoal";
import Partnership from "./routes/dashboard/Partnership";
import Contact from "./routes/Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="lobby" element={<Lobby />} />
          <Route path="networth" element={<NetWorth />} />
          <Route path="budget/overview" element={<Overviews />} />
          <Route path="budget/addbudget" element={<Addbudget />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="goal/addgoal" element={<AddGoal />} />
          <Route path="goal/overviewgoal" element={<OverviewGoal />} />
          <Route path="investments" element={<Investment />} />
          <Route path="recurring" element={<Recurring />} />
          <Route path="partnership" element={<Partnership />} />
          <Route path="settings" element={<Settings />} />
          <Route path="contact" element={<Contact />} />
          <Route path="retirement" element={<Firecalculator />} />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="dark:bg-black">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        {!isLoading && (
          <AuthProvider>
            <Toaster />
            <RouterProvider router={router} />
          </AuthProvider>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;

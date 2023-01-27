import Home from "./components/Home";
import CardDetail from "./components/CardDetail";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { ItemsContextProvider } from "./store/ItemsContext";
import { DarkModeContextProvider } from "./store/DarkModeContext";
import { AuthContextProvider } from "./store/AuthContext";
import { app } from "./config/firebaseConfig";
import Register from "./components/Register";
import Logout from "./components/Logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        // <DarkModeContextProvider>
        <AuthContextProvider>
          <RootLayout />
        </AuthContextProvider>
      }
    >
      <Route
        index
        element={
          <ItemsContextProvider>
            <Home />
          </ItemsContextProvider>
        }
      />
      <Route
        path="/items/:id"
        element={
          <ItemsContextProvider>
            <CardDetail />
          </ItemsContextProvider>
        }
      />

      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  // console.log("app :>> ", app);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

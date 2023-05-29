import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register/Register.jsx"
import Login from "./pages/Login/Login.jsx"
import Home from "./pages/Home/Home.jsx"
import Article from "./pages/Article/Article.jsx"
import Write from "./pages/Write/Write.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";


const Layout = () => {
  return(
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children: [
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/post/:id",
        element:<Article />
      },
      {
        path:"/write",
        element:<Write />
      },
      {
        path:"/profile/:id",
        element: <Profile />,
      }

    ]
  },
  {
    path:"/register",
    element: <Register />,
  },
  {
    path:"/login",
    element: <Login />,
  },
  
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}


export default App;

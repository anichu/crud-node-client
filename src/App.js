import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import Update from "./Update/Update";
import Users from "./Users/Users";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home></Home>,
			loader: () => {
				return fetch("http://localhost:5000/users");
			},
		},
		{
			path: "/add/users",
			element: <Users></Users>,
		},
		{
			path: "/users/:id",
			element: <Update></Update>,
			loader: ({ params }) => {
				return fetch(`http://localhost:5000/users/${params.id}`);
			},
		},
	]);
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;

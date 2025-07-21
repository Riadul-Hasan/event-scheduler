import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";

import AddEvent from "../Pages/Add Event/AddEvent";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/addEvents",
        Component: AddEvent,
      },
    ],
  },
]);

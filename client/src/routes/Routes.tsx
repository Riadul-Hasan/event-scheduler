import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";

import AddEvent from "../Pages/Add Event/AddEvent";
import Home from "../Pages/Home/Home";
import AllEvents from "../Pages/AllEvents/AllEvents";
import ArchivePage from "../Pages/Archive/ArchivePage";

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
      {
        path: "/allEvents",
        Component: AllEvents,
      },
      {
        path: "/archive",
        Component: ArchivePage,
      },
    ],
  },
]);

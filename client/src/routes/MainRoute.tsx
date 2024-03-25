import { Suspense } from "react";
import CompareCars from "../container/salesground/compare-cars";
import Home from "../container/salesground/home";
import NewCars from "../container/salesground/new-cars";
import UsedCars from "../container/salesground/used-cars";

import NewCarById from "../container/salesground/new-cars/NewCarById";
import UsedCarById from "../container/salesground/used-cars/UsedCarById";
import AppLayout from "../layout";

const MainRoutes = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      path: "",
      element: (
        <Suspense fallback="Loading...">
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/salesground/new-cars",
      element: (
        <Suspense fallback="Loading...">
          <NewCars />
        </Suspense>
      ),
    },
    {
      path: "/salesground/new-cars/details/:id",
      element: (
        <Suspense fallback="Loading...">
          <NewCarById />
        </Suspense>
      ),
    },
    {
      path: "/salesground/used-cars",
      element: (
        <Suspense fallback="Loading...">
          <UsedCars />
        </Suspense>
      ),
    },
    {
      path: "/salesground/used-cars/details/:id",
      element: (
        <Suspense fallback="Loading...">
          <UsedCarById />
        </Suspense>
      ),
    },
    {
      path: "/salesground/compare-cars",
      element: (
        <Suspense fallback="Loading...">
          <CompareCars />
        </Suspense>
      ),
    },
  ],
};

export default MainRoutes;

import { type FC } from "react";
import { HomePage } from "./pages/home.tsx";
import { AboutPage } from "./pages/about.tsx";
import { PricesPage } from "./pages/prices.tsx";
import { ContactPage } from "./pages/contact.tsx";
import { AttractionsPage } from "./pages/attractions.tsx";

export interface AppRoute {
  path: string;
  title: string;
  description: string;
  component: FC;
  showInNavbar?: boolean;
}

export const routes: AppRoute[] = [
  {
    path: "/",
    title: "Home",
    description: "Welcome to AQUAMAGICA",
    component: HomePage,
    showInNavbar: true,
  },
  {
    path: "/attractions",
    title: "Attraktionen",
    description: "Entdecken Sie alle Rutschen, Becken und Erlebnisse im AQUAMAGICA.",
    component: AttractionsPage,
    showInNavbar: true,
  },
  {
    path: "/prices",
    title: "Preise",
    description: "Entdecken Sie unsere Preise und Angebote",
    component: PricesPage,
    showInNavbar: true,
  },
  {
    path: "/about",
    title: "Über uns",
    description: "Erfahren Sie mehr über AQUAMAGICA",
    component: AboutPage,
    showInNavbar: true,
  },
  {
    path: "/contact",
    title: "Kontakt & Hilfe",
    description: "Kontaktieren Sie uns für weitere Informationen",
    component: ContactPage,
    showInNavbar: false,
  },
];

// Helper functions for type-safe routing
export const getRouteByPath = (path: string): AppRoute | undefined => {
  return routes.find((route) => route.path === path);
};

export const getNavbarRoutes = (): AppRoute[] => {
  return routes.filter((route) => route.showInNavbar);
};

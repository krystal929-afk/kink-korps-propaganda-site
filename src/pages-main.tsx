import { createRoot } from "react-dom/client";
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { LandingPage } from "./components/landing-page";
import { PreviewHostBridge } from "./components/preview-host-bridge";
import { AuthProvider } from "./lib/auth/provider";
import "./styles.css";

const root = createRootRoute({ component: () => <AuthProvider><PreviewHostBridge /><Outlet /></AuthProvider> });
const index = createRoute({ getParentRoute: () => root, path: "/", component: LandingPage });
const router = createRouter({ routeTree: root.addChildren([index]), basepath: import.meta.env.BASE_URL });
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

import { createRoot } from "react-dom/client";
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { KorpsSite, pagePaths, type Page } from "./components/korps-site";
import { PreviewHostBridge } from "./components/preview-host-bridge";
import { AuthProvider } from "./lib/auth/provider";
import "./styles.css";

const root = createRootRoute({ component: () => <AuthProvider><PreviewHostBridge /><Outlet /></AuthProvider>, notFoundComponent: () => <KorpsSite page="missing" /> });
const routes = (Object.keys(pagePaths) as Page[]).filter(page => page !== "missing").map(page => createRoute({ getParentRoute: () => root, path: "/" + pagePaths[page].replace(/\/$/, ""), component: () => <KorpsSite page={page} /> }));
const router = createRouter({ routeTree: root.addChildren(routes), basepath: import.meta.env.BASE_URL });
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

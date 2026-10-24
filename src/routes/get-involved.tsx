import { createFileRoute } from "@tanstack/react-router";
import { KorpsSite, pageTitles } from "@/components/korps-site";
export const Route = createFileRoute("/get-involved")({
  head: () => ({ meta: [{ title: pageTitles.contact }] }),
  component: () => <KorpsSite page="contact" />,
});

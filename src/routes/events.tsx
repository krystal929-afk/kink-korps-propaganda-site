import { createFileRoute } from "@tanstack/react-router";
import { KorpsSite, pageTitles } from "@/components/korps-site";
export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: pageTitles.events }] }),
  component: () => <KorpsSite page="events" />,
});

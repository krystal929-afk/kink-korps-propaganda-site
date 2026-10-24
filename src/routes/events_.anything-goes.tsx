import { createFileRoute } from "@tanstack/react-router";
import { KorpsSite, pageTitles } from "@/components/korps-site";
export const Route = createFileRoute("/events_/anything-goes")({
  head: () => ({ meta: [{ title: pageTitles.event }] }),
  component: () => <KorpsSite page="event" />,
});

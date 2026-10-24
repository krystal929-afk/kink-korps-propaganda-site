import { createFileRoute } from "@tanstack/react-router";
import { KorpsSite, pageTitles } from "@/components/korps-site";
export const Route = createFileRoute("/field-guide")({
  head: () => ({ meta: [{ title: pageTitles.guide }] }),
  component: () => <KorpsSite page="guide" />,
});

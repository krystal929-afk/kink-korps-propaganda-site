import { createFileRoute } from "@tanstack/react-router";
import { KorpsSite, pageTitles } from "@/components/korps-site";
export const Route = createFileRoute("/the-korps")({
  head: () => ({ meta: [{ title: pageTitles.korps }] }),
  component: () => <KorpsSite page="korps" />,
});

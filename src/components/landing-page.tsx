import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Menu, X } from "lucide-react";
import {
  clearEnlistment,
  NIGHT_BLURB,
  readEnlistment,
  writeEnlistment,
  type Enlistment,
} from "@/lib/enlistment";

const START = new Date("2026-10-23T22:00:00-04:00").getTime();
const END = new Date("2026-10-24T04:00:00-04:00").getTime();
const MAPS = "https://www.google.com/maps/search/?api=1&query=1748+NW+38th+Ave+Lauderhill+FL";

const NAV = [
  { href: "#corps", label: "The Corps" },
  { href: "#night", label: "The Night" },
  { href: "#hosts", label: "Hosts" },
  { href: "#code", label: "The Code" },
  { href: "#posters", label: "Posters" },
  { href: "#enlist", label: "Enlist" },
];

type Sheet = {
  src: string;
  title: string;
  detail: string;
  alt: string;
  width: number;
  height: number;
};

const SHEETS: Sheet[] = [
  {
    src: `${import.meta.env.BASE_URL}media/poster-needs-you.jpg`,
    title: "The Korps needs you",
    detail: "A finger, and the order.",
    alt: "Poster. A woman in black latex points forward. Type reads: The Korps needs you. Enlist now.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-needs-hood.jpg`,
    title: "Needs you",
    detail: "The hooded call.",
    alt: "Poster. A figure in a black latex hood points at you. Type reads: The Korps needs you. Enlist now.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-floor.jpg`,
    title: "The floor calls",
    detail: "Enlist in the Kink Korps.",
    alt: "Poster. A woman in black latex raises one hand under a red sky. Type reads: The floor calls. Enlist in the Kink Korps.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-we-can.jpg`,
    title: "We can do it",
    detail: "Corset and a fist.",
    alt: "Poster in a navy circle. A masked woman in a corset and red bandana flexes. Type reads: We can do it. Kink Korps.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-we-can-harness.jpg`,
    title: "We can do it",
    detail: "Harness and a fist.",
    alt: "Poster in a navy circle. A masked woman in a leather harness and red bandana flexes. Type reads: We can do it. Kink Korps.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-enlist-bar.jpg`,
    title: "Enlist",
    detail: "The red bar.",
    alt: "Poster. A woman in sunglasses and a red collar stands behind a red bar. Type reads: Enlist. Kink Korps.",
    width: 1152,
    height: 1728,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-enlisted.jpg`,
    title: "Have you enlisted?",
    detail: "The red slash.",
    alt: "Poster with a red slash. A latex glove points, a hooded profile, and a boot. Type reads: Have you enlisted? Kink Korps.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-fist.jpg`,
    title: "Enlist",
    detail: "The raised fist.",
    alt: "Poster. A black-gloved fist with a red cuff. Type reads: Enlist. Kink Korps.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-heel.jpg`,
    title: "Enlist",
    detail: "The red sole.",
    alt: "Poster. A black pump with a red sole. Type reads: Enlist. Kink Korps.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-mask.jpg`,
    title: "Enlist",
    detail: "The mask, in profile.",
    alt: "Poster. A masked woman in profile against a red circle. Type reads: Enlist. Kink Korps.",
    width: 784,
    height: 1168,
  },
  {
    src: `${import.meta.env.BASE_URL}media/poster-hood.jpg`,
    title: "Enlist",
    detail: "The hood, in profile.",
    alt: "Poster. A latex hood in profile against a red circle. Type reads: Enlist. Kink Korps.",
    width: 784,
    height: 1168,
  },
];

const FIELD: Sheet[] = [
  {
    src: `${import.meta.env.BASE_URL}media/enlist-poster.jpg`,
    title: "I want you",
    detail: "The first enlistment sheet.",
    alt: "Poster. A figure in a full black latex suit points at you. Type reads: I want you for the Kink Korps. Enlist now.",
    width: 1152,
    height: 1728,
  },
  {
    src: `${import.meta.env.BASE_URL}media/flyer-parlor.png`,
    title: "Parlor",
    detail: "Candles, wine, and the raven.",
    alt: "Anything Goes parlor flyer. Candles, wine, and a raven.",
    width: 1122,
    height: 1402,
  },
  {
    src: `${import.meta.env.BASE_URL}media/flyer-gate.png`,
    title: "The gate",
    detail: "Both hosts, under the moon.",
    alt: "Anything Goes gate flyer. Both hosts under the moon.",
    width: 1024,
    height: 1536,
  },
  {
    src: `${import.meta.env.BASE_URL}media/flyer-coven.png`,
    title: "Coven",
    detail: "The hall, the hats, the night.",
    alt: "Anything Goes coven flyer. The hall and the hats.",
    width: 1122,
    height: 1402,
  },
  {
    src: `${import.meta.env.BASE_URL}media/flyer-field.png`,
    title: "Field sheet",
    detail: "Address, hours, and cover.",
    alt: "Anything Goes field sheet with the address, hours, and cover.",
    width: 1080,
    height: 1091,
  },
  {
    src: `${import.meta.env.BASE_URL}media/flyer-mark.jpg`,
    title: "The mark",
    detail: "Friendly. Inclusive. Pure kink.",
    alt: "Kink Korps mark flyer. Friendly, inclusive, pure kink.",
    width: 1080,
    height: 1076,
  },
];

const needsYou = SHEETS[0];
const floorCalls = SHEETS[2];
const weCan = SHEETS[3];
const weCanHarness = SHEETS[4];
const enlistBar = SHEETS[5];
const haveYou = SHEETS[6];
const fist = SHEETS[7];
const mask = SHEETS[9];

const PosterOpen = createContext<(sheet: Sheet) => void>(() => {});

function useOpenPoster() {
  return useContext(PosterOpen);
}

const btn =
  "inline-flex min-h-12 items-center justify-center px-5 py-3 text-center font-display text-2xl tracking-wide transition-transform duration-150 active:translate-x-0.5 active:translate-y-0.5";

export function LandingPage() {
  const [active, setActive] = useState<Sheet | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <PosterOpen.Provider value={setActive}>
      <div id="top" className="bg-paper text-ink">
        <Masthead />
        <Hero />
        <Countdown />
        <Corps />
        <Night />
        <Hosts />
        <Code />
        <EnlistedBreak />
        <Posters />
        <Enlist />
        <SiteFooter />
      </div>
      <PosterLightbox sheet={active} onClose={close} />
    </PosterOpen.Provider>
  );
}

function Masthead() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-ink bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2">
        <a href="#top" className="min-w-0">
          <img
            src={`${import.meta.env.BASE_URL}media/kk-logo.png`}
            alt="Kink Korps"
            width={680}
            height={600}
            className="h-28 w-auto sm:h-36"
          />
        </a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="kicker text-sm hover:text-scarlet-deep">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center border-4 border-ink lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <nav id={panelId} className="border-t-4 border-ink bg-paper px-4 py-4 lg:hidden" aria-label="Primary">
          <ul className="grid gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-2 font-display text-4xl"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function OpenPoster({ sheet, className = "block w-full text-left" }: { sheet: Sheet; className?: string }) {
  const open = useOpenPoster();
  return (
    <button type="button" onClick={() => open(sheet)} className={className}>
      <img src={sheet.src} alt={sheet.alt} width={sheet.width} height={sheet.height} className="w-full border-4 border-ink" />
    </button>
  );
}

function PosterLightbox({ sheet, onClose }: { sheet: Sheet | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [sheet, onClose]);

  if (!sheet) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={sheet.title}
      onClick={onClose}
    >
      <div ref={dialogRef} className="flex max-h-full max-w-full flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
        <img src={sheet.src} alt="" width={sheet.width} height={sheet.height} className="lightbox-img border-4 border-paper" />
        <button type="button" className={`${btn} bg-scarlet text-paper`} onClick={onClose} autoFocus>
          Close the poster
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-3 px-3 py-3 lg:grid-cols-2 lg:px-4" aria-labelledby="hero-title">
      <div className="order-2 lg:order-1">
        <OpenPoster sheet={needsYou} />
      </div>
      <div className="order-1 lg:order-2">
        <div className="border-4 border-ink bg-ink px-4 py-6 text-paper sm:px-8 sm:py-8">
          <p className="kicker text-sm text-scarlet">Kink Korps presents</p>
          <h1 id="hero-title" className="display-xl mt-3 text-paper">
            <span className="block">Anything</span>
            <span className="block">Goes</span>
          </h1>
          <span className="red-rule mt-4" />
          <p className="mt-4 font-display text-4xl leading-none">Friday, October 23</p>
          <p className="mt-2 text-lg">10 PM to 4 AM · Nu Vibez · Lauderhill</p>
          <p>$15 presale · $20 at the door · 21 and over</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href="#enlist" className={`${btn} bg-scarlet text-paper hover:bg-scarlet-deep`}>
              Save my plan
            </a>
            <a href="#night" className={`${btn} border-4 border-paper bg-ink text-paper hover:bg-paper hover:text-ink`}>
              The night's orders
            </a>
          </div>
        </div>
        <ul className="mt-3 grid gap-px bg-ink">
          {["21+ to play", "Consent is sexy", "Respect is mandatory"].map((line) => (
            <li key={line} className="bg-scarlet px-3 py-3 text-center font-display text-3xl text-paper">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  let label = "Until doors";
  let units: { value: string; unit: string }[] | null = null;

  if (now !== null && now >= END) {
    label = "That night is on the books";
  } else if (now !== null && now >= START) {
    label = "Doors are open";
  } else if (now !== null) {
    const remain = Math.max(0, START - now);
    const total = Math.floor(remain / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    units = [
      { value: String(days), unit: "Days" },
      { value: String(hours).padStart(2, "0"), unit: "Hrs" },
      { value: String(mins).padStart(2, "0"), unit: "Min" },
      { value: String(secs).padStart(2, "0"), unit: "Sec" },
    ];
  }

  return (
    <section className="border-y-4 border-ink bg-ink text-paper" aria-label="Countdown to Anything Goes">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker text-sm text-scarlet">Have you enlisted?</p>
          <p className="font-display text-4xl sm:text-5xl">{label}</p>
          <p className="mt-1 text-sm">Friday, October 23 · 10 PM · Nu Vibez, Lauderhill</p>
        </div>
        {units ? (
          <dl className="grid grid-cols-4 gap-3 tabular-nums">
            {units.map((part) => (
              <div key={part.unit}>
                <dt className="kicker text-xs">{part.unit}</dt>
                <dd className="font-display text-5xl">{part.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="font-display text-3xl">Nu Vibez · Lauderhill</p>
        )}
      </div>
    </section>
  );
}

function Corps() {
  return (
    <section id="corps" className="scroll-mt-24 px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="kicker text-sm text-scarlet-deep">The Corps</p>
          <h2 className="display-lg mt-2">Not a venue. The people who throw the night.</h2>
          <span className="red-rule mt-4" />
          <p className="mt-5 text-lg">
            Kink Korps organizes. Anything Goes is the party. Mr. Satan and Satanica Lux co-host. He
            also DJs. She is door diva. Nu Vibez holds the room, in Lauderhill.
          </p>
          <p className="mt-4">
            Come to dance. Come to play. Come to watch. You do not have to do all three, and nobody
            is drafted into any of them.
          </p>
        </div>
        <div className="lg:col-span-5">
          <OpenPoster sheet={fist} />
        </div>
      </div>
      <ul className="mx-auto mt-8 grid max-w-6xl gap-1 bg-ink p-1 md:grid-cols-3">
        <li className="bg-scarlet p-5 text-paper">
          <h3 className="font-display text-4xl">Friendly</h3>
          <p className="mt-2">
            New faces and regulars. Talk if you want. You do not have to perform friendship to stay.
          </p>
        </li>
        <li className="bg-ink p-5 text-paper">
          <h3 className="font-display text-4xl">Inclusive</h3>
          <p className="mt-2">The night is for the people who can keep the code. That is the test.</p>
        </li>
        <li className="bg-navy p-5 text-paper">
          <h3 className="font-display text-4xl">Pure kink</h3>
          <p className="mt-2">Dance, play, or watch. Pressure is not on the menu.</p>
        </li>
      </ul>
    </section>
  );
}

function Night() {
  return (
    <section id="night" className="scroll-mt-24 border-y-4 border-ink bg-paper-deep px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <OpenPoster sheet={floorCalls} />
        </div>
        <div className="lg:col-span-7">
          <p className="kicker text-sm text-scarlet-deep">The night · Form KK-23</p>
          <h2 className="display-lg mt-2">One roof. Two rooms.</h2>
          <p className="mt-2 text-2xl italic">Live deliciously.</p>
          <p className="mt-2">
            Dance and play party. One date on the orders. Cover is what the flyer says. This page
            does not take payment.
          </p>
          <dl className="mt-6 grid gap-1 bg-ink p-1 sm:grid-cols-2">
            <Fact term="When" value="Friday, October 23" note="10 PM to 4 AM" tone="scarlet" />
            <Fact
              term="Where"
              value="Nu Vibez"
              note="1748 NW 38th Ave, Lauderhill"
              extra="Free parking"
              tone="paper"
            />
            <Fact term="Cover" value="$15 presale" note="$20 at the door" tone="navy" />
            <Fact term="Dress" value="Fetish · Lingerie · Goth" note="Come in the code." tone="ink" />
            <Fact term="Sound" value="Mr. Satan" note="Sponsored by Spunk Lube" tone="paper" />
            <Fact term="Table" value="Sweet N' Thick Treats" note="Kink table for the night" tone="ink" />
          </dl>
          <div className="mt-6 flex flex-col items-start gap-4 border-4 border-ink bg-paper p-4 sm:flex-row sm:items-center">
            <img
              src={`${import.meta.env.BASE_URL}media/nu-vibez.jpg`}
              alt="Nu Vibez logo"
              width={1536}
              height={1103}
              loading="lazy"
              className="h-20 w-20 border-4 border-ink bg-ink object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="kicker text-xs text-scarlet-deep">The room</p>
              <p className="font-display text-4xl">1748 NW 38th Ave</p>
              <p>Lauderhill · Free parking on site</p>
            </div>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className={`${btn} border-4 border-ink bg-paper text-ink shadow-print hover:bg-paper-deep active:shadow-none`}
            >
              Open the map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({
  term,
  value,
  note,
  extra,
  tone,
}: {
  term: string;
  value: string;
  note: string;
  extra?: string;
  tone: "scarlet" | "paper" | "navy" | "ink";
}) {
  const toneClass = {
    scarlet: "bg-scarlet text-paper",
    paper: "bg-paper text-ink",
    navy: "bg-navy text-paper",
    ink: "bg-ink text-paper",
  }[tone];

  return (
    <div className={`p-5 ${toneClass}`}>
      <dt className="kicker text-sm">{term}</dt>
      <dd className="mt-2 font-display text-4xl">{value}</dd>
      <dd className="mt-2 text-base">{note}</dd>
      {extra ? <dd className="text-base">{extra}</dd> : null}
    </div>
  );
}

function Hosts() {
  return (
    <section id="hosts" className="scroll-mt-24 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="kicker text-sm text-scarlet-deep">The hosts</p>
        <h2 className="display-lg mt-2">Two names on the night</h2>
        <span className="red-rule mt-4" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="border-4 border-ink bg-paper shadow-print">
            <img
              src={`${import.meta.env.BASE_URL}media/mr-satan.jpg`}
              alt="Mr. Satan, co-host and DJ"
              width={1001}
              height={1252}
              loading="lazy"
              className="ratio-poster w-full object-cover object-top"
            />
            <div className="bg-scarlet px-5 py-4 text-paper">
              <h3 className="font-display text-5xl">Mr. Satan</h3>
              <p className="kicker text-sm">Co-host · DJ</p>
            </div>
            <p className="p-5">
              He runs the night with her, and he plays it. If the floor is moving, that is his set.
              Spunk Lube sponsors him.
            </p>
          </article>
          <article className="border-4 border-ink bg-paper shadow-print">
            <img
              src={`${import.meta.env.BASE_URL}media/satanica.jpg`}
              alt="Satanica Lux, co-host and door diva"
              width={1328}
              height={1488}
              loading="lazy"
              className="ratio-poster w-full object-cover face"
            />
            <div className="bg-ink px-5 py-4 text-paper">
              <h3 className="font-display text-5xl">Satanica Lux</h3>
              <p className="kicker text-sm">Co-host · Door diva</p>
            </div>
            <p className="p-5">
              She holds the door. The night has both names on it because both of them run it.
            </p>
          </article>
        </div>
        <div className="mt-10">
          <p className="kicker text-sm text-scarlet-deep">The corps, on paper</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <figure>
              <OpenPoster sheet={weCan} />
              <figcaption className="mt-2 font-display text-3xl">Corset</figcaption>
            </figure>
            <figure>
              <OpenPoster sheet={weCanHarness} />
              <figcaption className="mt-2 font-display text-3xl">Harness</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Code() {
  const orders = [
    {
      num: "01",
      title: "21+ to play",
      body: "Twenty-one and over. If you cannot show it at the door, you do not play.",
    },
    {
      num: "02",
      title: "Consent is sexy",
      body: "Yes is specific. No is finished. Quiet is not a yes. Anyone can stop, including you.",
    },
    {
      num: "03",
      title: "Respect is mandatory",
      body: "No hate, no harassment, and no pushing a boundary because the room is loud. Break it and the night is over for you.",
    },
  ];

  return (
    <section id="code" className="scroll-mt-24 bg-ink px-4 py-12 text-paper sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="kicker text-sm text-scarlet">The code</p>
          <h2 className="display-lg mt-2">Three orders. Not suggestions.</h2>
          <p className="mt-3 max-w-2xl">The flyer already says it. This is the same three lines, in plain speech.</p>
          <ol className="mt-8 grid gap-4">
            {orders.map((order) => (
              <li key={order.num} className="bg-paper p-5 text-ink">
                <p className="font-display text-5xl text-scarlet">{order.num}</p>
                <h3 className="font-display text-4xl">{order.title}</h3>
                <p className="mt-2 max-w-3xl">{order.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-4">
          <OpenPoster sheet={mask} />
        </div>
      </div>
    </section>
  );
}

function EnlistedBreak() {
  return (
    <section className="bg-ink px-4 py-10" aria-label="Have you enlisted?">
      <div className="mx-auto max-w-sm">
        <OpenPoster sheet={haveYou} />
      </div>
    </section>
  );
}

function SheetGrid({ sheets }: { sheets: Sheet[] }) {
  const open = useOpenPoster();
  return (
    <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
      {sheets.map((sheet) => (
        <li key={sheet.src}>
          <button type="button" onClick={() => open(sheet)} className="block w-full border-4 border-ink bg-paper text-left shadow-print">
            <img
              src={sheet.src}
              alt={sheet.alt}
              width={sheet.width}
              height={sheet.height}
              loading="lazy"
              className="w-full"
            />
            <span className="block border-t-4 border-ink px-3 py-2">
              <span className="block font-display text-2xl leading-none sm:text-3xl">{sheet.title}</span>
              <span className="mt-1 block text-sm text-ink-soft">{sheet.detail}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Posters() {
  return (
    <section id="posters" className="scroll-mt-24 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="kicker text-sm text-scarlet-deep">The posters</p>
        <h2 className="display-lg mt-2">The enlistment sheets</h2>
        <span className="red-rule mt-4" />
        <p className="mt-4 max-w-2xl">Tap a sheet to read it full size.</p>
        <SheetGrid sheets={SHEETS} />
        <h3 className="mt-12 font-display text-5xl">Field sheets</h3>
        <p className="mt-2 max-w-2xl">The night, as printed. Address, cover, and the first I-want-you.</p>
        <SheetGrid sheets={FIELD} />
      </div>
    </section>
  );
}

function Enlist() {
  const [entry, setEntry] = useState<Enlistment | null>(null);
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ name?: string; note?: string }>({});
  const [copied, setCopied] = useState(false);
  const nameId = useId();
  const countId = useId();
  const noteId = useId();

  useEffect(() => {
    const saved = readEnlistment();
    if (saved) {
      setEntry(saved);
      setName(saved.name);
      setCount(saved.count);
      setNote(saved.note);
    }
    setReady(true);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: { name?: string; note?: string } = {};
    const trimmed = name.trim();
    if (trimmed.length < 2) nextErrors.name = "Give a name the list can hold. Two characters at least.";
    if (trimmed.length > 40) nextErrors.name = "Forty characters. Keep the scene name short.";
    if (note.trim().length > 160) nextErrors.note = "One hundred sixty characters is enough.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const saved: Enlistment = {
      name: trimmed,
      count,
      note: note.trim(),
      savedAt: new Date().toISOString(),
    };
    writeEnlistment(saved);
    setEntry(saved);
  }

  async function copyBlurb() {
    try {
      await navigator.clipboard.writeText(NIGHT_BLURB);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="enlist" className="scroll-mt-24 border-t-4 border-ink bg-paper-deep px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
        <div>
          <OpenPoster sheet={enlistBar} />
          <p className="kicker mt-8 text-sm text-scarlet-deep">Enlist</p>
          <h2 className="display-lg mt-2">Keep your plan on this phone</h2>
          <p className="mt-3">
            This is a private reminder saved in this browser on this device. It does not send your
            name to Kink Korps, reserve a place, or buy a ticket. Presale is $15; the door is $20.
            Check the current event post for presale instructions.
          </p>
          <pre className="mt-5 whitespace-pre-wrap border-4 border-ink bg-paper p-4 text-sm leading-relaxed">
            {NIGHT_BLURB}
          </pre>
          <button
            type="button"
            onClick={copyBlurb}
            className={`${btn} mt-4 bg-ink text-paper hover:bg-scarlet-deep`}
          >
            {copied ? "Event details copied" : "Copy event details"}
          </button>
        </div>
        <form onSubmit={onSubmit} className="border-4 border-ink bg-paper shadow-print" noValidate>
          <div className="bg-scarlet px-5 py-4 text-paper">
            <p className="font-display text-6xl leading-none">Save your plan</p>
            <p className="kicker mt-1 text-sm">Form KK-23 · Private reminder · Not a ticket or RSVP</p>
          </div>
          <div className="grid gap-4 p-5">
            <div>
              <label htmlFor={nameId} className="kicker text-sm">
                Name for your reminder
              </label>
              <input
                id={nameId}
                name="name"
                value={name}
                autoComplete="nickname"
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${nameId}-error` : undefined}
                className="mt-1 h-12 w-full border-4 border-ink bg-paper-deep px-3 text-base text-ink"
              />
              {errors.name ? (
                <p id={`${nameId}-error`} className="mt-1 text-sm text-scarlet-deep" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor={countId} className="kicker text-sm">
                Party of
              </label>
              <select
                id={countId}
                name="count"
                value={count}
                onChange={(event) => setCount(Number(event.target.value))}
                className="mt-1 h-12 w-full border-4 border-ink bg-paper-deep px-3 text-base text-ink"
              >
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <option key={value} value={value}>
                    {value === 1 ? "Just me" : `${value} people`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={noteId} className="kicker text-sm">
                Note, optional
              </label>
              <textarea
                id={noteId}
                name="note"
                value={note}
                rows={3}
                onChange={(event) => setNote(event.target.value)}
                aria-invalid={Boolean(errors.note)}
                aria-describedby={errors.note ? `${noteId}-error` : undefined}
                className="mt-1 w-full border-4 border-ink bg-paper-deep px-3 py-2 text-base text-ink"
              />
              {errors.note ? (
                <p id={`${noteId}-error`} className="mt-1 text-sm text-scarlet-deep" role="alert">
                  {errors.note}
                </p>
              ) : null}
            </div>
            <button type="submit" className={`${btn} w-full bg-scarlet text-paper hover:bg-scarlet-deep`}>
              {entry ? "Update my plan" : "Save my plan"}
            </button>
            <div aria-live="polite">
              {ready && entry ? (
                <div className="border-4 border-scarlet bg-paper p-4">
                  <p className="kicker text-sm text-scarlet-deep">Saved on this phone · Not sent to the organizers</p>
                  <p className="font-display text-4xl">{entry.name}</p>
                  <p>
                    Party of {entry.count}
                    {entry.note ? ` · ${entry.note}` : ""}
                  </p>
                  <button
                    type="button"
                    className="mt-3 text-sm font-semibold text-scarlet-deep underline underline-offset-4"
                    onClick={() => {
                      clearEnlistment();
                      setEntry(null);
                      setName("");
                      setCount(1);
                      setNote("");
                    }}
                  >
                    Take my name off
                  </button>
                </div>
              ) : (
                <p className="text-sm text-ink-soft">Nothing saved on this phone yet.</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-ink px-4 py-8 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}media/kk-logo.png`}
            alt=""
            width={680}
            height={600}
            className="h-28 w-auto bg-white px-2 py-1"
          />
          <div>
            <p className="font-display text-3xl">Kink Korps</p>
            <p className="text-sm">Anything Goes · October 23, 2026 · Lauderhill</p>
          </div>
        </div>
        <p className="font-display text-2xl tracking-wide text-scarlet">★ ★ ★</p>
        <p className="font-display text-xl">21+ · Consent is sexy · Respect is mandatory</p>
      </div>
    </footer>
  );
}

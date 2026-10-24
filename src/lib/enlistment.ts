export type Enlistment = {
  name: string;
  count: number;
  note: string;
  savedAt: string;
};

const KEY = "kink-korps-enlistment-v1";

export const NIGHT_BLURB = [
  "Kink Korps presents Anything Goes",
  "Dance and play party · Live deliciously",
  "Friday, October 23, 2026 · 10 PM to 4 AM",
  "Nu Vibez · 1748 NW 38th Ave, Lauderhill",
  "$15 presale · $20 at the door · Free parking",
  "Dress code: fetish, lingerie, goth",
  "Music by Mr. Satan · Door diva Satanica Lux",
  "21+ to play · Consent is sexy · Respect is mandatory",
].join("\n");

export function readEnlistment(): Enlistment | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Enlistment>;
    if (typeof data.name !== "string" || typeof data.count !== "number") return null;
    return {
      name: data.name,
      count: data.count,
      note: typeof data.note === "string" ? data.note : "",
      savedAt: typeof data.savedAt === "string" ? data.savedAt : "",
    };
  } catch {
    return null;
  }
}

export function writeEnlistment(entry: Enlistment) {
  localStorage.setItem(KEY, JSON.stringify(entry));
}

export function clearEnlistment() {
  localStorage.removeItem(KEY);
}

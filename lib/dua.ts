export type Target = "AILEM" | "ARKADAS" | "KENDIM" | "ANONIM";
export type Intention = "HUZUR" | "FERAHLIK" | "KOLAYLIK" | "CESARET";

export type DuaText = {
  line1: string;
  line2?: string;
};

const DEFAULT_TARGET: Target = "ANONIM";
const DEFAULT_INTENTION: Intention = "HUZUR";

function simplify(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .toUpperCase()
    .replace(/İ/g, "I")
    .replace(/İ/g, "I")
    .replace(/Ş/g, "S")
    .replace(/Ğ/g, "G")
    .replace(/Ü/g, "U")
    .replace(/Ö/g, "O")
    .replace(/Ç/g, "C")
    .replace(/['’`]/g, "")
    .replace(/\s+/g, "_");
}

export function normalizeTarget(value: unknown): Target {
  const key = simplify(value);

  if (key === "AILEM" || key === "AILEMIZ" || key === "AILE") return "AILEM";
  if (key === "BIR_ARKADAS" || key === "ARKADAS" || key === "ARKADASIM" || key === "BIR_DOST" || key === "DOST" || key === "DOSTUM") return "ARKADAS";
  if (key === "KENDIM" || key === "BEN" || key === "KENDI") return "KENDIM";
  if (key === "ISMINI_SOYLEMEDEN_BIRI" || key === "ANONIM" || key === "BIRI") return "ANONIM";

  return DEFAULT_TARGET;
}

export function normalizeIntention(value: unknown): Intention {
  const key = simplify(value);

  if (key === "HUZUR" || key === "SUKUNET") return "HUZUR";
  if (key === "FERAHLIK" || key === "FERAH") return "FERAHLIK";
  if (key === "KOLAYLIK" || key === "KOLAY") return "KOLAYLIK";
  if (key === "CESARET" || key === "METANET") return "CESARET";

  return DEFAULT_INTENTION;
}

export function pickRandom<T>(list: readonly T[]): T {
  if (!list.length) {
    throw new Error("pickRandom requires a non-empty list.");
  }

  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

const TEMPLATES: Record<Target, Record<Intention, DuaText[]>> = {
  AILEM: {
    HUZUR: [
      { line1: "Allah’ım, ailemizin yuvasına sükunet ve muhabbet ihsan eyle." },
      { line1: "Allah’ım, ailemizin kalplerini birleştir; evimize huzur indir." },
      { line1: "Ya Rabbi, ailemizin gönlüne dinginlik ver.", line2: "Aramıza sevgi ve anlayış nasip et." },
      { line1: "Allah’ım, ailemizi kırgınlıktan uzak tut; yuvamıza huzur ver." },
    ],
    FERAHLIK: [
      { line1: "Allah’ım, ailemizin içini ferahlat; sıkıntımızı hafiflet." },
      { line1: "Ya Rabbi, ailemizin gönlüne genişlik ver.", line2: "Daralan kalplerimize ferahlık nasip et." },
      { line1: "Allah’ım, ailemizin yükünü azalt; içimize rahatlık ver." },
      { line1: "Allah’ım, ailemizin evine ferahlık ver.", line2: "Her zorluğu hayırla kolaylaştır." },
    ],
    KOLAYLIK: [
      { line1: "Allah’ım, ailemizin işlerini kolay eyle; hayırlı kapılar aç." },
      { line1: "Ya Rabbi, ailemize helal ve hayırlı yollar nasip et.", line2: "Zor olanı kolay eyle." },
      { line1: "Allah’ım, ailemizin yükünü hafiflet; işlerini selametle yürüt." },
      { line1: "Allah’ım, ailemize kolaylık lutfet.", line2: "Emeklerimizi hayırla bereketlendir." },
    ],
    CESARET: [
      { line1: "Allah’ım, ailemi her türlü şerden muhafaza eyle; bize metanet ver." },
      { line1: "Ya Rabbi, ailemizin kalbine sebat ver.", line2: "Bizi kötülüklerden emin kıl." },
      { line1: "Allah’ım, ailemize hayırlı cesaret nasip et; korkularımızı yatıştır." },
      { line1: "Allah’ım, ailemizi koru.", line2: "Zor vakitlerde bize dayanma gücü ver." },
    ],
  },
  ARKADAS: {
    HUZUR: [
      { line1: "Allah’ım, arkadaşımın kalbine huzur ve sükunet ver." },
      { line1: "Ya Rabbi, arkadaşımın gönlüne iyi bir dinginlik indir." },
      { line1: "Allah’ım, arkadaşımın içini sakinleştir.", line2: "Kalbine esenlik nasip et." },
      { line1: "Allah’ım, arkadaşımı gamdan uzak tut; kalbine huzur ver." },
    ],
    FERAHLIK: [
      { line1: "Allah’ım, arkadaşımın gönlüne ferahlık ver; sıkıntısını hafiflet." },
      { line1: "Ya Rabbi, arkadaşımın içini aç.", line2: "Üzerindeki yükü hafif kıl." },
      { line1: "Allah’ım, arkadaşıma iç genişliği nasip et; daralan halini rahatlat." },
      { line1: "Allah’ım, arkadaşımın kalbine ferah bir nefes ver." },
    ],
    KOLAYLIK: [
      { line1: "Allah’ım, arkadaşımın işlerini kolay eyle; hayırlı kapılar aç." },
      { line1: "Ya Rabbi, arkadaşımın yolunu kolaylaştır.", line2: "Yükünü hafiflet." },
      { line1: "Allah’ım, arkadaşımın önündeki hayırlı yolları belirgin kıl." },
      { line1: "Allah’ım, arkadaşıma kolaylık ver.", line2: "Emeklerini hayırla sonuçlandır." },
    ],
    CESARET: [
      { line1: "Allah’ım, arkadaşıma hayırlı cesaret ve metanet nasip et." },
      { line1: "Ya Rabbi, arkadaşımın kalbini kuvvetlendir.", line2: "Onu şerden muhafaza eyle." },
      { line1: "Allah’ım, arkadaşıma zor zamanda sebat ver; içini sağlam kıl." },
      { line1: "Allah’ım, arkadaşıma korku yerine güven ver.", line2: "Adımına hayırlı cesaret koy." },
    ],
  },
  KENDIM: {
    HUZUR: [
      { line1: "Allah’ım, kalbime huzur indir; zihnimi sakinleştir." },
      { line1: "Ya Rabbi, gönlüme sükunet ver.", line2: "Dağınık halimi toparla." },
      { line1: "Allah’ım, içimdeki telaşı azalt; bana dinginlik nasip et." },
      { line1: "Allah’ım, kalbime huzur ver.", line2: "Beni hayırlı olana yönelt." },
    ],
    FERAHLIK: [
      { line1: "Allah’ım, içime ferahlık ver; üzerimdeki sıkıntıyı hafiflet." },
      { line1: "Ya Rabbi, göğsüme genişlik ver.", line2: "Gönlümü rahatlat." },
      { line1: "Allah’ım, daralan kalbimi aç; bana iç huzuru nasip et." },
      { line1: "Allah’ım, içimi ferahlat.", line2: "Bana sakin bir nefes ver." },
    ],
    KOLAYLIK: [
      { line1: "Allah’ım, işlerimi kolay eyle; hayırlı kapılar aç." },
      { line1: "Ya Rabbi, yolumu hayırla kolaylaştır.", line2: "Yükümü hafiflet." },
      { line1: "Allah’ım, önümdeki düğümleri çözüp işlerimi güzelleştir." },
      { line1: "Allah’ım, bana kolaylık ver.", line2: "Adımlarımı hayırlı yola çıkar." },
    ],
    CESARET: [
      { line1: "Allah’ım, bana metanet ve sebat ver; kalbimi güçlendir." },
      { line1: "Ya Rabbi, beni şerden muhafaza eyle.", line2: "Bana hayırlı cesaret nasip et." },
      { line1: "Allah’ım, korkularımı yatıştır; zor zamanda dayanma gücü ver." },
      { line1: "Allah’ım, beni güvenle yürüt.", line2: "Kalbime hayırlı bir cesaret koy." },
    ],
  },
  ANONIM: {
    HUZUR: [
      { line1: "Allah’ım,  kulunun kalbine huzur indir; yolunu aydınlat." },
      { line1: "Ya Rabbi,  kulunun kalbine sükunet ver." },
      { line1: "Allah’ım,  kulunu gamdan uzaklaştır.", line2: "Kalbine esenlik nasip et." },
      { line1: "Allah’ım,  kulunun kalbinin içine dinginlik ver; gecesini selametle geçir." },
    ],
    FERAHLIK: [
      { line1: "Allah’ım,  kulunun gönlünü ferahlat; sıkıntısını hafiflet." },
      { line1: "Ya Rabbi,  kulunun kalbine iç genişliği nasip et." },
      { line1: "Allah’ım,  kulunun yükünü azalt.", line2: "Gönlüne rahatlık ver." },
      { line1: "Allah’ım,  kulunun kalbine ferah bir nefes değdir; darını aç." },
    ],
    KOLAYLIK: [
      { line1: "Allah’ım, kulunun işlerini kolaylaştır; hayırlı kapılar aç." },
      { line1: "Ya Rabbi, kuluna kolaylık lutfet." },
      { line1: "Allah’ım, kulunun önündeki zorluğu hafiflet.", line2: "Yolunu hayırla aç." },
      { line1: "Allah’ım, kulunun kalbinin yükünü azalt; işini kolay eyle." },
    ],
    CESARET: [
      { line1: "Allah’ım, kuluna metanet ver; onu şerden muhafaza eyle." },
      { line1: "Ya Rabbi, kulunun kalbine sebat nasip et." },
      { line1: "Allah’ım, kulunun korkusunu azalt.", line2: "Ona hayırlı cesaret ver." },
      { line1: "Allah’ım, kulunun kalbini güvenle doldur; zor anda dayanma gücü ver." },
    ],
  },
};

export function generateDua(target: Target, intention: Intention): DuaText {
  const safeTarget = normalizeTarget(target);
  const safeIntention = normalizeIntention(intention);

  const options = TEMPLATES[safeTarget]?.[safeIntention] ?? TEMPLATES[DEFAULT_TARGET][DEFAULT_INTENTION];
  return pickRandom(options);
}

export function devDuaSelfTest(): { ok: boolean; errors: string[] } {
  if (process.env.NODE_ENV === "production") {
    return { ok: true, errors: [] };
  }

  const errors: string[] = [];
  const targets: Target[] = ["AILEM", "ARKADAS", "KENDIM", "ANONIM"];
  const intentions: Intention[] = ["HUZUR", "FERAHLIK", "KOLAYLIK", "CESARET"];

  for (const target of targets) {
    for (const intention of intentions) {
      const templates = TEMPLATES[target][intention];
      if (!templates || templates.length < 4) {
        errors.push(`${target}-${intention}: template count is below 4.`);
        continue;
      }

      const sample = templates[0];
      if (!sample.line1.startsWith("Allah’ım") && !sample.line1.startsWith("Ya Rabbi")) {
        errors.push(`${target}-${intention}: first template should start with Allah’ım or Ya Rabbi.`);
      }
    }
  }

  return { ok: errors.length === 0, errors };
}



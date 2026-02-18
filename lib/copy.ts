export const homeCopy = {
  title: "Ramazan’a küçük bir selam",
  subtitleLine1: "Bir dua, bir tebessüm.",
  subtitleLine2: "Bu geceye yakışsın.",
  ctaDua: "Bu Akşam Bir Dua",
  ctaAbout: "Minik Not",
  footer: "Hayırlı Ramazanlar.",
};

export const duaFlowCopy = {
  kicker: "Ramazan gecesi",
  title: "Dua",
  subtitle: "Üç kısa adım.",
  next: "Devam et",
  back: "Baştan",
  finish: "Duan hazır",
  restart: "Bir dua daha",
  reset: "Baştan",
  share: "Paylaş",
  copied: "PNG hazır",
  shareError: "PNG paylaşılamadı",
  step1: {
    title: "Kimin için?",
    options: ["Ailem", "Bir arkadaş", "Kendim", "İsmini söylemeden biri"],
  },
  step2: {
    title: "Ne diliyorsun?",
    options: ["Huzur", "Ferahlık", "Kolaylık", "Cesaret"],
  },
  step3: {
    title: "Dua",
  },
  resultTitle: "Duan hazır.",
  resultCaption: "Allah kabul etsin.",
  finalNote: "Bu niyet Ramazan için seçildi.\nVe evet, biri biraz uğraştı.",
};

export const closingNotes = [
  "Hayırlı bir Ramazan akşamı olsun.",
  "Bu gece gönlüne sekinet insin.",
  "Duaların kabul, kalbin huzurlu olsun.",
  "Ramazan’ın bereketi üzerine olsun.",
  "Kalbine ferahlık, evine huzur dolsun.",
  "Bu mübarek vakit sana iyilik getirsin.",
] as const;

export const aboutCopy = {
  kicker: "Minik not",
  title: "Minik Not",
  line1: "Ramazan en güzel hâliyle başladı.",
  line2: "Birini anmak, güzel bir iz bırakır.",
  line3: "Buradaki her şey bunun için.",
  line4: "Hayırlı Ramazanlar.",
  backHome: "Ana sayfaya dön",
  poemLabel: "Yunus Emre’den",
};

export const yunusRamazanPoem = [
  `Müştak olup özlediğim,
Şehr-i Ramazan merhaba.
Bakıp yolun gözlediğim,
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,

  `Ey şehr-i nüzûl-i sûre,
Bâis oldun çok sürura.
Gark eyledin bizi nura.
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,

  `On bir aylık yoldan gelir,
Bir ay bize mihman olur.
Müzniblere gufran olur.
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,

  `Müminlerin bayramısın,
Dertlilerin dermanısın.
Hakkın bize ihsanısın.
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,

  `Gökten bize rahmet ine,
Kalbimize şefkat gele.
Yarın bize şefi ola.
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,

  `Safa geldin izzet ile,
Dahi azim nimet ile.
Müminlere rahmet ile.
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,

  `Yunus der ki erdin yine,
Şükür şefaat kanına.
Dertlilerin dermanına.
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,

  `Derviş Yunus söyler özden,
Kan yaş döker iki gözden.
Hoşnut olsun cümlemizden.
Şehr-i Ramazan merhaba.
Mâh-ı mübarek merhaba.`,
] as const;

export function getRandomDortluk() {
  const index = Math.floor(Math.random() * yunusRamazanPoem.length);
  return yunusRamazanPoem[index];
}

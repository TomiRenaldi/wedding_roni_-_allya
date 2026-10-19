// ============================================================
//  SEMUA ISI UNDANGAN ADA DI FILE INI.
//  Ganti data contoh di bawah dengan data asli, lalu jalankan ulang.
//  Foto: letakkan file di folder public/images lalu isi dengan
//  jalur seperti '/images/groom.jpg'. Kosong = tampil ilustrasi karakter.
// ============================================================

export const wedding = {
  title: "The Wedding of Roni & Allya",

  // Huruf besar tipis di latar bagian awal. Ubah urutan jika mau, misalnya 'AR'.
  monogram: "RA",

  groom: {
    nickname: "Roni",
    fullName: "Roni Andriansyah",
    instagram: "roniohroni_",
    photo: "",
  },
  bride: {
    nickname: "Allya",
    fullName: "Allya Nazwa",
    instagram: "allynzwaa",
    photo: "",
  },

  // Tanggal utama (dipakai untuk hitung mundur). Format ISO dengan zona waktu.
  date: "2026-10-23T14:00:00+07:00",
  dateLabel: "Jumat, 23 Oktober 2026",

  // Foto latar bagian awal. Kosong = latar gelap bermotif.
  heroImage: "",

  quote: {
    text: "Dua jalan yang berbeda, satu tujuan yang sama pulang pada satu sama lain.",
    source: "",
  },

  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      start: "2026-10-23T08:00:00+07:00",
      end: "2026-10-23T14:00:00+07:00",
      dayLabel: "Jumat, 23 Oktober 2026",
      timeLabel: "14.00 WIB - Selesai",
      venue: "Kediaman Mempelai Wanita",
      address:
        "Kp. Simpang Wetan RT 03 RW 06 Desa Sekarwangi, Kec. Soreang, Kab. Bandung (Rumah No.25)",
    },
    {
      id: "resepsi",
      title: "Resepsi",
      start: "2026-10-23T14:00:00+07:00",
      end: "2026-10-23T17:00:00+07:00",
      dayLabel: "Jumat, 23 Oktober 2026",
      timeLabel: "14.00 - Selesai WIB",
      venue: "Kediaman Mempelai Wanita",
      address:
        "Kp. Simpang Wetan RT 03 RW 06 Desa Sekarwangi, Kec. Soreang, Kab. Bandung (Rumah No.25)",
    },
  ],

  // Kata kunci untuk peta tertanam dan tautan Google Maps.
  map: {
    query:
      "Kp. Simpang Wetan RT 03 RW 06 Desa Sekarwangi, Kec. Soreang, Kab. Bandung (Rumah No.25)",
  },

  // Doa pada bagian setelah acara.
  doa: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antara kamu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "QS. Ar-Rum: 21",
  },

  // Logo bank: taruh file di public/images/banks/ lalu isi 'logo'.
  // Jika file tidak ada, kartu menampilkan ikon bank generik dan nama bank.
  gifts: [
    {
      bank: "Dana",
      number: "0895375711234",
      name: "Roni Andriansyah",
      logo: "/images/banks/dana.png",
    },
    {
      bank: "Dana",
      number: "083164641113",
      name: "Allya Nazwa",
      logo: "/images/banks/dana.png",
    },
  ],
  giftAddress: {
    name: "Kediaman Mempelai Wanita",
    text: "Kp. Simpang Wetan RT 03 RW 06 Desa Sekarwangi, Kec. Soreang, Kab. Bandung (Rumah No.25)",
  },

  // Nomor WhatsApp untuk konfirmasi (format internasional tanpa +).
  whatsapp: "62895375711234",

  // Musik latar. Letakkan file di public/audio/wedding.mp3.
  music: { src: "/audio/wedding.mp3" },

  closing:
    "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu untuk kami.",

  // Ucapan contoh agar tampilan tidak kosong saat demo. Kosongkan: []
  sampleWishes: [],
};

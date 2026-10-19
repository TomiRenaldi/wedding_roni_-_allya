# Undangan Pernikahan (Vite + React + Tailwind CSS)

Undangan digital responsif bergaya classic gold & cream dengan scroll halus (Lenis) dan animasi berbasis scroll (Framer Motion).

## Menjalankan

```bash
npm install
npm run dev      # pengembangan, buka http://localhost:5173
npm run build    # hasil produksi ada di folder dist/
npm run preview  # coba hasil build secara lokal
```

Butuh Node.js 18 atau lebih baru.

## Mengganti isi undangan

Semua teks ada di satu file: `src/config.js`.

| Yang ingin diubah | Bagian di config.js |
| --- | --- |
| Nama, orang tua, Instagram mempelai | `groom`, `bride` |
| Tanggal dan hitung mundur | `date`, `dateLabel` |
| Akad, resepsi, alamat | `events`, `map` |
| Foto | `groom.photo`, `bride.photo`, `heroImage` |
| Ayat dan terjemahan (QS. Ar-Rum: 21) | `doa` |
| Rekening, logo bank, dan alamat kado | `gifts`, `giftAddress` |
| Nomor WhatsApp konfirmasi | `whatsapp` |
| Kata penutup | `closing` |
| Ucapan contoh | `sampleWishes` (kosongkan dengan `[]`) |

Foto: salin file ke `public/images/`, lalu isi misalnya `'/images/mempelai-pria.jpg'`. Kosong berarti tampil ilustrasi karakter pria dan wanita (komponen `Avatar`).

Logo bank: salin file logo ke `public/images/banks/` (lihat README.txt di folder itu), lalu isi `logo` pada tiap rekening. Tanpa file logo, kartu menampilkan ikon bank generik dan nama bank.

Musik: salin file ke `public/audio/wedding.mp3`. Jika file tidak ada, tombol musik otomatis disembunyikan.

## Nama tamu

Tambahkan `?to=` di akhir tautan. Gunakan `+` atau `%20` untuk spasi.

```
https://domainanda.com/?to=Budi+Santoso
https://domainanda.com/?to=Keluarga+Besar+Wijaya
```

## Ucapan dan konfirmasi hadir

Secara bawaan, ucapan disimpan di browser tamu itu sendiri (localStorage), sehingga tamu lain belum bisa melihatnya. Tombol WhatsApp setelah mengirim konfirmasi tetap membuat Anda menerima kabar kehadiran.

Untuk mengumpulkan semua konfirmasi di satu tempat (misalnya Google Sheets lewat Apps Script), buat file `.env` berisi:

```
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
```

Setiap kiriman akan dikirim sebagai JSON (`id`, `name`, `attendance`, `count`, `message`, `at`) ke alamat itu. Menampilkan ucapan semua tamu di halaman membutuhkan backend yang bisa dibaca, misalnya Supabase atau Firebase.

## Hosting

Folder `dist/` bisa diunggah ke Netlify, Vercel, Cloudflare Pages, atau GitHub Pages. Karena halaman tunggal, tidak perlu pengaturan routing khusus.

## Struktur

```
src/
  config.js            isi undangan
  App.jsx              alur sampul, musik, kunci scroll
  lib/smooth.jsx       Lenis (smooth scroll) dan fungsi scrollToId
  lib/helpers.js       hitung mundur, kalender, salin teks, penyimpanan ucapan
  components/          Cover, Hero, Couple, Events, Doa, Gift, Rsvp, Footer, Dock, dll.
```

## Catatan animasi

- Scroll halus memakai Lenis; posisi scroll asli tetap diperbarui sehingga `useScroll` Framer Motion ikut mulus.
- Pengunjung dengan pengaturan "kurangi gerakan" di perangkatnya otomatis mendapat versi tanpa smooth scroll dan dengan animasi minimal.
- Kecepatan scroll bisa diatur di `src/lib/smooth.jsx` (`duration`, `wheelMultiplier`).

Letakkan file logo bank di folder ini, lalu isi jalurnya di src/config.js
pada bagian "gifts", misalnya:

  { bank: 'BCA', number: '...', name: '...', logo: '/images/banks/bca.png' }

Nama file contoh: bca.png, mandiri.png, bni.png, bri.png, bsi.svg, dana.png

- Format yang bisa dipakai: PNG, SVG, atau WebP. Latar transparan paling rapi.
- Tinggi logo ditampilkan sekitar 40 piksel, jadi file berukuran sedang sudah cukup.
- Unduh logo dari halaman resmi atau panduan merek (brand guideline) bank terkait.
- Jika file tidak ditemukan, kartu otomatis menampilkan ikon bank generik beserta nama bank.

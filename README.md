# Vira & Ogi Wedding - Generator Undangan

Aplikasi kecil untuk membuat teks undangan pernikahan yang siap dikirim lewat WhatsApp. Setiap tamu mendapat link undangan web dengan namanya sendiri: `https://vira-ogi-wedding.netlify.app?guest=...`

## Cara pakai

1. Ketik nama tamu pada kolom **Nama tamu**. Untuk pasangan, pisahkan dengan `&`, contoh `Budi & Ani`.
2. Pilih versi undangan:
   - **Versi Orang Tua**: dikirim atas nama orang tua kedua mempelai. Bahasa formal, menyebut nama orang tua, dan ditutup dengan tanda tangan orang tua. Cocok untuk tamu keluarga, kolega, dan kenalan orang tua.
   - **Versi Pengantin**: dikirim atas nama Vira & Ogi. Bahasa lebih personal, mengundang sebagai teman dan sahabat. Cocok untuk tamu dari lingkaran pengantin.
3. Tekan **Lihat contoh teks** jika ingin melihat isi undangan sebelum menyalin.
4. Tekan **Salin undangan**. Teks lengkap otomatis tersalin ke clipboard.
5. Buka WhatsApp tamu tersebut, tempel (paste), lalu kirim.
6. Ulangi untuk tamu berikutnya.

## Mengubah isi undangan

Semua teks undangan, nama mempelai, tanggal, tempat, dan link ada di `src/App.jsx`:

- `INVITATION_URL` untuk link undangan web.
- `buildParentsLetter` untuk teks versi Orang Tua.
- `buildCoupleLetter` untuk teks versi Pengantin.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Build untuk produksi:

```bash
npm run build
```

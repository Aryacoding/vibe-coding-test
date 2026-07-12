# Setup Project Backend (Bun, ElysiaJS, Drizzle ORM, MySQL)

## Deskripsi Tugas
Tugas ini bertujuan untuk melakukan inisialisasi awal proyek backend (API) menggunakan runtime Bun, framework ElysiaJS, serta Drizzle ORM untuk interaksi dengan database MySQL. Instruksi di bawah ini dibuat dalam lingkup high-level.

## Kebutuhan (Dependencies)
- **Runtime:** Bun
- **Framework:** ElysiaJS
- **ORM:** Drizzle ORM
- **Database Driver:** MySQL (misalnya `mysql2`)
- **Tools:** Drizzle Kit (untuk manajemen skema dan migrasi)

## Langkah-langkah Implementasi

1. **Inisialisasi Proyek**
   - Lakukan inisialisasi proyek baru dengan Bun di folder ini.
   - Pastikan file konfigurasi dasar (`package.json`, `tsconfig.json`) telah digenerate.

2. **Instalasi Dependency**
   - Install dependency utama: framework ElysiaJS, library Drizzle ORM, dan driver MySQL.
   - Install development dependency: Drizzle Kit untuk kebutuhan migrasi.

3. **Konfigurasi Database & ORM**
   - Buat skema database sederhana menggunakan sintaks Drizzle (contoh: tabel `users`).
   - Buat file konfigurasi koneksi database MySQL dan hubungkan instance Drizzle ke koneksi tersebut.
   - Siapkan konfigurasi `drizzle.config.ts` agar Drizzle Kit siap digunakan.

4. **Setup Server ElysiaJS**
   - Buat entry point aplikasi (misalnya `src/index.ts`).
   - Inisialisasi server Elysia.
   - Buat setidaknya satu routing dasar (seperti `GET /`) untuk memastikan server merespon dengan benar (contoh response: "Hello World").

5. **Dokumentasi & Skrip**
   - Tambahkan script pada `package.json` untuk menjalankan server (development mode).
   - Pastikan server bisa berjalan tanpa error saat dijalankan dengan script tersebut.

## Kriteria Penerimaan (Definition of Done)
- [ ] Terdapat file `package.json` dengan dependency yang sesuai.
- [ ] Server ElysiaJS berhasil berjalan di local environment.
- [ ] Konfigurasi Drizzle ORM untuk MySQL sudah tersedia dan siap digunakan.
- [ ] Proyek bebas dari error tipe dasar (TypeScript).

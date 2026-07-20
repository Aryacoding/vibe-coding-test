# Implementasi Fitur Login dan Tabel Sessions

## Deskripsi Tugas
Tugas ini bertujuan untuk membuat fitur authentikasi (login pengguna) beserta pembuatan tabel `sessions` untuk menyimpan token login di database.

## 1. Spesifikasi Database
Buat tabel baru dengan nama `sessions` dengan spesifikasi kolom berikut:
- `id`: `integer`, `auto increment`, primary key
- `token`: `varchar(255)`, `not null` (akan diisi dengan UUID sebagai token sesi login)
- `user_id`: `integer`, merupakan Foreign Key (FK) yang merujuk ke tabel `users` (asumsikan tabel `users` sudah tersedia)

## 2. Spesifikasi API
Buat endpoint API untuk proses login pengguna.
- **Method & Endpoint**: `POST /api/users/login`
- **Request Body**:
  ```json
  {
    "email": "eko@email.com",
    "password": "1"
  }
  ```
- **Response Body (Success)**:
  ```json
  {
    "data": "token_uuid"
  }
  ```
- **Response Body (Error)**:
  ```json
  {
    "error": "email atau password salah"
  }
  ```

## 3. Struktur Direktori dan Penamaan File
Implementasi kode harus mematuhi struktur folder dan penamaan file berikut di dalam folder `src/`:
- **Routes (`src/routes/`)**: Tempat menyimpan file routing framework ElysiaJS.
  - Format penamaan file: `<nama_entitas>-route.ts`. Contoh: `users-route.ts`.
- **Services (`src/services/`)**: Tempat menyimpan kode business logic (logic bisnis) aplikasi.
  - Format penamaan file: `<nama_entitas>-services.ts`. Contoh: `users-services.ts`.

## 4. Tahapan Implementasi (Langkah demi Langkah)
Ikuti urutan langkah berikut untuk mengimplementasikan fitur ini. **Ikuti secara berurutan**:

### Langkah 1: Persiapan Skema Database (Tabel Sessions)
- Tambahkan definisi tabel `sessions` ke dalam skema database yang digunakan (misalnya pada file schema Prisma, Drizzle, dll) dengan kolom `id`, `token`, dan `user_id` sesuai spesifikasi di atas.
- Pastikan relasi (Foreign Key) `user_id` ke tabel `users` terhubung dengan benar.
- Lakukan migrasi database (db push / migrate) agar tabel `sessions` terbuat di database.

### Langkah 2: Pembuatan Business Logic (Service)
- Buat file baru bernama `users-services.ts` di dalam folder `src/services/`.
- Buat sebuah fungsi/method (misal: `login`) yang menerima dua buah parameter, yaitu `email` dan `password`.
- Di dalam fungsi tersebut jalankan logika berikut:
  1. Cari data user di database berdasarkan `email` yang diberikan.
  2. Jika user tidak ditemukan, lemparkan error (throw) dengan pesan "email atau password salah".
  3. Jika user ditemukan, cocokkan `password` (lakukan komparasi password, perhatikan jika password di-hash di sistem saat ini).
  4. Jika password salah, lemparkan error dengan pesan "email atau password salah".
  5. Jika password benar, *generate* sebuah token unik (menggunakan `UUID`).
  6. Simpan token tersebut ke tabel `sessions` bersama dengan `user_id` milik user yang baru saja login tersebut.
  7. Kembalikan nilai (return) string token tersebut agar bisa digunakan oleh Route.

### Langkah 3: Pembuatan Routing / Controller (Route)
- Buat file baru bernama `users-route.ts` di dalam folder `src/routes/`.
- Setup routing menggunakan ElysiaJS untuk menangani request `POST /api/users/login`.
- Di dalam handler route tersebut:
  1. Ambil/ekstrak `email` dan `password` dari `body` request.
  2. Panggil fungsi dari `users-services.ts` dan masukkan `email` serta `password` ke dalamnya.
  3. Tangkap nilai kembalian token dari service. Jika berhasil, format response sebagai JSON `{ "data": "token_tersebut" }`.
  4. Lakukan penanganan error (try-catch). Jika service melempar error "email atau password salah", tangkap error tersebut lalu kembalikan HTTP status code `401 Unauthorized` atau `400 Bad Request` dengan body `{ "error": "email atau password salah" }`.

### Langkah 4: Registrasi Route
- Buka file utama jalannya aplikasi (misal: `src/index.ts` atau tempat registrasi routing Elysia).
- Lakukan import route yang telah dibuat di `src/routes/users-route.ts`.
- Daftarkan (`use`) route tersebut ke instance utama aplikasi ElysiaJS agar endpoint `/api/users/login` dapat dikenali dan dipanggil oleh client.

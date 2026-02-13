# MongoDB Atlas Setup (Cloud Database - GRATIS)


## Langkah-langkah:

### 1. Buat Akun MongoDB Atlas

1. Buka https://www.mongodb.com/cloud/atlas/register
2. Daftar dengan email atau Google account
3. Pilih **FREE** tier (M0 Sandbox)

### 2. Buat Cluster

1. Setelah login, klik "Build a Database"
2. Pilih **FREE** (M0)
3. Pilih region terdekat (Singapore)
4. Klik "Create"
5. Tunggu 3-5 menit sampai cluster selesai dibuat

### 3. Setup Database Access

1. Di sidebar kiri, klik "Database Access"
2. Klik "Add New Database User"
3. Pilih "Password" authentication
4. Username: `testing`
5. Password: `testing1234@` (or another password this is just what i have made)
6. Database User Privileges: choose "Read and write to any database"
7. Klik "Add User"

### 4. Setup Network Access

1. Di sidebar kiri, klik "Network Access"
2. Klik "Add IP Address"
3. Klik "Allow Access from Anywhere" (for development)
4. Klik "Confirm"

### 5. Dapatkan Connection String

1. Kembali ke "Database"
2. Klik tombol "Connect" pada cluster 
3. Pilih "Connect your application"
4. Copy connection string yang muncul, contoh:
   ```
   mongodb+srv://testing:<db_password>@testing.wkuyzi0.mongodb.net/?appName=testing
   ```

### 6. Update Backend .env

1. Buka file `backend\.env`
2. Ganti `<password>` with your passwrod you have made
3. Masukan MONGODB_URI: 




### 7. Selesai!


```bash
cd backend
npm run dev
```

Database akan otomatis terkoneksi ke MongoDB Atlas di cloud.

## Keuntungan MongoDB Atlas:

- Gratis 512MB storage
- Tidak perlu install apapun
- Bisa diakses dari mana saja
- Automatic backup
- Lebih mudah untuk production nanti

## Troubleshooting:

**Error: "MongoServerError: bad auth"**
- Pastikan username dan password benar
- Pastikan tidak ada karakter `<` atau `>` di connection string

**Error: "MongooseServerSelectionError"**
- Cek Network Access di Atlas, pastikan IP  diizinkan
- Atau set "Allow Access from Anywhere"

**Error: "ENOTFOUND"**
- Cek koneksi internet 
- Pastikan connection string sudah benar

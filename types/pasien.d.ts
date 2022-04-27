export type Data = {
  Pages: number
  Data: any[]
}

export type Pasien = {
  Id: number
  NamaPasien: string
  Alamat: string
  TempatLahir: string
  TanggalLahir: string
  NamaKepalaKeluarga: string
  JenisKelamin: string
}

export type DetailPasien = {
  Id: number
  TanggalPemeriksaan: string
  HasilPemeriksaan: string
  Diagnosis: string
  Terapi: string
  StatusTransaksi: string
  IdPasien: number
}

export type Obat = {
  Id: number
  Kode: string
  Nama: string
  HargaJual: number
  Masuk: number
  Keluar: number
  Sisa: number
}

export type Transaksi = {
  RincianObat: String
  Jumlah: number
  Harga: number
  Stok: number
  IdObat: number
  IdPemeriksaan: number
}

export type NotaObat = {
  Id: number
  RincianObat: String
  Jumlah: number
  Harga: number
  IdObat: number
  IdPemeriksaan: number
  DeleteStatus: boolean
}

export type DataNota = {
  obat: NotaObat[]
  pasien: Pasien
}
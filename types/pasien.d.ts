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
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Form from '../Form'
import Input from '../Input'
import LabelForm from '../LabelForm'
import Modal from '../Modal'
import ModalAction from '../ModalAction'

interface ModalTambahPasienProps {
  getDetailPasien: () => void
  id: string
}

const ModalTambahPasien = ({ getDetailPasien, id }: ModalTambahPasienProps) => {
  const [hasilPemeriksaanTambah, setHasilPemeriksaanTambah] = useState<string>()
  const [diagnosisTambah, setDiagnosisTambah] = useState<string>()
  const [terapiTambah, setTerapiTambah] = useState<string>()

  const tambahDetail = () => {
    const dateTambah = new Date().toISOString()
    
    axios.post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/add`, {
        TanggalPemeriksaan: dateTambah,
        HasilPemeriksaan: hasilPemeriksaanTambah,
        Diagnosis: diagnosisTambah,
        Terapi: terapiTambah,
        IdPasien: parseInt(id),
      })
      .then(() => {
        getDetailPasien()
        toast.success('Data pemeriksaan berhasil ditambahkan!')
      })
      .catch((err) => {
        getDetailPasien()
        toast.error('Data pemeriksaan gagal ditambahkan!')
        console.log(err)
        setHasilPemeriksaanTambah('')
        setDiagnosisTambah('')
        setTerapiTambah('')
      })
  }

  return (
    <Modal title={'Tambah Data Pasien'} id={'modal-tambah'}>
      <Form>
        <LabelForm>Hasil Pemeriksaan</LabelForm>
        <Input
          value={hasilPemeriksaanTambah}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setHasilPemeriksaanTambah(e.target.value)
          }}
        />
      </Form>
      <Form>
        <LabelForm>Diagnosis</LabelForm>
        <Input
          value={diagnosisTambah}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDiagnosisTambah(e.target.value)
          }}
        />
      </Form>
      <Form>
        <LabelForm>Terapi</LabelForm>
        <Input
          value={terapiTambah}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTerapiTambah(e.target.value)
          }}
        />
      </Form>

      <ModalAction>
        <label htmlFor="modal-tambah" className="btn btn-accent btn-sm">
          Kembali
        </label>
        <label
          htmlFor="modal-tambah"
          className="btn btn-primary btn-sm"
          onClick={tambahDetail}
        >
          Tambah Data
        </label>
      </ModalAction>
    </Modal>
  )
}

export default ModalTambahPasien

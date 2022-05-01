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
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState<string>()
  const [diagnosis, setDiagnosis] = useState<string>()
  const [terapi, setTerapi] = useState<string>()

  const addDetail = () => {
    const date = new Date().toISOString()

    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/add`, {
        TanggalPemeriksaan: date,
        HasilPemeriksaan: hasilPemeriksaan,
        Diagnosis: diagnosis,
        Terapi: terapi,
        IdPasien: id,
      })
      .then(() => {
        getDetailPasien()
        toast.success('Data berhasil ditambahkan!')
      })
      .catch((err) => {
        getDetailPasien()
        toast.error('Data gagal ditambahkan!')
        console.log(err)
        setHasilPemeriksaan('')
        setDiagnosis('')
        setTerapi('')
      })
  }

  return (
    <Modal title={'Tambah Data Pasien'} id={'modal-tambah'}>
      <Form>
        <LabelForm>Hasil Pemeriksaan</LabelForm>
        <Input
          value={hasilPemeriksaan}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setHasilPemeriksaan(e.target.value)
          }}
        />
      </Form>
      <Form>
        <LabelForm>Diagnosis</LabelForm>
        <Input
          value={diagnosis}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDiagnosis(e.target.value)
          }}
        />
      </Form>
      <Form>
        <LabelForm>Terapi</LabelForm>
        <Input
          value={terapi}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTerapi(e.target.value)
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
          onClick={addDetail}
        >
          Tambah Data
        </label>
      </ModalAction>
    </Modal>
  )
}

export default ModalTambahPasien

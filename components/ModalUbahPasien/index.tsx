import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Form from '../Form'
import Input from '../Input'
import LabelForm from '../LabelForm'
import Modal from '../Modal'
import ModalAction from '../ModalAction'

interface ModalUbahPasienProps {
  getDetailPasien: () => void
  id: string
}

const ModalUbahPasien = ({ getDetailPasien, id }: ModalUbahPasienProps) => {
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState<string>()
  const [diagnosis, setDiagnosis] = useState<string>()
  const [terapi, setTerapi] = useState<string>()

  const editDetail = () => {
    const date = new Date().toISOString()

    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/edit`, {
        TanggalPemeriksaan: date,
        HasilPemeriksaan: hasilPemeriksaan,
        Diagnosis: diagnosis,
        Terapi: terapi,
        Id: id,
      })
      .then(() => {
        getDetailPasien()
        toast.success('Data berhasil diubah!')
        setHasilPemeriksaan('')
        setDiagnosis('')
        setTerapi('')
      })
      .catch((err) => {
        getDetailPasien()
        toast.error('Data gagal diubah!')
        console.log(err)
        setHasilPemeriksaan('')
        setDiagnosis('')
        setTerapi('')
      })
  }

  return (
    <Modal title={'Ubah Data Pasien'} id={'modal-edit'}>
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
        <label htmlFor="modal-edit" className="btn btn-accent btn-sm">
          Kembali
        </label>
        <label
          htmlFor="modal-edit"
          className="btn btn-primary btn-sm"
          onClick={() => {
            editDetail()
          }}
        >
          Edit Data
        </label>
      </ModalAction>
    </Modal>
  )
}

export default ModalUbahPasien

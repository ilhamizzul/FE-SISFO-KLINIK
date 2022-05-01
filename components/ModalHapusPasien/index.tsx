import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import Modal from '../Modal'
import ModalAction from '../ModalAction'

interface modalProps {
  getDetailPasien: () => void
  id?: number
}

const ModalHapusPasien = ({ getDetailPasien, id }: modalProps) => {
  const deleteDetail = (idPemeriksaan: number) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/hapus?id=${idPemeriksaan}`
      )
      .then(() => {
        getDetailPasien()
        toast.success('Data berhasil dihapus!')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Data gagal dihapus!')
      })
  }

  return (
    <Modal title={'Hapus Data Pasien'} id={'modal-hapus'}>
      <span>Yakin ingin menghapus data pasien?</span>
      <ModalAction>
        <label htmlFor="modal-hapus" className="btn btn-accent btn-sm">
          Kembali
        </label>
        <label
          htmlFor="modal-hapus"
          className="btn btn-primary btn-sm"
          onClick={() => {
            deleteDetail(id!)
          }}
        >
          Hapus Data
        </label>
      </ModalAction>
    </Modal>
  )
}

export default ModalHapusPasien

import axios from 'axios'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { HiEye, HiPencilAlt, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'

import Form from '../../components/Form'
import Input from '../../components/Input'
import LabelForm from '../../components/LabelForm'
import Layout from '../../components/Layout'
import Modal from '../../components/Modal'
import ModalAction from '../../components/ModalAction'
import PageTitle from '../../components/PageTitle'
import SectionTitle from '../../components/SectionTitle'
import { Obat } from '../../types/pasien'
import { exportData } from '../../utils/exportData'
import { rupiah } from '../../utils/formatRupiah'

const Obat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataObat, setDataObat] = useState<[]>()
  const [kodeObat, setKodeObat] = useState<string>()
  const [namaObat, setNamaObat] = useState<string>()
  const [hargaJual, setHargaJual] = useState<number>(0)

  const getAllData = async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_URL_HOST}/api/obat`)
      setDataObat(res.data.value)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const addObat = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_HOST}/api/obat`,
        {
          Kode: kodeObat,
          Nama: namaObat,
          HargaJual: hargaJual,
        }
      )
      toast.success('Data berhasil ditambahkan!')
      getAllData()
      resetState()
    } catch (err) {
      console.log(err)
      toast.error('Data gagal ditambahkan!')
      resetState()
    }
  }

  let allData: Array<object> = []

  dataObat?.map((data: Obat) => {
    allData.push(data)
  })

  const handleExport = () => {
    exportData(allData, 'Data-Obat', [
      'Id',
      'Kode',
      'Nama',
      'HargaJual',
      'Sisa',
    ])
  }

  const resetState = () => {
    setKodeObat('')
    setNamaObat('')
    setHargaJual(0)
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <PageTitle>Obat</PageTitle>

      <Layout>
        <SectionTitle>Data Obat</SectionTitle>
        <div className="mt-4">
          <div className="mb-4 space-x-2">
            <label className="btn btn-primary btn-sm" htmlFor={'my-modal'}>
              Tambah Data
            </label>
            <button className="btn btn-secondary btn-sm" onClick={handleExport}>
              Export Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="table-compact table w-full">
                <thead>
                  <tr>
                    <th />
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Harga Jual</th>
                    <th>Stok</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className={'text-center'}>
                        Loading
                      </td>
                    </tr>
                  ) : (
                    dataObat?.map((page: Obat, i: number) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{page.Kode}</td>
                          <td>{page.Nama}</td>
                          <td>{rupiah(page.HargaJual)}</td>
                          <td>{page.Sisa}</td>
                          <td className="items-center justify-center">
                            <div className="flex items-center justify-center">
                              <Link href={`/pasien/${page.Id}`} passHref>
                                <label className="btn btn-warning btn-xs rounded-r-none">
                                  <HiEye />
                                </label>
                              </Link>
                              <label
                                className="btn btn-secondary btn-xs rounded-none"
                                htmlFor={'modal-edit'}
                                // onClick={() => handleEdit(tes)}
                              >
                                <HiPencilAlt />
                              </label>
                              <label
                                className="btn btn-accent btn-xs rounded-l-none"
                                htmlFor={'modal-hapus'}
                                // onClick={() => setIdPemeriksaan(tes.Id)}
                              >
                                <HiTrash />
                              </label>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
      <Modal title={'Tambah Data Pasien'} id={'my-modal'}>
        <Form>
          <LabelForm>Kode Obat</LabelForm>
          <Input
            value={kodeObat}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setKodeObat(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Nama Obat</LabelForm>
          <Input
            value={namaObat}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNamaObat(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Harga Jual Obat</LabelForm>
          <Input
            type="number"
            min={0}
            value={hargaJual}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setHargaJual(parseInt(e.target.value))
            }}
          />
        </Form>
        <ModalAction>
          <label htmlFor="my-modal" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="my-modal"
            className="btn btn-primary btn-sm"
            onClick={addObat}
          >
            Tambah Data
          </label>
        </ModalAction>
      </Modal>
    </>
  )
}

export default Obat

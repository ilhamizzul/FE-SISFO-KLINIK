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
import { Data, Obat } from '../../types/pasien'
import { exportData } from '../../utils/exportData'
import { rupiah } from '../../utils/formatRupiah'

const ObatPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataObat, setDataObat] = useState<[]>()
  const [kodeObat, setKodeObat] = useState<string>()
  const [namaObat, setNamaObat] = useState<string>()
  const [hargaJual, setHargaJual] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [idObat, setIdObat] = useState<number>(0)

  const getAllData = async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_URL_HOST}/api/obat`)
      setDataObat(res.data.value)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const addObat = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/obat`, {
        Kode: kodeObat,
        Nama: namaObat,
        HargaJual: hargaJual,
      })
      .then(() => {
        toast.success('Data berhasil ditambahkan!')
        getAllData()
        resetState()
      })
      .catch((err) => {
        console.log(err)
        toast.error('Data gagal ditambahkan!')
        resetState()
      })
  }

  const deleteObat = async (id: number) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_URL_HOST}/api/obat/`, {
        data: {
          Id: id,
        },
      })
      .then((res) => {
        getAllData()
        toast.success('Data obat berhasil dihapus!')
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Data obat gagal dihapus!')
      })
  }

  const editObat = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien/edit`, {
        Kode: kodeObat,
        Nama: namaObat,
        HargaJual: hargaJual,
      })
      .then(() => {
        getAllData()
        toast.success('Data berhasil ditambahkan!')
        resetState()
      })
      .catch((err) => {
        getAllData()
        toast.error('Data gagal ditambahkan!')
        console.log(err)
        resetState()
      })
  }

  const handleEdit = (data: Obat) => {
    setKodeObat(data.Kode)
    setNamaObat(data.Nama)
    setHargaJual(data.HargaJual)
  }

  let allData: Array<object> = []

  dataObat?.map((page: Data) => {
    return page.Data.map((tes) => {
      allData.push(tes)
    })
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

  const pagination = (tes: number) => {
    setCurrentPage(tes - 1)
  }

  const resetState = (): void => {
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
            <label className="btn btn-primary btn-sm" htmlFor={'modal-tambah'}>
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
                    dataObat
                      ?.filter((page: Data) => {
                        return page.Pages == currentPage + 1
                      })
                      .map((page: Data) => {
                        return page.Data.map((tes, i) => {
                          return (
                            <tr key={i}>
                              <th>
                                {currentPage == 0
                                  ? i + 1
                                  : i + 1 + 10 * currentPage}
                              </th>
                              <td>{tes.Kode}</td>
                              <td>{tes.Nama}</td>
                              <td>{rupiah(tes.HargaJual)}</td>
                              <td>{tes.Sisa}</td>
                              <td className="items-center justify-center">
                                <div className="flex items-center justify-center">
                                  <label
                                    className="btn btn-secondary btn-xs rounded-r-none"
                                    htmlFor={'modal-edit'}
                                    onClick={() => handleEdit(tes)}
                                  >
                                    <HiPencilAlt />
                                  </label>
                                  <label
                                    className="btn btn-accent btn-xs rounded-l-none"
                                    htmlFor={'modal-hapus'}
                                    onClick={() => setIdObat(tes.Id)}
                                  >
                                    <HiTrash />
                                  </label>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="btn-group mt-4">
            {dataObat?.map((page: Data, i: number) => {
              return (
                <>
                  <button
                    className={`btn btn-sm ${
                      currentPage + 1 == page.Pages ? 'btn-active' : ''
                    }`}
                    key={i}
                    onClick={() => pagination(page.Pages)}
                  >
                    {page.Pages}
                  </button>
                </>
              )
            })}
          </div>
        </div>
      </Layout>
      <Modal title={'Tambah Data Obat'} id={'modal-tambah'}>
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
          <label htmlFor="modal-tambah" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="modal-tambah"
            className="btn btn-primary btn-sm"
            onClick={addObat}
          >
            Tambah Data
          </label>
        </ModalAction>
      </Modal>
      <Modal title={'Ubah Data Obat'} id={'modal-edit'}>
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
          <label htmlFor="modal-edit" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="modal-edit"
            className="btn btn-primary btn-sm"
            onClick={editObat}
          >
            Tambah Data
          </label>
        </ModalAction>
      </Modal>
      <Modal title={'Hapus Data Obat'} id={'modal-hapus'}>
        <span>Yakin ingin menghapus data obat?</span>
        <ModalAction>
          <label htmlFor="modal-hapus" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="modal-hapus"
            onClick={() => {
              deleteObat(idObat!)
            }}
            className="btn btn-primary btn-sm"
          >
            Hapus Data
          </label>
        </ModalAction>
      </Modal>
    </>
  )
}

export default ObatPage

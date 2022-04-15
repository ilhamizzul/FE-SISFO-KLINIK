import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
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
import Select from '../../components/Select'
import { Data, Pasien } from '../../types/pasien'
import { exportData } from '../../utils/exportData'

const Home: NextPage = () => {
  const [name, setName] = useState<string>()
  const [alamat, setAlamat] = useState<string>()
  const [tempatLahir, setTempatLahir] = useState<string>()
  const [tanggalLahir, setTanggalLahir] = useState<string>()
  const [kepalaKeluarga, setKepalaKeluarga] = useState<string>()
  const [jenisKelamin, setJenisKelamin] = useState<string>('L')
  const [dataPasien, setDataPasien] = useState<[]>()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [idPemeriksaan, setIdPemeriksaan] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getAllData = async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien`)
      setDataPasien(res.data.value)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const addPasien = () => {
    const date = tanggalLahir ? new Date(tanggalLahir).toISOString() : ''

    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien/add`, {
        NamaPasien: name,
        Alamat: alamat,
        TempatLahir: tempatLahir,
        TanggalLahir: date,
        NamaKepalaKeluarga: kepalaKeluarga,
        JenisKelamin: jenisKelamin,
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

  const editPasien = () => {
    const date = tanggalLahir ? new Date(tanggalLahir).toISOString() : ''

    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien/edit`, {
        Id: idPemeriksaan,
        Alamat: alamat,
        TempatLahir: tempatLahir,
        TanggalLahir: date,
        NamaKepalaKeluarga: kepalaKeluarga,
        JenisKelamin: jenisKelamin,
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

  const handleEdit = (data: Pasien) => {
    setIdPemeriksaan(data.Id)
    setAlamat(data.Alamat)
    setTempatLahir(data.TempatLahir)
    setTanggalLahir(data.TanggalLahir.substring(0, 10))
    setKepalaKeluarga(data.NamaKepalaKeluarga)
    setJenisKelamin(data.JenisKelamin)
  }

  const deletePasien = async (id: number) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien/hapus`, {
        Id: id,
      })
      .then((res) => {
        getAllData()
        toast.success('Data pasien berhasil dihapus!')
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Data pasien gagal dihapus!')
      })
  }

  const resetState = () => {
    setName('')
    setAlamat('')
    setTempatLahir('')
    setTanggalLahir('')
    setKepalaKeluarga('')
  }

  const pagination = (tes: number) => {
    setCurrentPage(tes - 1)
  }

  useEffect(() => {
    getAllData()
  }, [])

  let allData: Array<object> = []

  dataPasien?.map((page: Data) => {
    return page.Data.map((tes) => {
      allData.push(tes)
    })
  })

  const handleExport = () => {
    exportData(allData, 'Data-Pasien', [
      'Alamat',
      'NamaPasien',
      'TempatLahir',
      'TanggalLahir',
      'NamaKepalaKeluarga',
      'Id',
      'JenisKelamin',
    ])
  }

  return (
    <>
      <PageTitle>Pasien</PageTitle>

      <Layout>
        <SectionTitle>Data Pasien</SectionTitle>
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
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Tempat Lahir</th>
                    <th>Tanggal Lahir</th>
                    <th>Kepala Keluarga</th>
                    <th>Jenis Kelamin</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className={'text-center'}>
                        Loading
                      </td>
                    </tr>
                  ) : (
                    dataPasien
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
                              <td>{tes.NamaPasien}</td>
                              <td>{tes.Alamat}</td>
                              <td>{tes.TempatLahir}</td>
                              <td>{tes.TanggalLahir.substring(0, 10)}</td>
                              <td>{tes.NamaKepalaKeluarga}</td>
                              <td>
                                {tes.JenisKelamin === 'L'
                                  ? 'Laki-laki'
                                  : 'Perempuan'}
                              </td>
                              <td className="items-center justify-center">
                                <div className="flex items-center justify-center">
                                  <Link href={`/pasien/${tes.Id}`} passHref>
                                    <label className="btn btn-warning btn-xs rounded-r-none">
                                      <HiEye />
                                    </label>
                                  </Link>
                                  <label
                                    className="btn btn-secondary btn-xs rounded-none"
                                    htmlFor={'modal-edit'}
                                    onClick={() => handleEdit(tes)}
                                  >
                                    <HiPencilAlt />
                                  </label>
                                  <label
                                    className="btn btn-accent btn-xs rounded-l-none"
                                    htmlFor={'modal-hapus'}
                                    onClick={() => setIdPemeriksaan(tes.Id)}
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
            {dataPasien?.map((page: Data, i: number) => {
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
      <Modal title={'Tambah Data Pasien'} id={'my-modal'}>
        <Form>
          <LabelForm>Nama</LabelForm>
          <Input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Alamat</LabelForm>
          <Input
            value={alamat}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAlamat(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Tempat Lahir</LabelForm>
          <Input
            value={tempatLahir}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTempatLahir(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Tanggal Lahir</LabelForm>
          <input
            type="date"
            className="input input-bordered input-sm w-full"
            value={tanggalLahir}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTanggalLahir(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Nama Kepala Keluarga</LabelForm>
          <Input
            value={kepalaKeluarga}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setKepalaKeluarga(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Jenis Kelamin</LabelForm>
          <Select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setJenisKelamin(e.target.value)
            }}
          >
            <option value={'L'}>Laki-laki</option>
            <option value={'P'}>Perempuan</option>
          </Select>
        </Form>
        <ModalAction>
          <label htmlFor="my-modal" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="my-modal"
            className="btn btn-primary btn-sm"
            onClick={addPasien}
          >
            Tambah Data
          </label>
        </ModalAction>
      </Modal>
      <Modal title={'Ubah Data Pasien'} id={'modal-edit'}>
        <Form>
          <LabelForm>Alamat</LabelForm>
          <Input
            value={alamat}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAlamat(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Tempat Lahir</LabelForm>
          <Input
            value={tempatLahir}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTempatLahir(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Tanggal Lahir</LabelForm>
          <input
            type="date"
            className="input input-bordered input-sm w-full"
            value={tanggalLahir}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTanggalLahir(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Nama Kepala Keluarga</LabelForm>
          <Input
            value={kepalaKeluarga}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setKepalaKeluarga(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Jenis Kelamin</LabelForm>
          <Select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setJenisKelamin(e.target.value)
            }}
          >
            {jenisKelamin == 'L' ? (
              <>
                <option value={'L'}>Laki-laki</option>
                <option value={'P'}>Perempuan</option>
              </>
            ) : (
              <>
                <option value={'P'}>Perempuan</option>
                <option value={'L'}>Laki-laki</option>
              </>
            )}
          </Select>
        </Form>
        <ModalAction>
          <label htmlFor="modal-edit" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="modal-edit"
            className="btn btn-primary btn-sm"
            onClick={editPasien}
          >
            Edit Data
          </label>
        </ModalAction>
      </Modal>
      <Modal title={'Hapus Data Pasien'} id={'modal-hapus'}>
        <span>Yakin ingin menghapus data pasien?</span>
        <ModalAction>
          <label htmlFor="modal-hapus" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="modal-hapus"
            onClick={() => {
              deletePasien(idPemeriksaan!)
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

export default Home

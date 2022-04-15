import axios from 'axios'
import exportFromJSON from 'export-from-json'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaClipboardCheck, FaDollarSign } from 'react-icons/fa'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'

import Form from '../../../components/Form'
import Input from '../../../components/Input'
import LabelForm from '../../../components/LabelForm'
import Layout from '../../../components/Layout'
import Modal from '../../../components/Modal'
import ModalAction from '../../../components/ModalAction'
import PageTitle from '../../../components/PageTitle'
import SectionTitle from '../../../components/SectionTitle'
import { Data, Pasien, DetailPasien } from '../../../types/pasien'

const DetailPemeriksaan = () => {
  const router = useRouter()
  const { id } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [detailPasien, setDetailPasien] = useState<[]>()
  const [pasien, setPasien] = useState<Pasien>()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState<string>()
  const [diagnosis, setDiagnosis] = useState<string>()
  const [terapi, setTerapi] = useState<string>()
  const [idDetail, setIdDetail] = useState<number>()

  const getDetailPasien = async () => {
    try {
      const pasien = await axios(
        `${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/pasien?id=${id}`
      )
      setDetailPasien(pasien.data.value)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const getPasien = () => {
    axios(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien/detail?id=${id}`)
      .then((res) => {
        setPasien(res.data.value)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addDetail = () => {
    const date = new Date().toISOString()
    const idPasien = id as string

    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/add`, {
        TanggalPemeriksaan: date,
        HasilPemeriksaan: hasilPemeriksaan,
        Diagnosis: diagnosis,
        Terapi: terapi,
        IdPasien: parseInt(idPasien),
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

  const editDetail = () => {
    const date = new Date().toISOString()

    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/edit`, {
        TanggalPemeriksaan: date,
        HasilPemeriksaan: hasilPemeriksaan,
        Diagnosis: diagnosis,
        Terapi: terapi,
        Id: idDetail,
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

  const handleEdit = (data: DetailPasien) => {
    setIdDetail(data.Id)
    setHasilPemeriksaan(data.HasilPemeriksaan)
    setDiagnosis(data.Diagnosis)
    setTerapi(data.Terapi)
  }

  const deleteDetail = (id: number) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_URL_HOST}/api/pemeriksaan/hapus?id=${id}`
      )
      .then((res) => {
        getDetailPasien()
        toast.success('Data berhasil dihapus!')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Data gagal dihapus!')
      })
  }

  const pagination = (tes: number) => {
    setCurrentPage(tes - 1)
  }

  let allData: Array<object> = []

  detailPasien?.map((page: Data) => {
    return page.Data.map((tes, i) => {
      allData.push(tes)
    })
  })

  const handleExport = () => {
    const data = allData
    const fileName = 'Data-Pasien'
    const exportType = 'xls'
    const fields = [
      'TanggalPemeriksaan',
      'HasilPemeriksaan',
      'Diagnosis',
      'Terapi',
      'StatusTransaksi',
      'Id',
      'IdPasien',
    ]
    exportFromJSON({ data, fileName, exportType, fields })
  }

  useEffect(() => {
    getDetailPasien()
    getPasien()
  }, [])

  useEffect(() => {
    if (!id) return
  }, [id])

  return (
    <>
      <PageTitle>Detail Pasien</PageTitle>

      <Layout>
        <SectionTitle>Data Pasien : {pasien?.NamaPasien}</SectionTitle>
        <div className="mt-4">
          <div className="mb-4 space-x-2">
            <label className="btn btn-primary btn-sm" htmlFor={'modal-tambah'}>
              Tambah Pemeriksaan
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
                    <th>Tanggal Pemeriksaan</th>
                    <th>Hasil Pemeriksaan</th>
                    <th>Diagnosis</th>
                    <th>Terapi</th>
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
                  ) : !isLoading && !detailPasien ? (
                    <tr>
                      <td colSpan={7} className={'text-center'}>
                        Belum ada data pemeriksaan
                      </td>
                    </tr>
                  ) : (
                    detailPasien
                      ?.filter((page: Data) => {
                        return page.Pages == currentPage + 1
                      })
                      .map((page: Data) => {
                        return page.Data.map((tes, i) => {
                          return (
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <td>{tes.TanggalPemeriksaan.substring(0, 10)}</td>
                              <td>{tes.HasilPemeriksaan}</td>
                              <td>{tes.Diagnosis}</td>
                              <td>{tes.Terapi}</td>
                              <td className="items-center justify-center">
                                <div className="flex items-center justify-center">
                                  {tes.StatusTransaksi == 'sudah' ? (
                                    <label
                                      className="btn btn-primary btn-xs rounded-r-none"
                                      htmlFor={'modal-transaksi'}
                                    >
                                      <FaClipboardCheck />
                                    </label>
                                  ) : (
                                    <Link
                                      href={`/transaksi/${tes.Id}`}
                                      passHref
                                    >
                                      <label className="btn btn-warning btn-xs rounded-r-none">
                                        <FaDollarSign />
                                      </label>
                                    </Link>
                                  )}
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
                                    onClick={() => {
                                      setIdDetail(tes.Id)
                                    }}
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
            {detailPasien?.map((page: Data, i: number) => {
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
              deleteDetail(idDetail!)
            }}
          >
            Hapus Data
          </label>
        </ModalAction>
      </Modal>
      <Modal title={'Data Transaksi'} id={'modal-transaksi'}>
        <span>Yakin ingin menghapus data pasien?</span>
        <ModalAction>
          <label htmlFor="modal-transaksi" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="modal-hapus"
            className="btn btn-primary btn-sm"
            onClick={() => {
              deleteDetail(idDetail!)
            }}
          >
            Hapus Data
          </label>
        </ModalAction>
      </Modal>
    </>
  )
}

export default DetailPemeriksaan

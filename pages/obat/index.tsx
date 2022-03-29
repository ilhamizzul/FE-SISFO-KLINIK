import axios from 'axios'
import exportFromJSON from 'export-from-json'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiEye, HiPencilAlt, HiTrash } from 'react-icons/hi'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import SectionTitle from '../../components/SectionTitle'
import { Data, Obat } from '../../types/pasien'
import { exportData } from '../../utils/exportData'

const Obat = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataObat, setDataObat] = useState<[]>()

  const getAllData = async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_URL_HOST}/api/obat`)
      setDataObat(res.data.value)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
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
                    <th>Sisa</th>
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
                          <td>{page.HargaJual}</td>
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
    </>
  )
}

export default Obat

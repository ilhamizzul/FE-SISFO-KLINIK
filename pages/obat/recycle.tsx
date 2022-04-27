import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import Modal from '../../components/Modal'
import ModalAction from '../../components/ModalAction'
import PageTitle from '../../components/PageTitle'
import SectionTitle from '../../components/SectionTitle'
import { Data } from '../../types/pasien'
import { rupiah } from '../../utils/formatRupiah'

const Recycle = () => {
  const [data, setData] = useState<[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [idPemeriksaan, setIdPemeriksaan] = useState<number>()

  const getDataRecycle = async () => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien/sampah`
      )
      setData(res.data.value)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const pagination = (tes: number) => {
    setCurrentPage(tes - 1)
    getDataRecycle()
  }

  const activatePasien = (id: number) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_HOST}/api/pasien/aktivasi`, {
        Id: id,
      })
      .then(() => {
        getDataRecycle()
        toast.success('Data pasien berhasil diaktifkan kembali!')
      })
      .catch(() => {
        getDataRecycle()
        toast.error('Data pasien gagal diaktifkan!')
      })
  }

  useEffect(() => {
    getDataRecycle()
  }, [])

  return (
    <>
      <PageTitle>Recycle Bin</PageTitle>
      <Layout>
        <SectionTitle>Recycle Bin</SectionTitle>
        <div className="mt-4">
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
                      <td colSpan={7} className={'text-center'}>
                        Loading
                      </td>
                    </tr>
                  ) : (
                    data
                      ?.filter((page: Data) => {
                        return page.Pages == currentPage + 1
                      })
                      .map((page: Data) => {
                        return page.Data.map((tes, i) => {
                          return (
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <td>Kode Obat</td>
                              <td>Nama Obat</td>
                              <td>{rupiah(10000)}</td>
                              <td>5</td>
                              <td>
                                <div className="flex items-center justify-center space-x-2">
                                  <label
                                    className="btn btn-secondary btn-xs"
                                    htmlFor={'modal-activate'}
                                    // onClick={() => setIdPemeriksaan(tes.Id)}
                                  >
                                    Aktivasi
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
            {data?.map((page: Data, i: number) => {
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
      <Modal title={'Aktifkan Data Pasien'} id={'modal-activate'}>
        <span>Yakin ingin mengaktifkan data pasien?</span>
        <ModalAction>
          <label htmlFor="modal-activate" className="btn btn-accent btn-sm">
            Kembali
          </label>
          <label
            htmlFor="modal-activate"
            onClick={() => {
              activatePasien(idPemeriksaan!)
            }}
            className="btn btn-primary btn-sm"
          >
            Aktivasi Data
          </label>
        </ModalAction>
      </Modal>
    </>
  )
}

export default Recycle

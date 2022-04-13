import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HiOutlineMinusSm, HiPlusSm } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import SectionTitle from '../../components/SectionTitle'
import {
  selectObatValue,
  addObat,
  deleteObat,
  plusObat,
  minusObat,
} from '../../redux/obatSlice'
import { Data, Obat, Transaksi } from '../../types/pasien'

const TransaksiObat = () => {
  const [dataObat, setDataObat] = useState<[]>()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [dataTransaksi, setDataTransaksi] = useState<Transaksi[]>([])
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const obatValue = useSelector(selectObatValue)

  const getAllData = async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_URL_HOST}/api/obat`)
      setDataObat(res.data.value)
    } catch (err) {
      console.log(err)
    }
  }

  const checkExist = (data: Obat): boolean => {
    let res: boolean = false
    obatValue.some((x) => {
      if (x.IdObat === data.Id) {
        res = x.IdObat === data.Id
      }
    })
    return res
  }

  const addTransaksi = (data: Obat) => {
    let exist: boolean = checkExist(data)

    let transaksi: Transaksi = {
      RincianObat: data.Nama,
      Jumlah: 1,
      Harga: 1,
      IdObat: data.Id,
      IdPemeriksaan: parseInt(id as string),
    }

    const index = obatValue.findIndex((obj) => {
      return obj.IdObat === data.Id
    })

    if (exist) {
      dispatch(plusObat(index))
    } else {
      dispatch(addObat(transaksi))
    }
  }

  const deleteTransaksi = (id: number) => {
    dispatch(deleteObat(id))
  }

  const pagination = (tes: number) => {
    setCurrentPage(tes - 1)
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <PageTitle>Transaksi Obat</PageTitle>
      <Layout>
        <SectionTitle>Transaksi Obat</SectionTitle>
        <div className="mt-4 w-full gap-5 lg:flex">
          <div className="h-1/3 w-full rounded-md lg:w-1/3">
            <table className="table-compact table w-full">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Obat</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {dataObat
                  ?.filter((page: Data) => {
                    return page.Pages == currentPage + 1
                  })
                  .map((page: Data) => {
                    return page.Data.map((tes: Obat) => {
                      return (
                        <tr>
                          <td>{tes.Kode}</td>
                          <td>{tes.Nama}</td>
                          <th>
                            <label>
                              <button
                                className="btn btn-secondary btn-xs"
                                onClick={() => addTransaksi(tes)}
                              >
                                tambah
                              </button>
                            </label>
                          </th>
                        </tr>
                      )
                    })
                  })}
              </tbody>
            </table>
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
          <div className="w-full rounded-md lg:w-2/3">
            <table className="table-compact table w-full">
              <thead>
                <tr>
                  <th />
                  <th>Nama Obat</th>
                  <th>Rincian Obat</th>
                  <th>Jumlah Obat</th>
                  <th>Harga</th>
                  <th align="center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {obatValue.map((data: Transaksi) => {
                  return (
                    <tr>
                      <th />
                      <td>{data.RincianObat}</td>
                      <td>{data.Harga}</td>
                      <td>
                        <div className="form-control">
                          <div className="input-group">
                            <button
                              className="btn btn-square btn-sm"
                              onClick={() => {
                                dispatch(minusObat(data.IdObat - 1))
                              }}
                            >
                              <HiOutlineMinusSm />
                            </button>
                            <input
                              min={1}
                              className="input input-bordered input-sm w-10"
                              value={data.Jumlah}
                            />
                            <button
                              className="btn btn-square btn-sm"
                              onClick={() => {
                                dispatch(plusObat(data.IdObat - 1))
                              }}
                            >
                              <HiPlusSm />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{data.Harga}</td>
                      <td align="center">
                        <button
                          className="btn btn-accent btn-xs"
                          onClick={() => {
                            deleteTransaksi(data.IdObat)
                          }}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <button
              className="btn btn-primary btn-sm float-right mt-3"
              onClick={() => {
                console.log(obatValue)
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default TransaksiObat

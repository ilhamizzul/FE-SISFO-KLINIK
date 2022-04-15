import axios from 'axios'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { HiOutlineMinusSm, HiPlusSm } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
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
import { rupiah } from '../../utils/formatRupiah'

const index = () => {
  const [dataObat, setDataObat] = useState<[]>()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const obatValue = useSelector(selectObatValue)
  // const [inputSearch, setInputSearch] = useState<string>('')

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

  const addList = (data: Obat) => {
    let exist: boolean = checkExist(data)

    let transaksi: Transaksi = {
      RincianObat: data.Nama,
      Jumlah: 1,
      Harga: data.HargaJual,
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

  const addTransaksi = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_URL_HOST}/api/transaksi/${id}`,
        obatValue
      )
      .then((res) => {
        console.log(res)
        toast.success('Data berhasil ditambahkan!')
      })
      .catch((err) => {
        console.log(err)
        toast.success('Data gagal ditambahkan!')
      })
  }

  const deleteTransaksi = (idTransaksi: number) => {
    dispatch(deleteObat(idTransaksi))
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
        <div className="mt-4">
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder="search"
            // onChange={(e: ChangeEvent<HTMLInputElement>) => {
            //   setInputSearch(e.target.value)
            // }}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-6">
          <div className="col-span-1 w-full rounded-md">
            <table className="table-compact table w-full">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Obat</th>
                  <th align="center">Aksi</th>
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
                          <td align="center">
                            <label>
                              <button
                                className="btn btn-secondary btn-xs"
                                onClick={() => addList(tes)}
                              >
                                tambah
                              </button>
                            </label>
                          </td>
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
          <div className="col-span-2 w-full overflow-x-auto rounded-md">
            <table className="table-compact table w-full">
              <thead>
                <tr>
                  <th />
                  <th>Nama Obat</th>
                  <th>Jumlah Obat</th>
                  <th>Harga</th>
                  <th>Total</th>
                  <th align="center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {obatValue.map((data: Transaksi) => {
                  return (
                    <tr>
                      <th />
                      <td>{data.RincianObat}</td>
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
                      <td>{rupiah(data.Harga)}</td>
                      <td>{rupiah(data.Harga * data.Jumlah)}</td>
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
                addTransaksi()
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

export default index

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
  tambahRincian,
} from '../../redux/obatSlice'
import { Data, Obat, Transaksi } from '../../types/pasien'
import { rupiah } from '../../utils/formatRupiah'

const DetailTransaksi = () => {
  const [dataObat, setDataObat] = useState<Data[]>()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [inputSearch, setInputSearch] = useState<string>('')
  const router = useRouter()
  const { id, slug } = router.query
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

  const addList = (data: Obat) => {
    let exist: boolean = checkExist(data)

    let transaksi: Transaksi = {
      RincianObat: data.Nama,
      Jumlah: 1,
      Harga: data.HargaJual,
      Stok: data.Sisa,
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
      .then(() => {
        router.push(`/pasien/${slug}`)
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

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let lowerCase = e.target.value.toLowerCase()
    setInputSearch(lowerCase)
  }

  const dataX = dataObat?.[currentPage].Data || []

  const filteredData = dataX.filter((tes) => {
    if (inputSearch == '') {
      return tes
    } else {
      return tes.Nama.toLowerCase().includes(inputSearch)
    }
  })

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
            onChange={inputHandler}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-6">
          <div className="col-span-1 w-full rounded-md">
            <table className="table-compact table w-full">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Obat</th>
                  <th>Stok</th>
                  <th align="center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data: Obat) => {
                  return (
                    <tr>
                      <td>{data.Kode}</td>
                      <td>{data.Nama}</td>
                      <td>{data.Sisa}</td>
                      <td align="center">
                        {data.Sisa <= 0 ? (
                          <button className={`btn btn-disabled btn-xs`}>
                            kosong
                          </button>
                        ) : (
                          <button
                            className={`btn btn-secondary btn-xs`}
                            onClick={() => addList(data)}
                          >
                            tambah
                          </button>
                        )}
                      </td>
                    </tr>
                  )
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
                  <th>Rincian Obat</th>
                  <th>Jumlah Obat</th>
                  <th>Harga Obat</th>
                  <th>Total Harga</th>
                  <th align="center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {obatValue.map((data: Transaksi, i: number) => {
                  let namaObat = dataX.find(
                    (elemen) => elemen.Id == data.IdObat
                  )
                  return (
                    <tr>
                      <th />
                      <td>{namaObat.Nama}</td>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered input-sm"
                          onChange={(e) => {
                            dispatch(
                              tambahRincian({ id: i, data: e.target.value })
                            )
                          }}
                        />
                      </td>
                      <td>
                        <div className="form-control">
                          <div className="input-group">
                            <button
                              className="btn btn-square btn-sm"
                              onClick={() => {
                                dispatch(minusObat(i))
                              }}
                            >
                              <HiOutlineMinusSm />
                            </button>
                            <input
                              min={1}
                              max={data.Stok}
                              className="input input-bordered input-sm w-10"
                              value={data.Jumlah}
                            />
                            <button
                              className="btn btn-square btn-sm"
                              onClick={() => {
                                dispatch(plusObat(i))
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

export default DetailTransaksi

import axios from 'axios'
import { is } from 'immer/dist/internal'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DataNota, Obat } from '../../../types/pasien'
import { rupiah } from '../../../utils/formatRupiah'

const Invoice = () => {
  const router = useRouter()
  const { id, data } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataNota, setDataNota] = useState<DataNota>()
  let sum: number = 0

  console.log(id, data);
  
  const getNota = async () => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_URL_HOST}/api/transaksi/${data}/${id}`
      )
      setDataNota(res.data.value.obat)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getNota()
    const timer = setTimeout(() => {
      window.print()
    }, 300)
    return () => clearTimeout(timer)
  }, [id, data])

  return (
    <div className="flex h-screen w-full flex-col items-center p-5">
      <h1 className="mb-4 text-3xl font-bold">Sisfo Klinik</h1>
      <div className="w-full divide-y divide-dashed divide-gray-800">
        <div className="flex flex-col py-3">
          <span>Order #123</span>
          <span>Pasien : Reva Doni Aprilio</span>
          <span>{Date()}</span>
        </div>
        <div className="pb-2 pt-1">
          <table className="table-compact w-full divide-y divide-dashed divide-gray-800">
            <thead>
              <tr>
                <th align="left">Obat</th>
                <th align="center">QTY</th>
                <th align="right">Harga</th>
                <th align="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className={'text-center'}>
                    Loading
                  </td>
                </tr>
              ) : (
                dataNota?.detail_obat.map((data: Obat, i: number) => {
                  sum += data.HargaJual * dataNota.detail_transasksi[i].Jumlah
                  return (
                    <tr key={i}>
                      <td align="left" className="break-all">
                        {data.Nama}
                      </td>
                      <td align="center">
                        {dataNota.detail_transasksi[i].Jumlah}
                      </td>
                      <td align="right">{rupiah(data.HargaJual)}</td>
                      <td align="right">
                        {rupiah(
                          data.HargaJual * dataNota.detail_transasksi[i].Jumlah
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="py-2">
          <table className="table-compact w-full">
            <thead>
              <tr>
                <th align="left">Total</th>
                <th align="right">{rupiah(sum)}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Invoice

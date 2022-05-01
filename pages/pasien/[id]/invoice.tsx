import { useRouter } from 'next/router'
import { rupiah } from '../../../utils/formatRupiah'

const Invoice = () => {
  const router = useRouter()
  const params = router.query
  console.log(params)

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
              <tr>
                <td align="left" className="break-all">
                  asdaaaaaaaaaaaaaaa
                </td>
                <td align="center">2</td>
                <td align="right">{rupiah(5000)}</td>
                <td align="right">{rupiah(10000)}</td>
              </tr>
              <tr>
                <td align="left">asdaaaaaaaaaaaaaaa</td>
                <td align="center">1</td>
                <td align="right">{rupiah(10000)}</td>
                <td align="right">{rupiah(10000)}</td>
              </tr>
              <tr>
                <td align="left">asdaaaaaaaaaaaaaaa</td>
                <td align="center">4</td>
                <td align="right">{rupiah(2500)}</td>
                <td align="right">{rupiah(10000)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="py-2">
          <table className="table-compact w-full">
            <thead>
              <tr>
                <th align="left">Total</th>
                <th align="right">{rupiah(40000)}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Invoice

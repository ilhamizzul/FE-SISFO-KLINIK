import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import SectionTitle from '../components/SectionTitle'

const Home: NextPage = () => {
  const [pasien, setPasien] = useState([])

  const getAllData = () => {
    axios('https://apis-klinik.fanzru.dev/api/pasien')
      .then((res) => {
        setPasien(res.data.value[0].Data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <Layout>
        <SectionTitle>Dashboard</SectionTitle>
        <div className="mt-4">
          <div className="mb-4">
            <button className="btn btn-primary btn-sm">Tambah Data</button>
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
                  {pasien.map((dat: any, i: number) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{dat.NamaPasien}</td>
                        <td>{dat.Alamat}</td>
                        <td>{dat.TempatLahir}</td>
                        <td>{dat.TanggalLahir.substring(0, 10)}</td>
                        <td>{dat.NamaKepalaKeluarga}</td>
                        <td>
                          {dat.JenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </td>
                        <td>
                          <div className="flex items-center justify-center space-x-2">
                            <button className="btn btn-secondary btn-xs">
                              Edit
                            </button>
                            <button className="btn btn-accent btn-xs">
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home

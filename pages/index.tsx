import axios from 'axios'
import type { NextPage } from 'next'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Form from '../components/Form'
import Input from '../components/Input'
import LabelForm from '../components/LabelForm'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import ModalAction from '../components/ModalAction'
import PageTitle from '../components/PageTitle'
import SectionTitle from '../components/SectionTitle'
import Select from '../components/Select'

const Home: NextPage = () => {
  const [name, setName] = useState<string>()
  const [alamat, setAlamat] = useState<string>()
  const [tempatLahir, setTempatLahir] = useState<string>()
  const [tanggalLahir, setTanggalLahir] = useState<string>()
  const [kepalaKeluarga, setKepalaKeluarga] = useState<string>()
  const [jenisKelamin, setJenisKelamin] = useState<string>('L')
  const [data, setData] = useState<[]>()
  const [currentPage, setCurrentPage] = useState<number>(0)

  type Data = {
    Pages: number
    Data: any[]
  }

  const getAllData = (): void => {
    axios('https://apis-klinik.fanzru.dev/api/pasien')
      .then((res) => {
        setData(res.data.value)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addPasien = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const date = tanggalLahir ? new Date(tanggalLahir).toISOString() : ''

    axios
      .post('https://apis-klinik.fanzru.dev/api/pasien/add', {
        NamaPasien: name,
        Alamat: alamat,
        TempatLahir: tempatLahir,
        TanggalLahir: date,
        NamaKepalaKeluarga: kepalaKeluarga,
        JenisKelamin: jenisKelamin,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const pagination = (tes: number) => {
    setCurrentPage(tes - 1)
    getAllData()
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
          <div className="mb-4 space-x-2">
            <label className="btn btn-primary btn-sm" htmlFor={'my-modal'}>
              Tambah Data
            </label>
            {/* onClick={exportData} */}
            <button className="btn btn-secondary btn-sm">Export Data</button>
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
                  {data
                    ?.filter((page: Data) => {
                      return page.Pages == currentPage + 1
                    })
                    .map((page: Data) => {
                      return page.Data.map((tes, i) => {
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
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
                            <td>
                              <div className="flex items-center justify-center space-x-2">
                                <label
                                  className="btn btn-warning btn-xs"
                                  htmlFor={'my-modal'}
                                >
                                  Detail
                                </label>
                                <label
                                  className="btn btn-secondary btn-xs"
                                  htmlFor={'my-modal'}
                                >
                                  Edit
                                </label>
                                <label
                                  className="btn btn-accent btn-xs"
                                  htmlFor={'my-modal'}
                                >
                                  Hapus
                                </label>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    })}
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
      <Modal title={'Tambah Data Pasien'} id={'my-modal'}>
        <form onSubmit={addPasien}>
          <Form>
            <LabelForm>Nama</LabelForm>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value)
              }}
            />
          </Form>
          <Form>
            <LabelForm>Alamat</LabelForm>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAlamat(e.target.value)
              }}
            />
          </Form>
          <Form>
            <LabelForm>Tempat Lahir</LabelForm>
            <Input
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTanggalLahir(e.target.value)
              }}
            />
          </Form>
          <Form>
            <LabelForm>Nama Kepala Keluarga</LabelForm>
            <Input
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
            <label htmlFor="my-modal">
              <button className="btn btn-primary btn-sm" type="submit">
                Tambah Data
              </button>
            </label>
          </ModalAction>
        </form>
      </Modal>
    </>
  )
}

export default Home

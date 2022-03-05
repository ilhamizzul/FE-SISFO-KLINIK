import axios from 'axios'
import type { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'

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
  const [pasien, setPasien] = useState([])
  const [name, setName] = useState<string>()
  const [alamat, setAlamat] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [kepalaKeluarga, setKepalaKeluarga] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('L')

  const getAllData = () => {
    axios('https://apis-klinik.fanzru.dev/api/pasien')
      .then((res) => {
        setPasien(res.data.value[0].Data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  const addPasien = (e: any) => {
    e.preventDefault()

    const date = tanggalLahir ? new Date(tanggalLahir).toISOString() : ''

    console.log(jenisKelamin)

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
            <label className="btn btn-primary btn-sm" htmlFor={'my-modal'}>
              Tambah Data
            </label>
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
                  {pasien.map((data: any, i: number) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{data.NamaPasien}</td>
                        <td>{data.Alamat}</td>
                        <td>{data.TempatLahir}</td>
                        <td>{data.TanggalLahir.substring(0, 10)}</td>
                        <td>{data.NamaKepalaKeluarga}</td>
                        <td>
                          {data.JenisKelamin === 'L'
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
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
      <Modal title={'Tambah Data Pasien'} id={'my-modal'}>
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
            onChange={(e: any) => {
              setAlamat(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Tempat Lahir</LabelForm>
          <Input
            onChange={(e: any) => {
              setTempatLahir(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Tanggal Lahir</LabelForm>
          <input
            type="date"
            className="input input-bordered input-sm w-full"
            onChange={(e: any) => {
              setTanggalLahir(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Nama Kepala Keluarga</LabelForm>
          <Input
            onChange={(e: any) => {
              setKepalaKeluarga(e.target.value)
            }}
          />
        </Form>
        <Form>
          <LabelForm>Jenis Kelamin</LabelForm>
          <Select
            onChange={(e: any) => {
              setJenisKelamin(e.target.value)
            }}
            name="jenis_kelamin"
            defaultValue="L"
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
            <button className="btn btn-primary btn-sm" onClick={addPasien}>
              Tambah Data
            </button>
          </label>
        </ModalAction>
      </Modal>
    </>
  )
}

export default Home

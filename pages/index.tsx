import type { NextPage } from 'next'
import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import SectionTitle from '../components/SectionTitle'

const Home: NextPage = () => {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <Layout>
        <SectionTitle>Dashboard</SectionTitle>
      </Layout>
    </>
  )
}

export default Home

import Head from 'next/head'
import React, { ReactNode } from 'react'

const PageTitle = ({ children }: {children: ReactNode}) => {
  return (
    <Head>
      <title>Sisfo Klinik | {children}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  )
}

export default PageTitle
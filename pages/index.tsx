import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
  const [imgSrc, setImgSrc] = useState('')

  const handleChange = (e: any) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    fetch('/api/convert', { method: 'post', body: formData })
      .then((response) => response.blob())
      .then((myBlob) => {
        const objectURL = URL.createObjectURL(myBlob)
        setImgSrc(objectURL)
      })
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>2JPG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">HEIC to JPEG Convert</h1>
        <p className="mt-3 text-2xl">
          Choose any image and retrieve it as JPEG file.
        </p>
        <input accept="*" type="file" onChange={handleChange} />
        <img src={imgSrc} width="auto" height="auto" />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://github.com/thomaskokholm/imgsharp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Imgsharp
        </a>
      </footer>
    </div>
  )
}

export default Home

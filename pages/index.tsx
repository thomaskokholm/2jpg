import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState<string>('')

  const handleChange = (e: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    fetch('/api/convert', { method: 'post', body: formData })
      .then((response) => response.blob())
      .then((myBlob) => {
        const objectURL = URL.createObjectURL(myBlob)
        setLoading(false)
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
        <h1 className="text-6xl font-bold">Convert 2 JPEG</h1>

        {loading ? (
          <p className="mt-3 text-2xl">Processing...</p>
        ) : (
          <>
            <p className="mt-3 text-2xl">
              Choose any image file and retrieve it as JPEG.
            </p>
            <p className="mt-3">
              <input accept="*" type="file" onChange={handleChange} />
            </p>
          </>
        )}
        {imgSrc && <img src={imgSrc} width="auto" height="auto" />}
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

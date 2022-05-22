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
      .then((_myBlob) => {
        const objectURL = URL.createObjectURL(_myBlob)
        setLoading(false)
        setImgSrc(objectURL)
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>2JPG Converter</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ebc23a" />
        <meta name="msapplication-TileColor" content="#ebc23a" />
        <meta name="theme-color" content="#ebc23a" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Convert 2 JPEG</h1>

        {loading ? (
          <p className="mt-3">Processing...</p>
        ) : (
          <p className="mt-3">
            <div className="mb-3 w-96">
              <label
                htmlFor="formFile"
                className="form-label mb-2 inline-block text-gray-700"
              >
                Choose any image file and retrieve it as JPEG.
              </label>
              <input
                className="form-control
    m-0
    block
    w-full
    rounded
    border
    border-solid
    border-gray-300
    bg-white bg-clip-padding
    px-3 py-1.5 text-base
    font-normal
    text-gray-700
    transition
    ease-in-out
    focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                type="file"
                id="formFile"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </p>
        )}
        {imgSrc && (
          <>
            <a
              type="button"
              href={imgSrc}
              title={imgSrc}
              className="my-2 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            >
              Download
            </a>

            <img src={imgSrc} width="auto" height="auto" />

            <a
              type="button"
              href={imgSrc}
              title={imgSrc}
              className="my-2 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            >
              Download
            </a>
          </>
        )}
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

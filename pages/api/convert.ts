import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import multiparty from 'multiparty'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new multiparty.Form()
  return new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err })

      sharp(files.image[0].path)
        .jpeg({ quality: 100 })
        .toBuffer()
        .then((output) => {
          res.setHeader('Content-Type', 'image/jpeg')
          res.setHeader(
            'Content-Disposition',
            'attachment; filename=converted.jpeg'
          )
          res.status(200).send(output)
        })
        .catch((sharpErr) => {
          console.error('sharpErr', sharpErr)
          res.status(500).send('error')
        })

      resolve({ fields, files })
    })
  })
}

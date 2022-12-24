// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  users: {}
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    users: {
      little_7o7: {
        role: 'developer',
        password: 'developasdfasdfr'
      }
    }
  })
}

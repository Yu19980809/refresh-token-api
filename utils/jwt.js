import jwt from 'jsonwebtoken'

export const signAccessToken = userId => new Promise((resolve, reject) => {
  const payload = {}
  const secret = process.env.ACCESS_TOKEN_SECRET
  const options = {
    expiresIn: '15s',
    audience: userId.toString()
  }

  jwt.sign(payload, secret, options, (err, token) => {
    if (err) {
      console.log('Failed to sign accessToken', err)
      return reject({message: 'Failed to sign accessToken'})
    }

    resolve(token)
  })
})

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({message: 'Unauthorized'})
  }

  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return res.status(401).json({message})
      }

      req.payload = payload
      next()
    }
  )
}

export const signRefreshToken = userId => new Promise((resolve, reject) => {
  const payload = {}
  const secret = process.env.REFRESH_TOKEN_SECRET
  const options = {
    expiresIn: '7d',
    audience: userId.toString()
  }

  jwt.sign(payload, secret, options, (err, token) => {
    if (err) {
      console.log('Failed to sign refreshToken', err)
      return reject({message: 'Failed to sign refreshToken'})
    }

    resolve(token)
  })
})

export const verifyRefreshToken = refreshToken => new Promise((resolve, reject) => {
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, payload) => {
      if (err) return reject({message: 'Unauthorized'})
      const userId = payload.aud
      resolve(userId)
    }
  )
})

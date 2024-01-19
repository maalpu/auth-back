import express from 'express'
import getTokenFromHeader from '../auth/getTokenFromHeader.js'
import { verifyRefreshToken } from '../auth/verifyToken.js'
import { jsonResponse } from '../lib/jsonResponse.js'
import Token from '../schemas/token.js'
import { generateAccessToken, generateRefreshToken } from '../auth/generateTokens.js'

export const router = express.Router()

router.post("/", async (req, res) => {
  const refreshToken = getTokenFromHeader(req.headers)

  if (refreshToken) {
    try {
      const found = await Token.findOne({ token: refreshToken })
      if (!found) {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "Unauthorized" }))
      }

      const paiload = verifyRefreshToken(found.token)
      if (paiload) {
        const accessToken = generateAccessToken(paiload.user)
        return res.status(200).json(jsonResponse(200, { accessToken }))
      } else {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "Unauthorized" }))
      }
  
    } catch (error) {
      return res
          .status(401)
          .send(jsonResponse(401, { error: "Unauthorized" }))
    }
  } else {
    res.status(401).send(jsonResponse(401, { error: "Unauthorized" }))
  }
  res.send("refreshToken") 
})


// const router = require('express').Router()
// const getTokenFromHeader = require('../auth/getTokenFromHeader')
// const { verifyRefreshToken } = require('../auth/verifyToken')
// const { jsonResponse } = require('../lib/jsonResponse')
// const Token = require('../schemas/token')
// const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");

// router.post("/", async (req, res) => {
//   const refreshToken = getTokenFromHeader(req.headers)

//   if (refreshToken) {
//     try {
//       const found = await Token.findOne({ token: refreshToken })
//       if (!found) {
//         return res
//           .status(401)
//           .send(jsonResponse(401, { error: "Unauthorized" }))
//       }

//       const paiload = verifyRefreshToken(found.token)
//       if (paiload) {
//         const accessToken = generateAccessToken(paiload.user)
//         return res.status(200).json(jsonResponse(200, { accessToken }))
//       } else {
//         return res
//           .status(401)
//           .send(jsonResponse(401, { error: "Unauthorized" }))
//       }
  
//     } catch (error) {
//       return res
//           .status(401)
//           .send(jsonResponse(401, { error: "Unauthorized" }))
//     }
//   } else {
//     res.status(401).send(jsonResponse(401, { error: "Unauthorized" }))
//   }
//   res.send("refreshToken") 
// })

// module.exports = router

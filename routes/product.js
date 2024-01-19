import { jsonResponse } from '../lib/jsonResponse.js'
import express from 'express'

export const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json(jsonResponse(200, req.product))
})



// const { jsonResponse } = require('../lib/jsonResponse')

// const router = require('express').Router()

// router.get("/", (req, res) => {
//   res.status(200).json(jsonResponse(200, req.product))
// })

// module.exports = router
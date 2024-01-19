import express from 'express'

export const router = express.Router()

router.get("/", (req, res) => {
  res.send("signout")
})

// const router = require('express').Router()

// router.get("/", (req, res) => {
//   res.send("signout")
// })

// module.exports = router

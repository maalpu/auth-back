import express from 'express'

export const router = express.Router()

router.get("/", (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Juan Pérez',
      completed: false,
    },
  ])
})

// const router = require('express').Router()

// router.get("/", (req, res) => {
//   res.json([
//     {
//       id: '1',
//       title: 'Juan Pérez',
//       completed: false,
//     },
//   ])
// })

// module.exports = router
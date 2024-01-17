const router = require('express').Router()
const { jsonResponse } = require('../lib/jsonResponse')
const User = require('../schemas/user')

router.post("/", async (req, res) => {
  const {name, email, pass} = req.body

  if(!name || !email || !pass) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    )
  }

  try {
    // Control if email exists in DB
    const user = new User()
    const exists = await user.emailExists(email)

    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "User already exists",
        })
      )
    } else {
      // Create user in DB
      const user = new User({ name, email, pass })

      await user.save()

      res.json(
        jsonResponse(200, {
          message: "User created successfully",
        })
      )
    }

  } catch (error) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user",
      })
    )
  }
})

module.exports = router
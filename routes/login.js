const router = require('express').Router()
const { jsonResponse } = require('../lib/jsonResponse')
const User = require('../schemas/user')
const getUserInfo = require("../lib/getUserInfo")

router.post("/", async (req, res) => {
  const {email, pass} = req.body

  if(!!!email || !!!pass) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    )
  }

  const user = await User.findOne({ email })

  if (user) {
    const passOk = await user.comparePassword(pass, user.pass)

    // Authenticate User
    if (passOk) {
      const accessToken = user.createAccessToken()
      const refreshToken = await user.createRefreshToken()
    
      res
        .status(200)
        .json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }))
    
    } else {
      res.status(400).json(
        jsonResponse(400, {
          error: "User or password incorrect",
        })
      )
    }

  } else {
    res.status(400).json(
      jsonResponse(400, {
        error: "User not found",
      })
    )
  }
})

module.exports = router
const router = require('express').Router()
const { jsonResponse } = require('../lib/jsonResponse')
const Product = require('../schemas/product')

router.post("/product", async (req, res) => {
  const {name, pres, price1, price2} = req.paramsbody

  if(!name || !pres || !price1 || !price2) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    )
  }

  try {
    // Control if name exists in DB
    const product = new Product()
    const exists = await product.nameExists(name)

    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "Product already exists",
        })
      )
    } else {
      // Create product in DB
      const product = new Product({ name, pres, price1, price2 })

      await product.save()

      res.json(
        jsonResponse(200, {
          message: "Product created successfully",
        })
      )
    }

  } catch (error) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creating product",
      })
    )
  }
})

module.exports = router
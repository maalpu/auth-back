import mysql2 from 'mysql2'
import { generateAccessToken, generateRefreshToken } from '../auth/generateTokens.js'
import getProductInfo from '../auth/getProductInfo.js'
import Token from '../auth/token.js'

// const Mongoose = require("mongoose")
// const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens")
// const getProductInfo = require("../lib/getProductInfo")
// const Token = require("./token")

// const ProductSchema = new Mongoose.Schema({
//   id: { type: Object},
//   codbar: { type: String},
//   name: { type: String, required: true},
//   pres: { type: String, required: true},
//   detail: { type: String},
//   stock: { type: String},
//   stockMin: { type: Integer},
//   stockIdeal: { type: Integer},
//   imgSm: { type: String},
//   imgMd: { type: String},
//   imgLg: { type: String},
//   price1: { type: String, required: true},
//   price2: { type: String, required: true},
//   active: { type: Boolean},
// })

// ProductSchema.methods.nameExists = async function (name) {
//   const result = await Mongoose.model("Product").find({ name })
//   return result.length > 0
// }

// ProductSchema.methods.createAccessToken = async function () {
//   return generateAccessToken(getProductInfo(this))
// }

// ProductSchema.methods.createRefreshToken = async function () {
//   const refreshToken = generateRefreshToken(getProductInfo(this))
//   try {
//     await new Token({token: refreshToken}).save()
//     return refreshToken

//   } catch (error) {
//     console.log(error)
//   }
// }

// module.exports = Mongoose.model("Product", ProductSchema)
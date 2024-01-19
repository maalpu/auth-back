import { pool } from '../db/mysql.js'

export const getProduct = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id_prod = ?',[req.params.id])
  if (rows.length <= 0) return res.status(404).json({message: "product not found"})
  res.json(rows[0])
}

export const getProducts = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM products')
  res.json(rows)
}

export const createProduct = async (req, res) => {
  const {barcode, prod_name, measures, prod_type, id_categ, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active} = req.body
  const [rows] = await pool.query('INSERT INTO products(barcode, prod_name, measures, prod_type, id_categ, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[barcode, prod_name, measures, prod_type, id_categ, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active])
  res.send({
    id_prod: rows.insertId,
    barcode,
    prod_name,
    measures,
    prod_type,
    id_categ,
    detail,
    url_img1,
    url_img2,
    url_img3,
    url_img4,
    url_img5,
    price,
    destacade,
    active
  })
}

export const updateProduct = (req, res) => res.send('actualizando producto')

export const deleteProduct = async (req, res) => {
  const [result] = await pool.query('DELETE FROM products WHERE id_prod = ?',[req.params.id])
  if (result.affectedRows <= 0) {
    return res.status(404).json({message: "record not found"})
  }
  res.sendStatus(204)
}


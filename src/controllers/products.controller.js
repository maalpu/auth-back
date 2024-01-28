import { pool } from '../db/mysql.js'

export const getProduct = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id_prod = ?',[req.params.id])
    if (rows.length <= 0) return res.status(404).json({message: "product not found"})
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong - getProducts'})
  }
}

export const createProduct = async (req, res) => {
  try {
    const {barcode, prod_name, measures, prod_type, id_categ, stock, stock_min, stock_ideal, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active} = req.body
    const [rows] = await pool.query('INSERT INTO products(barcode, prod_name, measures, prod_type, id_categ, stock, stock_min, stock_ideal, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[barcode, prod_name, measures, prod_type, id_categ, stock, stock_min, stock_ideal, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active])
    res.send({
      id_prod: rows.insertId,
      barcode,
      prod_name,
      measures,
      prod_type,
      id_categ,
      stock, 
      stock_min, 
      stock_ideal, 
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
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong - createProduct'})
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {id} = req.params
    const {barcode, prod_name, measures, prod_type, id_categ, stock, stock_min, stock_ideal, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active} = req.body
    const [result] = await pool.query('UPDATE products SET barcode = ?, prod_name = ?, measures = ?, prod_type = ?, id_categ = ?, stock, stock_min, stock_ideal, detail = ?, url_img1 = ?, url_img2 = ?, url_img3 = ?, url_img4 = ?, url_img5 = ?, price = ?, destacade = ?, active = ? WHERE id_prod = ?', [barcode, prod_name, measures, prod_type, id_categ, detail, url_img1, url_img2, url_img3, url_img4, url_img5, price, destacade, active, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Invalid record'})
    const [rows] = await pool.query('SELECT * FROM products WHERE id_prod = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong - updateProduct - '+ error })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id_prod = ?',[req.params.id])
    if (result.affectedRows <= 0) {
      return res.status(404).json({message: "record not found"})
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong - deleteProduct'})
  }
}
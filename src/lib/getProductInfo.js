function getProductInfo(product) {
  return {
    id: product.id || product._id,
    codbar: product.codbar,
    name: product.name,
    pres: product.pres,
    detail: product.detail,
    stock: product.stock,
    stockMin: product.stockMin,
    stockIdeal: product.stockIdeal,
    imgSm: product.imgSm,
    imgMd: product.imgMd,
    imgLg: product.imgLg,
    price1: product.price1,
    price2: product.price2,
    active: product.active,
  }
}

module.exports = getProductInfo
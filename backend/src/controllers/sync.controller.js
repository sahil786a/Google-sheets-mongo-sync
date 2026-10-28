const Product = require('../models/Product');

const syncProduct = async (req, res) => {
  try {
    const { productId, name, sku, price, stock } = req.body;

    if (
      typeof productId !== 'string' ||
      !productId.trim() ||
      typeof name !== 'string' ||
      !name.trim() ||
      typeof sku !== 'string' ||
      !sku.trim() ||
      price === '' ||
      price === null ||
      price === undefined ||
      stock === '' ||
      stock === null ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'productId, name, sku, price and stock are required',
      });
    }

    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (
      !Number.isFinite(parsedPrice) ||
      !Number.isFinite(parsedStock) ||
      parsedPrice < 0 ||
      parsedStock < 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'price and stock must be valid non-negative numbers',
      });
    }

    const product = await Product.findOneAndUpdate(
      { productId: productId.trim() },
      {
        $set: {
          name: name.trim(),
          sku: sku.trim(),
          price: parsedPrice,
          stock: parsedStock,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Product synced successfully',
      data: product,
    });
  } catch (error) {
    console.error('Product sync failed:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Unable to sync product',
    });
  }
};

module.exports = { syncProduct };

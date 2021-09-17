// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Product, {
foreignKey: 'product_id'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tagged_products',
  foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
through: ProductTag,
as: 'product_tags',
foreignKey: 'tag_id'
});

// Product Tag
ProductTag.belongsTo(Product, {
  foreignKey: 'product_id'
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id'
});

Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id'
});

Product.hasMany(ProductTag, {
  foreignKey: 'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

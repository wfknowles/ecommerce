// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product & Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Product & Tag
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tags',
  foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
through: ProductTag,
as: 'products',
foreignKey: 'tag_id'
});

// Post.belongsToMany(User, {
//   through: Vote,
//   as: 'voted_posts',
//   foreignKey: 'post_id'
// });

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id'
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id'
});

Product.hasMany(ProductTag, {
  foreignKey: 'product_id'
});

Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id'
});

// Product Tag
// ProductTag.belongsTo(Product, {
//   foreignKey: 'product_id'
// });

// ProductTag.belongsTo(Tag, {
//   foreignKey: 'tag_id'
// });

// Tag.hasMany(ProductTag, {
//   foreignKey: 'tag_id'
// });

// Product.hasMany(ProductTag, {
//   foreignKey: 'product_id'
// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

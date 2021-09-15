// All Models
const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./ProductTag');

// Product belongs to Category, as a category can have multiple products but a product can only belong to one category.

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

// Category has many Product models.

Category.hasMany(Product, {
  foreignKey: 'product_id'
});

// Product belongs to many Tag models. 

Product.belongsToMany(Tag, {
    through: ProductTag,
    as: 'product_tags',
    foreignKey: 'product_id'
});

Product.hasMany(ProductTag, {
    foreignKey: 'product_id'
});

// Using the ProductTag through model, allow products to have multiple tags and tags to have many products.

ProductTag.belongsTo(Product, {
    foreignKey: 'product_id'
});

ProductTag.belongsTo(Tag, {
    foreignKey: 'tag_id'
});

// Tag belongs to many Product models.

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'product_tags',
  foreignKey: 'tag_id'
});

Tag.hasMany(ProductTag, {
    foreignKey: 'tag_id'
});

module.exports = { Category, Product, ProductTag, Tag };
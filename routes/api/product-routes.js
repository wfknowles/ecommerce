const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// findAll
router.get('/', (req, res) => {
    Product.findAll({
        include: [
            {
                model: Category
            },
            {
                model: Tag,
                as: 'tags'
            }
        ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// findOne
router.get('/:id', (req, res) => {
    Product.findOne({
      attributes: { exclude: ['category_id'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            {
                model: Tag,
                attributes: ['id', 'tag_name'],
                through: ProductTag,
                as: 'tags'
            }
        ]
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// create new product
router.post('/', (req, res) => {
    /* req.body should look like this...
        {
            product_name: "Basketball",
            price: 200.00,
            stock: 3,
            category_id: 1,
            tagIds: [1, 2, 3, 4]
        }
    */
    Product.create(req.body)
        .then(dbProductData => {
            // if there's product tags, we need to create pairings to bulk create in the ProductTag model
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: dbProductData.id,
                        tag_id,
                    };
                });

                ProductTag.bulkCreate(productTagIdArr);
                return dbProductData;
                
            }
            
            // if no product tags, just return
            return dbProductData;
        })
        .then(dbProductData => {
            // Return Created Product w/ Associations
            Product.findOne({
                attributes: { exclude: ['category_id'] },
                  where: {
                      id: dbProductData.id
                  },
                  include: [
                      {
                          model: Category,
                          attributes: ['id', 'category_name']
                      },
                      {
                          model: Tag,
                          attributes: ['id', 'tag_name'],
                          through: ProductTag,
                          as: 'tags'
                      }
                  ]
            })
            .then(dbProductData => {
                if (!dbProductData) {
                    res.status(404).json({ message: 'No product found with this id' });
                    return;
                }
                res.json(dbProductData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        })
        .catch((err) => {
        console.log(err);
        res.status(400).json(err);
        });
});

// update product
router.put('/:id', (req, res) => {
    // update product data
    Product.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        // find all associated tags from ProductTag
        return ProductTag.findAll({ 
            where: { product_id: req.params.id } 
        });
    })
    .then(dbProductTagData => {
        // get list of current tag_ids
        const productTagIds = dbProductTagData.map(({ tag_id }) => tag_id);

        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
                                    .filter((tag_id) => !productTagIds.includes(tag_id))
                                    .map((tag_id) => {
                                        return {
                                            product_id: req.params.id,
                                            tag_id,
                                        };
                                    });

        // figure out which ones to remove
        const productTagsToRemove = dbProductTagData
                                        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                                        .map(({ id }) => id);

        // run both actions
        return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);
    })
        .then(() => {
            // Return Updated Product w/ Associations
            Product.findOne({
                attributes: { exclude: ['category_id'] },
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'category_name']
                    },
                    {
                        model: Tag,
                        attributes: ['id', 'tag_name'],
                        through: ProductTag,
                        as: 'tags'
                    }
                ]
            })
            .then(dbProductData => {
                if (!dbProductData) {
                    res.status(404).json({ message: 'No product found with this id' });
                    return;
                }
                res.json(dbProductData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        })
        .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
        });
});

// destroy
router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

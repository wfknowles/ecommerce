const router = require('express').Router();
const { Category, Product } = require('../../models');

// findAll
router.get('/', (req, res) => {
    console.log('findAll', req, res);
    Category.findAll({
        include: { model: Product }
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// findOne
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: { model: Product}
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create
router.post('/', (req, res) => {
    // expects {category_name: 'Decor'}
    Category.create({
        category_name:  req.body.category_name
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
// });
// update
router.put('/:id', (req, res) => {
    // expects {product_name: 'Hammer', price: 10.99, stock: 10, category_id: ''}

    Category.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData[0]) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// destroy
router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbCategoryData => {
      if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
      }
      res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;

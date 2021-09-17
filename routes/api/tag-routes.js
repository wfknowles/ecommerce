const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });

// findAll
router.get('/', (req, res) => {
  Tag.findAll()
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// findOne
router.get('/:id', (req, res) => {
  Tag.findOne({
      where: {
          id: req.params.id
      },
      include: [
          {
              model: Product,
              attributes: ['product_name'],
              through: ProductTag,
              as: 'tagged_products'
          }
      ]
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// router.post('/', (req, res) => {
//   // create a new tag
// });

// create
router.post('/', (req, res) => {
  // expects {tag_name: 'Hand Tool'}
  Tag.create({
      tag_name:  req.body.tag_name
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

// update
router.put('/:id', (req, res) => {
  // expects {product_name: 'Hammer', price: 10.99, stock: 10, category_id: ''}

  // pass in req.body instead to only update what's passed through
  Tag.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData[0]) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

// destroy
router.delete('/:id', (req, res) => {
  Tag.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;

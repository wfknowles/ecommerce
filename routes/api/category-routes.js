const router = require('express').Router();
const { Category, Product } = require('../../models');

// router.get('/', (req, res) => {
//   // find all categories
//   // be sure to include its associated Products
// });

// findAll
router.get('/', (req, res) => {
  Category.findAll()
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// router.get('/:id', (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });
// findOne
router.get('/:id', (req, res) => {
  Category.findOne({
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No category found with this id' });
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
//   // create a new category
// });
// create
router.post('/', (req, res) => {
  // expects {tag_name: 'Hand Tool'}
  Category.create({
      tag_name:  req.body.tag_name
  })
  .then(dbUserData => res.json(dbUserData))
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

  // pass in req.body instead to only update what's passed through
  Category.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData[0]) {
          res.status(404).json({ message: 'No category found with this id' });
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
//   // delete a category by its `id` value
// });

// destroy
router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No category found with this id' });
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

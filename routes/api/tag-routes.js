const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// findAll
router.get('/', (req, res) => {
  Tag.findAll()
      .then(dbTagData => res.json(dbTagData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// findOne
router.get('/:id', (req, res) => {
  Tag.findOne({
      where: {
          id: req.params.id
      }
  })
  .then(dbTagData => {
      if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
      }
      res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// create
router.post('/', (req, res) => {
  // expects {tag_name: 'Hand Tool'}
  console.log('create', req.body);
  Tag.create({
      tag_name:  req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update
router.put('/:id', (req, res) => {
  // expects {tag_name: 'Hand Tool'}

  Tag.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
  })
  .then(dbTagData => {
      if (!dbTagData[0]) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
      }
      res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// destroy
router.delete('/:id', (req, res) => {
  Tag.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbTagData => {
      if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
      }
      res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;

var router = require('express').Router();
const offersCtrl = require('../controllers/offers');


router.delete('/:id', offersCtrl.delete);
router.get('/new', offersCtrl.new);
router.post('/', offersCtrl.create);
router.get('/', offersCtrl.index);
router.get('/:id', offersCtrl.show);
router.get('/:id/edit', offersCtrl.edit);
router.put('/:id', offersCtrl.update)


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
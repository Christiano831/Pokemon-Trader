var router = require('express').Router();
const commentsCtrl = require('../controllers/comments');


router.delete('/comments/:id', commentsCtrl.delete);
router.post('/offers/:id/comments', commentsCtrl.create);
router.get('/:id/edit', commentsCtrl.edit);
router.put('/comments/:id', commentsCtrl.update)


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
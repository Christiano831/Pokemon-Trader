var router = require('express').Router();
const requestsCommentsCtrl = require('../controllers/requestsComments');


router.delete('/requestComments/:id', requestsCommentsCtrl.delete);
router.post('/requests/:id/requestsComments', requestsCommentsCtrl.create);
router.get('/:id/edit', requestsCommentsCtrl.edit);
router.put('/requestComments/:id', requestsCommentsCtrl.update);


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
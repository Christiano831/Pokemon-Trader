const Offer = require('../models/offer');

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update: updateComment
}

function create(req, res) {
    Offer.findById(req.params.id, function(err, offer) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        offer.comments.push(req.body);
        offer.save(function(err) {
            res.redirect(`/offers/${offer._id}`);
        });
    });
}

function deleteComment(req, res){
    Offer.findOne(
        {'comments._id': req.params.id, 'comments.userId': req.user._id},
        function(err, offer) {
          if (!offer || err) return res.redirect(`/offers/${offer._id}`);
          offer.comments.remove(req.params.id);
          offer.save(function(err) {
            res.redirect(`/offers/${offer._id}`);
          });
        }
      );
}

function edit(req, res) {
  Offer.findOne({'comments._id': req.params.id}, function(err, offer) {
    const comment = offer.comments.id(req.params.id);
    res.render('comments/edit', {comment});
  });
}

function updateComment(req, res) {
  Offer.findOne({'comments._id': req.params.id}, function(err, offer) {
    const commentSubdoc = offer.comments.id(req.params.id);
    commentSubdoc.text = req.body.text;
    offer.save(function(err) {
      res.redirect(`/offers/${offer._id}`);
    });
  });
}
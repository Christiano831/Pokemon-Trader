const Offer = require('../models/offer');

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update: updateComment
}

function create(req, res) {
    Offer.findById(req.params.id, function(err, offer) {
        console.log(req.params.id, '<------------req.params')
        console.log(req.body, '<------------req.body')
        console.log(offer, '<------------- offer')
        console.log(offer.comments, '<------------- offer.comments')
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;
        offer.comments.push('HEeelooooo????');
        console.log(offer.comments, '<------------- offer.comments')
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
          // Remove the subdoc (https://mongoosejs.com/docs/subdocs.html)
          offer.comments.remove(req.params.id);
          // Save the updated offer
          offer.save(function(err) {
            // Redirect back to the offer's show view
            res.redirect(`/offers/${offer._id}`);
          });
        }
      );
}

function edit(req, res) {
      // Note the cool "dot" syntax to query on the property of a subdoc
  Offer.findOne({'comments._id': req.params.id}, function(err, offer) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const comment = offer.comments.id(req.params.id);
    // Render the comments/edit.ejs template, passing to it the comment
    res.render('comments/edit', {comment});
  });
}

function updateComment(req, res) {
      // Note the cool "dot" syntax to query on the property of a subdoc
  Offer.findOne({'comments._id': req.params.id}, function(err, offer) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const commentSubdoc = offer.comments.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/offers/${offer._id}`);
    // Update the text of the comment
    commentSubdoc.text = req.body.text;
    // Save the updated offer
    offer.save(function(err) {
      // Redirect back to the offer's show view
      res.redirect(`/offers/${offer._id}`);
    });
  });
}
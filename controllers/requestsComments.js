const Request = require('../models/request');

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update: updateComment
}

function create(req, res) {
    Request.findById(req.params.id, function(err, request) {
        console.log(req.params.id, '<------------req.params')
        console.log(req.body, '<------------req.body')
        console.log(offer, '<------------- offer')
        console.log(offer.comments, '<------------- offer.comments')
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        request.comments.push(req.body);
        console.log(offer.comments, '<------------- offer.comments')
        request.save(function(err) {
            console.log(err);
            console.log(offer, '<------------- offer');
            res.redirect(`/requests/${request._id}`);
        });
    });
}

function deleteComment(req, res){
    Request.findOne(
        {'comments._id': req.params.id, 'comments.userId': req.user._id},
        function(err, request) {
          if (!request || err) return res.redirect(`/requests/${request._id}`);
          // Remove the subdoc (https://mongoosejs.com/docs/subdocs.html)
          request.comments.remove(req.params.id);
          // Save the updated offer
          request.save(function(err) {
            // Redirect back to the offer's show view
            res.redirect(`/requests/${request._id}`);
          });
        }
      );
}

function edit(req, res) {
      // Note the cool "dot" syntax to query on the property of a subdoc
  Request.findOne({'comments._id': req.params.id}, function(err, request) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const comment = request.comments.id(req.params.id);
    // Render the comments/edit.ejs template, passing to it the comment
    res.render('comments/edit', {comment});
  });
}

function updateComment(req, res) {
      // Note the cool "dot" syntax to query on the property of a subdoc
  Request.findOne({'comments._id': req.params.id}, function(err, request) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const commentSubdoc = request.comments.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/requests/${request._id}`);
    // Update the text of the comment
    commentSubdoc.text = req.body.text;
    // Save the updated offer
    request.save(function(err) {
      // Redirect back to the offer's show view
      res.redirect(`/requests/${request._id}`);
    });
  });
}
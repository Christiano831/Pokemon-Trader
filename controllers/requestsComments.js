const Request = require('../models/request');

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update: updateComment
}

function create(req, res) {
    Request.findById(req.params.id, function(err, request) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        request.comments.push(req.body);
        request.save(function(err) {
            res.redirect(`/requests/${request._id}`);
        });
    });
}

function deleteComment(req, res){
    Request.findOne(
        {'comments._id': req.params.id, 'comments.userId': req.user._id},
        function(err, request) {
          if (!request || err) return res.redirect(`/requests/${request._id}`);
          request.comments.remove(req.params.id);
          request.save(function(err) {
            res.redirect(`/requests/${request._id}`);
          });
        }
      );
}

function edit(req, res) {
  Request.findOne({'comments._id': req.params.id}, function(err, request) {
    const comment = request.comments.id(req.params.id);
    res.render('comments/edit', {comment});
  });
}

function updateComment(req, res) {
  Request.findOne({'comments._id': req.params.id}, function(err, request) {
    const commentSubdoc = request.comments.id(req.params.id);
    commentSubdoc.text = req.body.text;
    request.save(function(err) {
      res.redirect(`/requests/${request._id}`);
    });
  });
}
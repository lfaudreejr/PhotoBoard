"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_funcs_1 = require("./comments-funcs");
function createComment(req, res, next) {
    const { body } = req;
    comments_funcs_1.saveComment(req.params.id, body)
        .then((doc) => res.json(doc))
        .catch((err) => next(err));
}
exports.createComment = createComment;
function getComment(req, res, next) {
    const { body } = req;
    comments_funcs_1.getCommentsForPin(req.params.id)
        .then((docs) => res.json(docs))
        .catch((err) => next(err));
}
exports.getComment = getComment;
function deleteComment(req, res, next) {
    console.log('id', req.params.id, 'comment', req.params.comment);
    comments_funcs_1.deleteCommentFromPin(req.params.id, req.params.comment)
        .then((doc) => res.json(doc))
        .catch((err) => next(err));
}
exports.deleteComment = deleteComment;

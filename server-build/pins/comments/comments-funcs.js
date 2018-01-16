"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../../services/mongoService");
const mongodb_1 = require("mongodb");
function saveComment(pinId, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const savedComment = yield mongoService_1.default.create(comment, 'comments');
        const saveCommentToPin = yield mongoService_1.default.update({ _id: new mongodb_1.ObjectID(pinId) }, 'pins', { $push: { comments: savedComment.ops[0] } });
        return saveCommentToPin.value;
    });
}
exports.saveComment = saveComment;
function getCommentsForPin(pinId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comments = yield mongoService_1.default.readOne({ _id: new mongodb_1.ObjectID(pinId) }, 'comments', {});
        return comments;
    });
}
exports.getCommentsForPin = getCommentsForPin;
function deleteCommentFromPin(pinId, commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const removeCommentIdFromPin = yield mongoService_1.default.update({ _id: new mongodb_1.ObjectID(pinId) }, 'pins', { $pull: { comments: { _id: new mongodb_1.ObjectID(commentId) } } });
        const deleteComment = yield mongoService_1.default.destroy({ _id: new mongodb_1.ObjectID(commentId) }, 'comments');
        return deleteComment.value;
    });
}
exports.deleteCommentFromPin = deleteCommentFromPin;

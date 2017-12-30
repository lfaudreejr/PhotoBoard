"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
const mongodb_1 = require("mongodb");
function getAllBoardsByOwner(owner) {
    return mongoService_1.default.readAll({ owner: owner }, 'boards', {});
}
exports.getAllBoardsByOwner = getAllBoardsByOwner;
function getABoardByTitleAndOwner(title, owner) {
    return mongoService_1.default.readOne({ title: title, owner: owner }, 'boards', {});
}
exports.getABoardByTitleAndOwner = getABoardByTitleAndOwner;
function saveBoard(board) {
    return mongoService_1.default.create(board, 'boards');
}
exports.saveBoard = saveBoard;
function addPinToBoard(pinId, id) {
    return mongoService_1.default.update({ _id: new mongodb_1.ObjectID(id) }, 'boards', { $push: { pins: pinId } });
}
exports.addPinToBoard = addPinToBoard;
function getBoardPins(pinId) {
    return mongoService_1.default.readOne({ _id: new mongodb_1.ObjectID(pinId) }, 'pins');
}
exports.getBoardPins = getBoardPins;

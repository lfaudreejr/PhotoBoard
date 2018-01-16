"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
const mongodb_1 = require("mongodb");
function savePin(pin) {
    return mongoService_1.default.create(pin, 'pins');
}
exports.savePin = savePin;
function getPins() {
    return mongoService_1.default.readAll({}, 'pins', {});
}
exports.getPins = getPins;
function getAPin(id) {
    return mongoService_1.default.readOne({ _id: new mongodb_1.ObjectID(id) }, 'pins');
}
exports.getAPin = getAPin;
function deletePinFromPins(id) {
    return mongoService_1.default.destroy({ _id: new mongodb_1.ObjectID(id) }, 'pins');
}
exports.deletePinFromPins = deletePinFromPins;
function deletePinFromUserBoard(userId, pinId) {
    return mongoService_1.default.update({ owner: userId }, 'boards', { $pull: { pins: new mongodb_1.ObjectID(pinId) } });
}
exports.deletePinFromUserBoard = deletePinFromUserBoard;
function updateAPinDescription(id, updateObj) {
    return mongoService_1.default.update({ _id: new mongodb_1.ObjectID(id) }, 'pins', { $set: updateObj });
}
exports.updateAPinDescription = updateAPinDescription;

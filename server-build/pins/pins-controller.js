"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pin_funcs_1 = require("./pin-funcs");
const board_funcs_1 = require("../boards/board-funcs");
function createPin(req, res, next) {
    pin_funcs_1.savePin({ url: req.body.pin.url, description: req.body.pin.description, uploaded_by: req.body.pin.uploaded_by, saved_by: req.body.pin.saved_by })
        .then((data) => {
        board_funcs_1.addPinToBoard(data.ops[0]._id, req.body.board._id)
            .then((data) => res.json(data))
            .catch((err) => next(err));
    })
        .catch((err) => next(err));
}
exports.createPin = createPin;
function getAllPins(req, res, next) {
    pin_funcs_1.getPins()
        .then((data) => res.json(data))
        .catch((err) => next(err));
}
exports.getAllPins = getAllPins;
function getPin(req, res, next) {
    pin_funcs_1.getAPin(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => next(err));
}
exports.getPin = getPin;
function deleteAPin(req, res, next) {
    Promise.all([pin_funcs_1.deletePinFromPins(req.params.id), pin_funcs_1.deletePinFromUserBoard(req.headers.profile, req.params.id)]).then((data) => res.json(data)).catch((err) => next(err));
}
exports.deleteAPin = deleteAPin;
function updatePin(req, res, next) {
    const { body } = req;
    pin_funcs_1.updateAPinDescription(req.params.id, body)
        .then((data) => res.json(data))
        .catch((err) => next(err));
}
exports.updatePin = updatePin;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pin_funcs_1 = require("./pin-funcs");
const board_funcs_1 = require("../boards/board-funcs");
function createPin(req, res) {
    pin_funcs_1.savePin({ url: req.body.pin.url, description: req.body.pin.description, uploaded_by: req.body.pin.uploaded_by, saved_by: req.body.pin.saved_by })
        .then((data) => {
        board_funcs_1.addPinToBoard(data.ops[0]._id, req.body.board._id)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    })
        .catch((err) => res.status(500).json(err.message));
}
exports.createPin = createPin;
function getAllPins(req, res) {
    pin_funcs_1.getPins()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err.message));
}
exports.getAllPins = getAllPins;
function getPin(req, res) {
    pin_funcs_1.getAPin(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err.message));
}
exports.getPin = getPin;
function deleteAPin(req, res) {
    Promise.all([pin_funcs_1.deletePinFromPins(req.params.id), pin_funcs_1.deletePinFromUserBoard(req.headers.profile, req.params.id)]).then((data) => res.json(data)).catch((err) => res.status(500).json(err.message));
}
exports.deleteAPin = deleteAPin;
function updatePin(req, res) {
    pin_funcs_1.updateAPin(req.params.id, req.body.description)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err.message));
}
exports.updatePin = updatePin;

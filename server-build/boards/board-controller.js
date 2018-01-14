"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_funcs_1 = require("../boards/board-funcs");
function createBoard(req, res, next) {
    board_funcs_1.saveBoard({
        title: req.body.title,
        pins: [],
        owner: req.body.owner
    })
        .then((data) => {
        const { ops } = data;
        return res.json(ops[0]);
    })
        .catch((err) => next(err));
}
exports.createBoard = createBoard;
function getBoard(req, res, next) {
    board_funcs_1.getABoardByTitleAndOwner(req.params.name, req.headers.profile)
        .then((data) => {
        let pinsPromises = [];
        data.pins.forEach((pin) => {
            pinsPromises.push(board_funcs_1.getBoardPins(pin));
        });
        Promise.all(pinsPromises).then((pinsData) => {
            data.pins = null;
            data.pins = pinsData;
            return res.json(data);
        })
            .catch((err) => next(err));
    })
        .catch((err) => next(err));
}
exports.getBoard = getBoard;
function updateBoard(req, res, next) {
    board_funcs_1.editBoard({ title: req.params.name }, { $set: { title: req.body.title } })
        .then((data) => res.json(data))
        .catch((err) => next(err));
}
exports.updateBoard = updateBoard;
function deleteBoard(req, res, next) {
    console.log('request', req.params);
    board_funcs_1.deleteABoard(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => next(err));
}
exports.deleteBoard = deleteBoard;

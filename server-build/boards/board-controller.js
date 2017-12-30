"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_funcs_1 = require("../boards/board-funcs");
function createBoard(req, res) {
    board_funcs_1.saveBoard({
        title: req.body.title,
        pins: [],
        owner: req.body.owner
    })
        .then((data) => {
        const { ops } = data;
        return res.json(ops[0]);
    })
        .catch((err) => res.status(500).json(err.message));
}
exports.createBoard = createBoard;
function getBoard(req, res) {
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
            .catch((err) => res.status(500).json(err.message));
    })
        .catch((err) => res.status(500).json(err.message));
}
exports.getBoard = getBoard;

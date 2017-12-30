"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_funcs_1 = require("../boards/board-funcs");
const user_funcs_1 = require("../users/user-funcs");
function getUser(req, res) {
    board_funcs_1.getAllBoardsByOwner(req.headers.profile)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err.message));
}
exports.getUser = getUser;
function createUser(req, res) {
    user_funcs_1.saveUser(req.body._id)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err.message));
}
exports.createUser = createUser;

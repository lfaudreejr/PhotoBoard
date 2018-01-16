"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_funcs_1 = require("../boards/board-funcs");
const user_funcs_1 = require("../users/user-funcs");
function getUser(req, res, next) {
    board_funcs_1.getAllBoardsByOwner(req.headers.profile)
        .then((data) => res.json(data))
        .catch((err) => next(err));
}
exports.getUser = getUser;
function createUser(req, res, next) {
    user_funcs_1.saveUser(req.body._id)
        .then((data) => res.json(data.ops[0]))
        .catch((err) => next(err));
}
exports.createUser = createUser;

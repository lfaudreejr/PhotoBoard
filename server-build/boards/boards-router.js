"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board = require("./board-controller");
const jwtCheck_1 = require("../middleware/jwtCheck");
const boardRouter = express_1.Router();
boardRouter.post('/', jwtCheck_1.default, board.createBoard);
boardRouter.get('/:name', jwtCheck_1.default, board.getBoard);
exports.default = boardRouter;

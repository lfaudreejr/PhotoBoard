"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtCheck_1 = require("../middleware/jwtCheck");
const user = require("./user-controller");
const userRouter = express_1.Router();
userRouter.get('/profile', jwtCheck_1.default, user.getUser);
userRouter.post('/profile', jwtCheck_1.default, user.createUser);
exports.default = userRouter;

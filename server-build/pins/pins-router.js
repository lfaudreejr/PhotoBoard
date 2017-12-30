"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pins = require("./pins-controller");
const jwtCheck_1 = require("../middleware/jwtCheck");
const pinsRouter = express_1.Router();
pinsRouter.post('/add', jwtCheck_1.default, pins.createPin);
pinsRouter.get('/all', pins.getAllPins);
pinsRouter.route('/:id')
    .get(pins.getPin)
    .put(jwtCheck_1.default, pins.updatePin)
    .delete(jwtCheck_1.default, pins.deleteAPin);
exports.default = pinsRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
function saveUser(user) {
    return mongoService_1.default.create({ _id: user }, 'users');
}
exports.saveUser = saveUser;

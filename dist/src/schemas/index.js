"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var contactSchema = joi_1.default.object({
    fullname: joi_1.default.string().required(),
    email: joi_1.default.string().email().optional(),
    phones: joi_1.default.array().items().min(1).required(),
});
exports.default = contactSchema;

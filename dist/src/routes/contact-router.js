"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var schema_middleware_1 = require("../middleware/schema-middleware");
var schemas_1 = __importDefault(require("../schemas"));
var contact_controller_1 = require("../controllers/contact-controller");
var contactRouter = (0, express_1.Router)();
contactRouter.get("/contacts", contact_controller_1.getContacts);
contactRouter.post("/contacts", (0, schema_middleware_1.validateSchema)(schemas_1.default), contact_controller_1.createContact);
exports.default = contactRouter;

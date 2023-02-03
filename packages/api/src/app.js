"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan = require("morgan");
exports.app = (0, express_1.default)();
exports.app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"));
exports.app.set("trust proxy", "loopback, linklocal, uniquelocal");
exports.app.use(express_1.default.json({ limit: "6mb" }));
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "form-action": ["'none'"],
        "style-src": ["'none'"],
        "font-src": ["'none'"]
    }
}));
const port = process.env.PORT || "8000";
exports.app.listen(port, () => {
    console.log(`server started at :${port}`);
});
//# sourceMappingURL=app.js.map
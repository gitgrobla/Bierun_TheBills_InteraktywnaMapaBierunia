"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const location_1 = __importDefault(require("./routes/location"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const whitelist = (_a = process.env.CORS_WHITELIST) === null || _a === void 0 ? void 0 : _a.split(";");
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist?.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true); //celowo na czas hackathonu ;)
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use(errorHandler_1.errorHandler);
app.use("/location", location_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

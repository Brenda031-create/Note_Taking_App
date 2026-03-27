"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '5000', 10);
app.use(express_1.default.json());
// Temporary test route — no external files needed
app.get('/test', (req, res) => {
    res.json({ message: 'Minimal server is alive' });
});
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});

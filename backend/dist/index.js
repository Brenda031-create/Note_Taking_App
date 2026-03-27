"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notes_1 = __importDefault(require("./routes/notes"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '5000', 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/notes', notes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'Backend is running' });
});
app.get('/test', (req, res) => {
    res.json({ message: 'Backend test route is alive' });
});
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});

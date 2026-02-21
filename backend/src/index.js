"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express"); // Add types for handler
var dotenv_1 = require("dotenv");
var notes_1 = require("./routes/notes");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = parseInt(process.env.PORT || '5000', 10);
app.use(express_1.default.json());
// Global error handler
app.use(function (err, req, res, next) {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
app.use('/api', notes_1.default);
app.listen(port, function () {
    console.log("Backend running on http://localhost:".concat(port));
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/notes.ts — minimal test version
const express_1 = require("express");
const router = (0, express_1.Router)();
// One dummy route to prove the file works
router.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Routes file is loaded and working' });
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
    joinedAt: { type: Date, required: true, default: () => new Date() },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
});
exports.default = (0, mongoose_1.model)('User', userSchema);

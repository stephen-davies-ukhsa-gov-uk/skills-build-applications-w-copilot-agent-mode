"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    subjectType: { type: String, required: true, enum: ['user', 'team'] },
    subject: { type: mongoose_1.Schema.Types.ObjectId, required: true, refPath: 'subjectType' },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);

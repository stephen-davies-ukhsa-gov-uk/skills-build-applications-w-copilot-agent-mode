"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/_health', (_req, res) => res.json({ status: 'ok' }));
app.use(`${config_1.API_BASE_PATH}/users`, users_1.default);
app.use(`${config_1.API_BASE_PATH}/teams`, teams_1.default);
app.use(`${config_1.API_BASE_PATH}/activities`, activities_1.default);
app.use(`${config_1.API_BASE_PATH}/leaderboard`, leaderboard_1.default);
app.use(`${config_1.API_BASE_PATH}/workouts`, workouts_1.default);
mongoose_1.default.connect(config_1.MONGO_URL)
    .then(() => {
    console.log('Connected to MongoDB');
    console.log('Codespaces-aware API URL:', config_1.CODESPACE_NAME ? `https://${config_1.CODESPACE_NAME}-8000.githubpreview.dev${config_1.API_BASE_PATH}` : `http://localhost:${config_1.PORT}${config_1.API_BASE_PATH}`);
    app.listen(config_1.PORT, () => {
        console.log(`Server listening on http://localhost:${config_1.PORT}`);
    });
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

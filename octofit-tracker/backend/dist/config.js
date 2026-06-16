"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = exports.API_BASE_PATH = exports.API_HOST = exports.CODESPACE_NAME = exports.MONGO_URL = exports.PORT = void 0;
exports.PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
exports.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
exports.CODESPACE_NAME = process.env.CODESPACE_NAME;
exports.API_HOST = exports.CODESPACE_NAME
    ? `https://${exports.CODESPACE_NAME}-8000.githubpreview.dev`
    : `http://localhost:${exports.PORT}`;
exports.API_BASE_PATH = '/api';
exports.API_URL = `${exports.API_HOST}${exports.API_BASE_PATH}`;

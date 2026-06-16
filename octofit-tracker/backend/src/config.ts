export const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
export const CODESPACE_NAME = process.env.CODESPACE_NAME;

export const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;

export const API_BASE_PATH = '/api';
export const API_URL = `${API_HOST}${API_BASE_PATH}`;

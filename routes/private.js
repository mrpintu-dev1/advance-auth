import express from "express";
import { getPrivateData } from './../controllers/private.js';
import { protect } from './../middlewares/auth.js';

const router = express.Router();

router.route('/').get(protect, getPrivateData);

export default router;
// src/routers/contacts.js

import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(patchContactController),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;

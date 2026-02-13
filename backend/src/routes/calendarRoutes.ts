import { Router } from 'express';
import { createEntry, getEntries, updateEntry, deleteEntry } from '../controllers/calendarController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', createEntry);
router.get('/', getEntries);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

export default router;

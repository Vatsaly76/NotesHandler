const router = require('express').Router();

const { protect } = require('../middleware/auth.middleware');

const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/notes.controller');

router.use(protect);

router.post('/', createNote);
router.get('/', getNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
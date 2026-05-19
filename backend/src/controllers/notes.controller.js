const Note = require('../models/note.model');

exports.createNote = async (req, res) => {
    try {
        const note = await Note.create({ ...req.body, user: req.user.id });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error creating note' });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const { search } = req.query;
        const filter = { user: req.user.id };
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }
        const notes = await Note.find(filter);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes' });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error updating note' });
    }
};


exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note' });
    }
};

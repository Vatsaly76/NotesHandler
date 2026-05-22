const Note = require('../models/note.model');

exports.createNote = async (req, res) => {
    try {
        const { title, content, tags, isPinned } = req.body;
        const note = await Note.create({
            title,
            content,
            tags:     tags     ?? [],
            isPinned: isPinned ?? false,
            user: req.user.id,
        });
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
                { title:   { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { tags:    { $regex: search, $options: 'i' } },
            ];
        }
        // Pinned notes first, then newest first
        const notes = await Note.find(filter).sort({ isPinned: -1, createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes' });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { title, content, tags, isPinned } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, content, tags, isPinned },
            { new: true, runValidators: true }
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
            return res.status(404).json({ message: 'Note not found' });;
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note' });
    }
};

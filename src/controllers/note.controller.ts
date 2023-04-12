import { NextFunction, Request, Response } from 'express'
import { ExpandedRequest } from '../middleware/auth'
import { validationResult } from 'express-validator'
import { INote, Notes } from '../models/notes'

export const getNotes = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await Notes.find({
      _userId: req.user?._id,
    })
    return res.status(200).send(notes)
  } catch (error) {
    return next(error)
  }
}
export const getNote = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const note = await Notes.findOne({
      _id: id,
    })
    if (!note) {
      return res.status(404).send('Note not found')
    }
    return res.status(200).send(note)
  } catch (error) {
    return next(error)
  }
}

export const createNotes = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body)
    const noteBody = req.body as INote
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    const note = await Notes.create({
      ...noteBody,
      created: new Date(),
      _userId: req.user?._id,
    })
    return res.status(200).send(note)
  } catch (error) {
    return next(error)
  }
}
export const updateNote = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body)

    const noteBody = req.body as INote
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    const note = await Notes.findByIdAndUpdate(req.params.id, {
      ...noteBody,
      updated: new Date(),
    })
    if (!note) {
      return res.status(400).send('Note not found')
    }

    return res.status(200).send(note)
  } catch (error) {
    return next(error)
  }
}

export const updateTitle = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    const note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(400).send('Note not found')
    }
    note.updated = new Date()
    note.title = req.body.title
    const savedNote = await note.save()

    return res.status(200).send(savedNote)
  } catch (error) {
    return next(error)
  }
}

export const deleteNote = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const note = await Notes.findOneAndDelete({ _id: id })
    if (!note) return res.status(404).send('Note not found')
    return res.status(204).send(note)
  } catch (error) {
    return next(error)
  }
}

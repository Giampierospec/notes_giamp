import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Heading from '../components/Heading'
import NoteForm from '../components/NoteForm'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useCallback } from 'react'
import { CreateNoteFormValues } from '../interfaces/note.interface'
import { createNote } from '../store/reducers/note.reducer'

const CreateNotePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { notes } = useAppSelector((state) => state.note)
  const navigate = useNavigate()
  const createNotes = useCallback(
    async (values: Partial<CreateNoteFormValues>) => {
      await dispatch(createNote(values))
      navigate('/')
    },
    [notes]
  )
  return (
    <Card>
      <Heading>Create Note</Heading>
      <NoteForm action="create" onSubmit={createNotes} />
    </Card>
  )
}
export default CreateNotePage

import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/Card'
import Heading from '../components/Heading'
import NoteForm from '../components/NoteForm'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useCallback, useEffect } from 'react'
import { CreateNoteFormValues } from '../interfaces/note.interface'
import { createNote, getNote, updateNote } from '../store/reducers/note.reducer'

const UpdateNotePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { notes, note } = useAppSelector((state) => state.note)
  const navigate = useNavigate()
  const { id } = useParams()
  const updateNotes = useCallback(
    async (values: Partial<CreateNoteFormValues>) => {
      await dispatch(updateNote(values))
      navigate('/')
    },
    [notes]
  )
  useEffect(() => {
    ;(async () => {
      dispatch(getNote(id ?? ''))
    })()
  }, [])
  return (
    <Card>
      <Heading>Update Note #{id}</Heading>
      <NoteForm
        action="update"
        note={note as CreateNoteFormValues}
        onSubmit={updateNotes}
      />
    </Card>
  )
}
export default UpdateNotePage

import { useEffect } from 'react'
import FlexDiv from '../components/FlexDiv'
import Heading from '../components/Heading'
import Note from '../components/Note'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getNotes } from '../store/reducers/note.reducer'
import CustomLink from '../components/CustomLink'
import CustomText from '../components/CustomText'
import CustomButton from '../components/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoadingComponent from '../components/LoadingComponent'

const NotesPage: React.FC = () => {
  const { notes, loading } = useAppSelector((state) => state.note)
  const dispatch = useAppDispatch()
  useEffect(() => {
    ;(async () => {
      await dispatch(getNotes())
    })()
  }, [])
  return (
    <FlexDiv direction="column" className="justify-center items-center py-10">
      <FlexDiv className="justify-between items-center">
        <Heading variant="h2">My Notes</Heading>
        <CustomLink variants="custom" to="/create-note">
          <CustomButton className="rounded-md">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </CustomButton>
        </CustomLink>
      </FlexDiv>
      {loading && !notes && <LoadingComponent />}
      {!loading && notes && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3   gap-4 justify-center">
          {notes?.map((note) => (
            <CustomLink
              variants="custom"
              to={`/note/${note._id}`}
              key={note._id}
            >
              <Note {...note} />
            </CustomLink>
          ))}
        </div>
      )}
    </FlexDiv>
  )
}

export default NotesPage

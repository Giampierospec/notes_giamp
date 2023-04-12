import { yupResolver } from '@hookform/resolvers/yup'
import { CreateNoteFormValues } from '../../interfaces/note.interface'
import { noteSchemaActions } from '../../validationSchema/note-schema'
import { useForm } from 'react-hook-form'
import FlexDiv from '../FlexDiv'
import CustomText from '../CustomText'
import CustomInput from '../CustomInput'

interface NoteFormProps {
  action: keyof typeof noteSchemaActions
  note?: CreateNoteFormValues
  onSubmit: (values: Partial<CreateNoteFormValues>) => void
}

const NoteForm: React.FC<NoteFormProps> = ({
  action = 'create',
  note,
  onSubmit,
}) => {
  const { handleSubmit, register } = useForm({
    defaultValues: { ...note },
    resolver: yupResolver(noteSchemaActions[action]),
  })

  return (
    <form onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
      <FlexDiv direction="column">
        <CustomText>Title</CustomText>
        <CustomInput {...register('title')} />
      </FlexDiv>
    </form>
  )
}

export default NoteForm

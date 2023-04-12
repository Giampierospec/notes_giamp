import { yupResolver } from '@hookform/resolvers/yup'
import { CreateNoteFormValues } from '../../interfaces/note.interface'
import { noteSchemaActions } from '../../validationSchema/note-schema'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import WYSIWYG from '../WYSIWYG'
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
  const { handleSubmit, register, control } = useForm({
    defaultValues: { ...note },
    resolver: yupResolver(noteSchemaActions[action]),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'arithmetics.numbers',
  })
  return (
    <form onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
      <FlexDiv direction="column">
        <CustomText>Title</CustomText>
        <CustomInput {...register('title')} />
      </FlexDiv>
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <FlexDiv direction="column">
            <CustomText>Content</CustomText>
            <WYSIWYG value={field.value ?? ''} onChange={field.onChange} />
          </FlexDiv>
        )}
      />
      <CustomText>Arithmetics</CustomText>
      {fields.map((field, index) => (
        <FlexDiv key={field.id} direction="column">
          <CustomText>Description</CustomText>
          <CustomInput
            type="number"
            {...register(`arithmetics.numbers.${index}.description`)}
          />
          <CustomText>Numbers</CustomText>
          <CustomInput
            type="number"
            {...register(`arithmetics.numbers.${index}.digits`)}
          />
        </FlexDiv>
      ))}
    </form>
  )
}

export default NoteForm

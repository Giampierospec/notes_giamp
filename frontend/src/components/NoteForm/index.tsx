import { yupResolver } from '@hookform/resolvers/yup'
import { CreateNoteFormValues } from '../../interfaces/note.interface'
import { noteSchemaActions } from '../../validationSchema/note-schema'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import WYSIWYG from '../WYSIWYG'
import FlexDiv from '../FlexDiv'
import CustomText from '../CustomText'
import CustomInput from '../CustomInput'
import ColorPicker from '../ColorPicker'
import CustomButton from '../CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...note },
    resolver: yupResolver(noteSchemaActions[action]),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'arithmetics.numbers',
  })
  return (
    <form
      onSubmit={handleSubmit(async (values) => await onSubmit(values))}
      className="flex flex-col gap-y-2"
    >
      <FlexDiv direction="column">
        <CustomText>Title</CustomText>
        <CustomInput {...register('title')} />
      </FlexDiv>
      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <FlexDiv className="justify-between items-center">
            <CustomText>Color</CustomText>
            <ColorPicker color={field.value ?? ''} setColor={field.onChange} />
          </FlexDiv>
        )}
      />
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
      <FlexDiv className="items-center justify-between">
        <CustomText>Arithmetics</CustomText>
        <CustomButton
          variant="secondary"
          className="rounded-md"
          type="button"
          onClick={() =>
            append({
              description: '',
              digits: 0,
            })
          }
        >
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </CustomButton>
      </FlexDiv>
      {fields.map((field, index) => (
        <FlexDiv key={field.id} direction="column">
          <CustomText>Description</CustomText>
          <CustomInput
            type="text"
            {...register(`arithmetics.numbers.${index}.description`)}
          />
          <CustomText>Numbers</CustomText>
          <CustomInput
            type="number"
            step={0.01}
            {...register(`arithmetics.numbers.${index}.digits`)}
          />
          <FlexDiv className="justify-end">
            <CustomButton
              variant="danger"
              className="rounded-md"
              onClick={() => remove(index)}
              type="button"
            >
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </CustomButton>
          </FlexDiv>
        </FlexDiv>
      ))}
      <CustomButton loading={isSubmitting} type="submit">
        Create
      </CustomButton>
    </form>
  )
}

export default NoteForm

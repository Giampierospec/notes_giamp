import * as Yup from 'yup'

const createSchema = Yup.object({
  title: Yup.string().required('Title is required'),
})

const updateSchema = Yup.object({
  _id: Yup.string().required('Id is required'),
  title: Yup.string().required('Title is required'),
})

const updateTitleSchema = Yup.object({
  title: Yup.string().required('Title is required'),
})

export const noteSchemaActions = {
  create: createSchema,
  update: updateSchema,
  updateTitle: updateTitleSchema,
}

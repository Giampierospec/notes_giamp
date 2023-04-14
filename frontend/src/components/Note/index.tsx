import React, { useCallback } from 'react'
import FlexDiv from '../FlexDiv'
import Heading from '../Heading'
import CustomText from '../CustomText'
import Card from '../Card'
import dayjs from 'dayjs'
import CustomLink from '../CustomLink'
import CustomButton from '../CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '../../store/hooks'
import { deleteNote } from '../../store/reducers/note.reducer'
interface NoteProps {
  _id: string
  title: string
  created?: Date
  updated?: Date
  color?: string
  arithmetics: {
    numbers: { description?: string; digits: number }[]
    total?: number
  }
  content?: string
}
const Note = React.forwardRef<
  HTMLDivElement,
  NoteProps & React.HTMLAttributes<HTMLDivElement>
>(
  ({
    _id,
    title,
    created,
    updated,
    color = '#FFF',
    arithmetics,
    content,
    ...rest
  }) => {
    const dispatch = useAppDispatch()
    const onDelete = useCallback(async () => {
      await dispatch(deleteNote(_id))
    }, [])
    return (
      <Card className={`bg-[${color}] ${rest.className}`}>
        <CustomText
          variant="custom"
          className="italic text-gray-400 text-sm flex justify-end"
        >
          {dayjs(created).format('MM/DD/YYYY')}
        </CustomText>
        <CustomLink variants="custom" to={`/update-note/${_id}`}>
          <Heading className="uppercase">{title}</Heading>
        </CustomLink>
        <CustomText variant="custom" className="italic text-gray-400 text-sm">
          updated: {dayjs(updated).format('MM/DD/YYYY hh:mm A Z')}
        </CustomText>
        {content && (
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {arithmetics?.numbers && arithmetics?.numbers?.length > 0 && (
          <>
            <Heading variant="h4">Arithmetics</Heading>
            <table className="table-auto border-spacing-2  border-collapse border border-slate-500">
              <thead>
                <tr className="bg-slate-600 text-white">
                  <th>Description</th>
                  <th>Numbers</th>
                </tr>
              </thead>
              <tbody>
                {arithmetics?.numbers?.map((x, i) => (
                  <tr key={i}>
                    <td className="border border-slate-600 px-2">
                      <CustomText>{x.description}</CustomText>
                    </td>
                    <td className="border border-slate-600 px-2">
                      <CustomText>{x.digits}</CustomText>
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-700 text-white">
                  <td className="border border-slate-600 px-2">
                    <CustomText variant="custom">Total:</CustomText>
                  </td>
                  <td className="border border-slate-600 px-2">
                    <CustomText variant="custom">
                      {arithmetics.total}
                    </CustomText>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        <FlexDiv className="justify-end">
          <CustomButton
            variant="danger"
            className="rounded-md"
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={['fas', 'trash']} />
          </CustomButton>
        </FlexDiv>
      </Card>
    )
  }
)

export default Note

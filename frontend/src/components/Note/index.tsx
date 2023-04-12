import React from 'react'
import FlexDiv from '../FlexDiv'
import Heading from '../Heading'
import CustomText from '../CustomText'
import Card from '../Card'
import dayjs from 'dayjs'
interface NoteProps {
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
    title,
    created,
    updated,
    color = '#FFF',
    arithmetics,
    content,
    ...rest
  }) => (
    <Card className={`bg-[${color}] ${rest.className}`}>
      <CustomText
        variant="custom"
        className="italic text-gray-400 text-sm flex justify-end"
      >
        {dayjs(created).format('MM/DD/YYYY')}
      </CustomText>
      <Heading className="uppercase">{title}</Heading>
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
                  <CustomText variant="custom">{arithmetics.total}</CustomText>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </Card>
  )
)

export default Note

import React from 'react'
import FlexDiv from '../FlexDiv'
import Heading from '../Heading'
import CustomText from '../CustomText'
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
    color = 'bg-white',
    arithmetics,
    content,
    ...rest
  }) => (
    <FlexDiv
      direction="column"
      className={`shadow-xl ${color} text-black font-medium rounded-lg p-10 w-256 ${rest.className}`}
    >
      <Heading className="uppercase">{title}</Heading>
      <CustomText variant="custom" className="italic text-gray-400 text-sm">
        updated: {updated?.toLocaleDateString()}
      </CustomText>
      {content && (
        <div
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <div className="grid gap-4 grid-cols-2">
        {arithmetics?.numbers?.map((x, i) => (
          <>
            <CustomText>{x.description}</CustomText>
            <CustomText>{x.digits}</CustomText>
          </>
        ))}
      </div>
      <CustomText>Total: {arithmetics?.total}</CustomText>
    </FlexDiv>
  )
)

export default Note

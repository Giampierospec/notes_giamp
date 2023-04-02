import React, { HtmlHTMLAttributes } from 'react'
import { flexDivDirectionMapper } from '../../mappers/div-mapper'

interface FlexDivProps {
  direction?: keyof typeof flexDivDirectionMapper
  children: React.ReactNode | React.ReactNode[]
}

const FlexDiv = React.forwardRef<
  HTMLDivElement,
  FlexDivProps & React.HTMLAttributes<HTMLDivElement>
>(({ children, direction = 'row', ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`flex ${flexDivDirectionMapper[direction] ?? ''} ${
      rest.className ?? ''
    }`}
  >
    {children}
  </div>
))

export default FlexDiv

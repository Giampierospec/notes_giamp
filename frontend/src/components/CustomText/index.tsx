import React from 'react'
import { customTextMapper } from '../../mappers/typography-mappers'

interface CustomTextProps {
  children: React.ReactNode
  variant?: keyof typeof customTextMapper
}
const CustomText: React.FC<
  CustomTextProps & React.HTMLAttributes<HTMLParagraphElement>
> = ({ children, variant = 'default', ...rest }) => {
  return (
    <p {...rest} className={`${customTextMapper[variant]} ${rest.className}`}>
      {children}
    </p>
  )
}

export default CustomText

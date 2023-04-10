import React from 'react'
const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`form-input  rounded-md focus:outline-none invalid:border-red-700 invalid:text-red-700 focus:invalid:ring-red-700 focus:invalid:border-red-700 disabled:opacity-75 read-only:bg-gray-500  ${
        props.className ?? ''
      }`}
    />
  )
})

export default CustomInput

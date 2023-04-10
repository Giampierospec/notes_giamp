import { Link, LinkProps } from 'react-router-dom'

interface CustomLinkProps extends LinkProps {
  isExternal?: boolean
  children: React.ReactNode | React.ReactNode[] | JSX.Element
}
const CustomLink: React.FC<
  CustomLinkProps & React.HTMLAttributes<HTMLAnchorElement>
> = ({ to, isExternal = false, children, ...rest }) => {
  if (isExternal)
    return (
      <a
        {...rest}
        className={`hover:underline hover:opacity-75 ${rest.className}`}
        target={'_blank'}
        href={to.toString()}
      >
        {children}
      </a>
    )
  return (
    <Link
      {...rest}
      to={to}
      className={`hover:underline hover:opacity-75 ${rest.className}`}
    >
      {children}
    </Link>
  )
}

export default CustomLink

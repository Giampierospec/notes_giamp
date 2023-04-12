import { Link, LinkProps } from 'react-router-dom'
import { LinkVariants } from '../../mappers/typography-mappers'

interface CustomLinkProps extends LinkProps {
  variants?: keyof typeof LinkVariants
  isExternal?: boolean
  children: React.ReactNode | React.ReactNode[] | JSX.Element
}
const CustomLink: React.FC<
  CustomLinkProps & React.HTMLAttributes<HTMLAnchorElement>
> = ({ to, isExternal = false, variants = 'default', children, ...rest }) => {
  if (isExternal) {
    return (
      <a
        {...rest}
        className={`${LinkVariants[variants]} ${rest.className}`}
        target={'_blank'}
        href={to.toString()}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      {...rest}
      to={to}
      className={`${LinkVariants[variants]} ${rest.className}`}
    >
      {children}
    </Link>
  )
}

export default CustomLink

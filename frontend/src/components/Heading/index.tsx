import { headerVariants } from '../../mappers/typography-mappers'

interface HeadingProps {
  variant?: keyof typeof headerVariants
  children?: React.ReactNode | React.ReactNode[]
}
const Heading: React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & HeadingProps
> = ({ children, variant = 'h2', ...rest }) => {
  return (
    <p
      {...rest}
      className={`font-mono font-bold ${headerVariants[variant]} ${rest.className}`}
    >
      {children}
    </p>
  )
}

export default Heading

import FlexDiv from '../FlexDiv'

interface CardProps {
  children: React.ReactNode | React.ReactNode[] | JSX.Element
}
const Card: React.FC<CardProps & React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <FlexDiv
      direction="column"
      {...rest}
      className={`w-[95vw] p-10 shadow-lg rounded-sm md:w-full shadow-stone-400 ${rest.className}`}
    >
      {children}
    </FlexDiv>
  )
}
export default Card

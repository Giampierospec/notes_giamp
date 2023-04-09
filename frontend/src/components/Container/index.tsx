interface ContainerProps {
  children: React.ReactNode
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full px-35  flex flex-col gap-y-5 justify-center items-center pt-10">
      {children}
    </div>
  )
}

export default Container

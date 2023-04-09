import React from 'react'
import Container from '../Container'
import Navbar from '../Navbar'

interface LayoutProps {
  children: React.ReactNode | JSX.Element | React.ReactNode[]
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  )
}

export default Layout

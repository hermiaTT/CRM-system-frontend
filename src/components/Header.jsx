import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const Header = ({pageHeader}) => {
  return (
    <Navbar className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">
        {/* <img
          alt=""
          src="src/asset/img/logo.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '} */}
        {pageHeader}
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Header
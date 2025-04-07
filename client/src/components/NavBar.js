import React from 'react';
import { FaSun, FaMoon, FaShareAlt, FaRegClock, FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

const NavBarComponent = () => {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  return (
    <Navbar className='w-100 bg-body-tertiary transition'>
      <Container fluid>
        <Navbar.Brand className='fs-2 fw-bold' href='https://www.wordhuntle.com'>wordhuntle</Navbar.Brand>
        <Nav className='fs-2'>
          <Button 
            variant='tertiary'
            className='nav-link bg-transparent' 
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </Button>
          <Button
            variant='tertiary'
            className='nav-link bg-transparent'
            onClick={() => dispatch(openModal('share'))}
          >
            <FaShareAlt />
          </Button>
          <Button
            variant='tertiary'
            className='nav-link bg-transparent'
            onClick={() => dispatch(openModal('history'))}
          >
            <FaRegClock />
          </Button>
          <Button
            variant='tertiary'
            className='nav-link bg-transparent'
            onClick={() => dispatch(openModal('info'))}
          >
            <FaInfoCircle />
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
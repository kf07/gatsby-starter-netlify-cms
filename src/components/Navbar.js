import React from 'react'
import {Link} from 'gatsby'
import github from '../img/github-icon.svg'
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Navbar = () => (
  <nav className="navbar is-transparent">
    <AppBar position="static">
      <Toolbar>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <Title>
                備忘録
              </Title>
            </Link>
            <div className="navbar-end">
              <a
                className="navbar-item"
                href="https://github.com/kf07"
                target="_blank"
                rel="noopener noreferrer"
              >
          <span className="icon">
            <img src={github} alt="Github"/>
          </span>
              </a>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  </nav>
)

const Title = styled.div`
  font-size: 28px;
  color: #fff;
`

export default Navbar

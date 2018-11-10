import React from 'react'
import {Link} from 'gatsby'
import github from '../img/github-icon.svg'
import styled from 'styled-components';

const Navbar = () => (
    <nav className="navbar is-transparent">
            <HeaderNav>
                <HeaderInner className="container">
                <Link to="/" className="navbar-item">
                    <Title>
                        備忘録
                    </Title>
                </Link>
                <NavList>
                    <NavItem>
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
                    </NavItem>
                </NavList>
                </HeaderInner>
            </HeaderNav>
    </nav>
)

const HeaderNav = styled.div`
  background-color: #3676e0;
`

const HeaderInner = styled.div`
    max-width: 960px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    align-items: center;
`

const NavList = styled.ul`
  display: flex;
`

const NavItem = styled.li`
  max-width: 30px;
`

const Title = styled.div`
  font-size: 28px;
  color: #fff;
`

export default Navbar

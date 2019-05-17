import * as React from 'react'
//@ts-ignore
import { PropTypes } from 'prop-types'
import * as styles from './../../scss/app.scss'
import { RouteComponentProps } from 'react-router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
const { Util
} = require('reactstrap')

interface HeaderProps extends RouteComponentProps<any> { }

Util.setGlobalCssModule(styles)

interface HeaderState {
    collapsed: boolean
}

class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: any) {
        super(props)
        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.state = {
            collapsed: true
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">Brewdog Beers</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/">Beers</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header

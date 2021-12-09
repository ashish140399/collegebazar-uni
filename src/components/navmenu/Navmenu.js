import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logoutUser} from '../../services/actions/authAction'
import './navmenu.css'
import { toast } from 'react-toastify'

const Navmenu = ({ isAuth, logoutUser }) => {

    const navbarWithoutLogin = <Nav className="ml-auto">
        <NavLink className="nav-link mx-2" to="/allads">All Ads</NavLink>
        <NavLink className="nav-link mx-2" to="/login">Login</NavLink>
        <NavLink className="nav-link mx-2" to="/register">Register</NavLink>
        <NavLink onClick={() => !isAuth && toast("Please log in")} className="btn btn-info mx-2" to="/sell" style={{backgroundColor:"#fff",color:"#000"}}>Sell Products</NavLink>
    </Nav>

    const navbarWithLogin = <Nav className="ml-auto">
        <NavLink className="nav-link mx-2" to="/profile">Profile</NavLink>
        <NavLink className="nav-link mx-2" to="/allads">All Ads</NavLink>
        <Link onClick={() => logoutUser()} to="/" className="nav-link mx-2">Log out</Link>
        <NavLink className="btn btn-info mx-2" to="/sell" style={{backgroundColor:"#fff",color:"#000"}}>Sell Products</NavLink>
    </Nav>

    return (
        <>
            <Navbar variant="dark" expand="md" style={{backgroundColor:"#2A6FD8"}}>
                <Container>
                    <NavLink className="navbar-brand" to="/">
                        <img src="img/logo-white.png" />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {isAuth ? navbarWithLogin : navbarWithoutLogin}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logoutUser})(Navmenu)

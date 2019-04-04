import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import styled, { css } from "styled-components";

const NavContainer = styled.div`
    align-items: center;
    background-color: #4abdac;
    display: flex;
    justify-content: flex-end;
    padding: 8px;
`;

const Nav = styled.nav`
    align-items: center;
    color: #FFFFFF
    display: flex;
    font-size: 18px;
    justify-content: flex-end;
    text-transform:
`;

const A = styled.a`
    color: #FFFFFF
    margin-right: 16px;
    text-decoration: none;
    letter-spacing: 1px;
`;

const Img = styled.img`
    max-width: 100%;
    height: 40px;
    border: 2px solid #ffffff;
    border-radius: 50%;
`;

class Header extends Component {
    renderNavContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <A href="/auth/google">Log in with Google</A>;
            default:
                return [
                    <A key="1">
                        <Payments />
                    </A>,
                    <A key="2">Credits: {this.props.auth.credits}</A>,
                    <A key="3" href="/api/logout">
                        Logout
                    </A>
                ];
        }
    }

    renderProfilePicture() {
        console.log(this.props.auth)
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return;
            default:
                return (
                    <Img
                        src={
                            this.props.auth
                                ? this.props.auth.googlePhotoUrl
                                : ""
                        }
                        alt="Profile picture"
                    />
                );
        }
    }
    render() {
        return (
            <NavContainer>
                <Nav>
                    {/* <Link
                        to={this.props.auth ? "/surveys" : "/"}
                        className="left brand-logo"
                    /> */}
                    {this.renderNavContent()}
                    {this.renderProfilePicture()}
                </Nav>
            </NavContainer>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);

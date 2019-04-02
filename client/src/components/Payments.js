import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";
import styled, { css } from "styled-components";

const Button = styled.button`
    font-size: 16px;
    background-color: #dfdce3;
    border: 0;
    border-radius: 2px;
    padding: 6px 8px;
    transition: all 0.2s;

    &:hover ${Button} {
        filter: brightness(90%);
    }
`;

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <Button className="btn">Add Credits</Button>
            </StripeCheckout>
        );
    }
}

export default connect(
    null,
    actions
)(Payments);

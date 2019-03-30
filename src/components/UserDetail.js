import React from 'react';
import PropTypes from "prop-types";
import getUserById from "../selectors"
import { connect } from 'react-redux'

class UserDetail extends React.Component {
    constructor() {
        super();
        this.state = {}
        
    }

    static propTypes = {
        user: PropTypes.object
    };

    render() {
        const { user } = this.props;
        
        if (!user) {
            return null;
        }
        return (
            <div className="user-detail">
                <div className="info-block">
                    {user.name}
                </div>
                <div className="info-block">
                    <i className={`fas fa-${user.sex}`}></i>
                </div>
                <div className="info-block">
                    {user.email}
                </div>
                <div className="info-block">
                    {user.number}
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps ) => {return { user: getUserById(state, ownProps.match.params.id) }}

export default connect(
    mapStateToProps
)(UserDetail);

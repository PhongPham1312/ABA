import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class MdalThuchi extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }


    componentDidMount() {
        
    }

    // xử lý nhập
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="Modalthuchinam">
                amqdj
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MdalThuchi));

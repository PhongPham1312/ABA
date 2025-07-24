import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import CommonUtils from '../../../../../utils/CommonUtils';

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang: '',
            onModal: false
        }
    }


     async componentDidMount() {
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })
    }


    render() {
        return (
            <div className="modal-phone">
                <div className='modal-container'>
                    <div className='header'>{this.props.header}</div>
                </div>
                
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./homeManage.scss"
import { withRouter } from 'react-router';
class homeManage extends Component {

    state = {

    }

    componentDidMount() {

    }

     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }


    render() {
        return (
            <div className="flex justify-content-center home">
                {/* log link */}
                <div className='home-container'>
                    <li onClick={() => this.gotolink('user-manage')}> <span><i className="fa fa-folder"></i>NGƯỜI DÙNG</span></li>
                    <li onClick={() => this.gotolink('kho-manage')}> <span><i className="fa fa-folder"></i>KHO HÀNG</span></li>
                    <li> <span><i className="fa fa-folder"></i>THU CHI</span></li>
                    <li> <span><i className="fa fa-folder"></i>KHO HÀNG</span></li>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(homeManage));

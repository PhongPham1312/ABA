import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from "../../store/actions";
import './Header.scss';

class Header extends Component {

    gotolink = (link) =>
    {
        console.log(`/system/${link}`)
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    render() {
        const { processLogout } = this.props;

        return (
            <div className='w70 header-content'>
                {/* phía trên */}
                <div className=' header-container text-black'>
                {/* menu */}
                <div className='menu-icon'> 
                    <i className="fas fa-home" onClick={() => this.gotolink('home')}></i>
                </div>

                {/* input search */}
                <div className='form-serch'>
                    <input type='text' 
                        placeholder='Nhập để tìm kiếm'
                    />
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" >
                    <i className="fas fa-user "></i>
                    <div className='menu-user'>
                        <li>Thông tin</li>
                        <li onClick={processLogout}>Đăng xuất</li>
                    </div>
                </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

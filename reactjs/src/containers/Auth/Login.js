import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
// import { userService } from '../../services/userService';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            showPassword: false,
            errMessage: ''
        }
    }

    // xu ly dang nhap
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // xu ly dang nhap
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {

            let data = await handleLoginApi(this.state.phone, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('loging success');
            }

        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            console.log('error message', e.response);
        }
    }

    // ẩn hiện mật khẩu
    handleShowHidePassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }


    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">

                        {/* Header đăng nhập */}
                        <div className="col-12 text-center login-title">ĐĂNG NHẬP</div>

                        {/* input phone */}
                        <div className="col-12 form-group">
                            <label>Điện thoại : </label>
                            <input
                                type="text"
                                className="form-control login-input"
                                placeholder="Nhập số điện thoại !"
                                value={this.state.phone}
                                name='phone'
                                id='phone'
                                onChange={this.handleInputChange}

                            />
                        </div>

                        {/* input password */}
                        <div className="col-12 form-group">
                            <label>Mật khẩu : </label>
                            <div className="login-password">
                                <input
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className="form-control login-input"
                                    placeholder="Nhập mật khẩu !"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    name='password'
                                    id='password'

                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.showPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        {/* btn đăng nhập */}
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };


};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

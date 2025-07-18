import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './UserManage.scss'
import {listnamelink} from '../../../utils/constant'

class MarkManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            name: '',
            phone: '',
            password: '',
            zalo: '',
            image_t: '',
            image_s: '',
            role: ''
        }
    }

    componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
    }

     // tìm namelink theo link
        timTenTheoLink = () => {
            const item = listnamelink.find(item => item.link === this.props.match?.url);
            return item ? item.name : null;
        };

     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    // thêm người dùng
    handleAddUser = () => {
        this.setState({
            modal: '1'
        })
    }

    // on off modal
    handleOnModal = () =>{
        this.setState({
           modal: !this.state.modal 
        })
    }

    // xử lý nhập
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let url = this.props.match.path === '/system/mark-manage' ? true : false;
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    <div className='m-2'><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('home')}></i> {this.state.linkName}</div>
                    {/* list user option */}
                    <div className='user-container'>
                        <ul>
                            <li onClick={() => this.gotolink('user-manage')} >NHÂN SỰ</li>
                            <li onClick={() => this.gotolink('mark-manage')} className={url === true ? 'li1' : ''}>SỈ DẮT MỐI</li>
                            <li onClick={() => this.gotolink('customer-manage')} className=''>KHÁCH HÀNG</li>
                        </ul>
                    </div>

                    {/* list user */}
                    <div className='list-user'>
                        <div>
                            <button className="btn-add-user" onClick={this.handleOnModal}>
                                <i className="fas fa-plus"></i> Thêm thành viên
                            </button>
                        </div>


                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkManage));

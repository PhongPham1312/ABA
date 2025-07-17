import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './UserManage.scss'
import {listnamelink} from '../../../utils/constant'
import { getAllUser } from '../../../services/userService';
import { isEmpty } from 'lodash';

class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            listUser: [],
        }
    }

    async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        await this.getalluser()
    }

    // get all user
    getalluser = async () => {
        let res = await getAllUser();
        if(res && res?.errCode === 0){
            this.setState({
                listUser: res.data
            })
        }
        else this.setState({
            listUser: []
        })
    }

    // viết tắt chức vụ
    vietTatChucVu = (chucVu) => {
        if (!chucVu) return '';

        const chuThuong = chucVu.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const tu = chuThuong.split(' ');

        const vietTat = tu.map(t => t[0]).join('') + ' _ ';
        return vietTat;
    };

    // tìm namelink theo link
    timTenTheoLink = () => {
        const item = listnamelink.find(item => item.link === this.props.match?.url);
        return item ? item.name : null;
    };

    // format phone
    formatPhone = (phone) => {
        if (!phone) return '';
        
        // Xóa tất cả ký tự không phải số
        const digits = phone.replace(/\D/g, '');

        // Tách thành nhóm 4 số
        const parts = digits.match(/.{1,4}/g);

        // Ghép các nhóm lại bằng dấu chấm
        return parts ? parts.join('.') : '';
    };

    // go to link
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
        let url = this.props.match.path === '/system/user-manage' ? true : false;
        let {listUser} = this.state
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    {/* list user option */}
                    <div className='user-container'>
                        <ul>
                            <li onClick={() => this.gotolink('user-manage')}  className={url === true ? 'li1' : ''} >NHÂN SỰ</li>
                            <li onClick={() => this.gotolink('mark-manage')}>SỈ DẮT MỐI</li>
                            <li onClick={() => this.gotolink('customer-manage')} className=''>KHÁCH HÀNG</li>
                        </ul>
                    </div>

                    {/*  */}
                    <div className='m-2 header'>
                        <span><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('home')}></i> {this.state.linkName}</span>
                        <button className="btn-add-user" onClick={this.handleOnModal}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    {/* list user */}
                    <div className='list-user'>
                        {listUser && !isEmpty(listUser) && listUser.map((item, index) => {
                            return (
                                <li className='list-user-item'>
                                    <span>{this.vietTatChucVu(item.positionUser.name)}{item.name} {' _ '} {this.formatPhone(item.phone)}</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </li>
                            )
                        })}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManage));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './UserManage.scss'
import {listnamelink} from '../../../utils/constant'
import { getAllUser, searchUser } from '../../../services/userService';
import { isEmpty } from 'lodash';
import ModalUser from './Modal/ModalUser';
import ModalLenLich from './Modal/ModalLenLich';
import ModalInfo from './Modal/ModalInfo';
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            listUser: [],
            onModal: false,
            header: '',
            user:'',
            onOption: false,
            onLenLich: false,
            onModalInfo: false,
            inputsearch: ''
        };
        this.optionRef = React.createRef(); // <- ref cho option
    }

    async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        document.addEventListener('click', this.handleClickOutside, true);
        await this.getalluser()
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = (event) => {
    if (this.optionRef.current && !this.optionRef.current.contains(event.target)) {
        this.setState({ onOption: false });
    }
};

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

    getalluserbykey = async (keyword) => {
        let res = await searchUser(keyword)
         if(res && res.users.errCode === 0){
            this.setState({
                listUser: res.users.data
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

    // xử lý nhập
    handleOnchangeInput = async (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        }, async () => {
            // Nếu name là inputsearch thì xử lý
            if (name === 'inputsearch') {
                if (value && value.trim() !== '') {
                    await this.getalluserbykey(value);
                } else {
                    await this.getalluser();
                }
            }
        });

    };



    onmodaluser = (type) => {
        this.setState({
            onModal: !this.state.onModal,
            header: type
        })
    }

    onBlurOption = () => {
        this.onOptionuser('')
    }

    onOptionuser = (item) => {
        this.setState(prevState => ({
            onOption: prevState.onOption === item ? null : item
        }));
    };

    onlenlich = (item)=> {
        this.setState({
            onLenLich: !this.state.onLenLich,
            user: item,
            onOption : ''
        })
    }

    onmodalinfo = (item) => {
        this.setState({
            onModalInfo: !this.state.onModalInfo,
            user: item,
            onOption : ''
        })
    }

    render() {
        let url = this.props.match.path === '/system/user-manage' ? true : false;
        let {listUser, onModal} = this.state
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
                        <div className='input-search'>
                                <input
                                    type='text'
                                    value={this.state.inputsearch}
                                    name='inputsearch'  // <-- sửa chỗ này
                                    onChange={(e) => this.handleOnchangeInput(e)} 
                                    placeholder='nhập để tìm kiếm ...'
                                />

                        </div>
                        <button className="btn-add-user" onClick={() => this.onmodaluser('THÊM NHÂN SỰ')}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    {/* list user */}
                    <div className='list-user'>
                        {listUser && !isEmpty(listUser) && listUser.map((item, index) => {
                            return (
                                <li className='list-user-item'>
                                    <span>{this.vietTatChucVu(item.positionUser.name)}{item.name} {' _ '} {this.formatPhone(item.phone)}</span>
                                    <i class="fa-solid fa-arrow-right" onClick={() => this.onOptionuser(item)}></i>
                                    {this.state.onOption === item && 
                                        <ul className='list-user-item-option' ref={this.optionRef}> 
                                            <li onClick={() => this.onlenlich(item)}><i class="fa-solid fa-calendar-days" ></i> lên lịch</li>
                                            <li onClick={() => this.onmodalinfo(item)}><i class="fa-solid fa-sack-dollar"></i> bảng lương</li>
                                        </ul>
                                    }
                                </li>
                            )
                        })}

                        {/* modal info */}
                        {this.state.onModalInfo === true && 
                            <ModalInfo 
                                onmodalinfo = {this.onmodalinfo}
                                user = {this.state.user}
                            />
                        }

                        {/* modal lên lich */}
                        {this.state.onLenLich === true &&
                            <ModalLenLich
                                user = {this.state.user}
                                onLenLich = {this.onlenlich}
                            />
                        }

                        {/* Modal add user */}
                        {onModal && onModal === true &&
                                <ModalUser 
                                    onmodaluser = {this.onmodaluser}
                                    header= {this.state?.header}
                                    getalluser= {this.getalluser}
                                />
                        }
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

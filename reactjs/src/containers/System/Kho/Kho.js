import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import Modal from './Modal';
import { getAll , deleteKho
 } from '../../../services/khoService';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { listnamelink } from '../../../utils/constant';

class Kho extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '...',
            modal: false,
            typeModal: '',
            listKho:[],
            linkName: ""
        }
    }


     async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        await this.getAll()
    }

    // tìm namelink theo link
        timTenTheoLink = () => {
            const item = listnamelink.find(item => item.link === this.props.match?.url);
            return item ? item.name : null;
        };

     gotolink = (link) =>
        {
        console.log(link)
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    handleOnModal = (type) => {
        this.setState({
            modal : !this.state.modal,
            typeModal: type
        })
    }

    // get all kho
    getAll = async() => {
        let res = await getAll();
        if (res && res.errCode === 0) {
                this.setState({
                    listKho: res.data
                })
            }
        else this.setState({
            listKho: []
        })
    }


    handleDelete = async (id) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn ẩn người dùng này không?");
        if (!confirm) return;

        try {
            const res = await deleteKho(id);
            if (res && res.errCode === 0) {
                toast.success("Đã xóa kho thành công!");
               await this.getAll(); // gọi lại hàm load danh sách
            } else {
                toast.error(res.errMessage || "xóa kho thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi hệ thống khi xóa kho");
        }
    }

    render() {
        let {listKho} = this.state
       
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    <div className='m-2'><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('home')}></i> {this.state.linkName}</div>

                    {/* list kho */}
                    <div className='list-user'>

                        {/* btn */}
                        <div>
                            <button className="btn-add-user" onClick={() => this.handleOnModal('THÊM KHO HÀNG')}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        {/* list */}
                        <div className='list-content'>
                            <ul>
                                {listKho && !isEmpty(listKho) && listKho.map((item, index) => {
                                    return (
                                        <li onClick={() => this.gotolink(`kho-manage-month/${item.id}`)}>
                                            <span><i className="fa-solid fa-folder"></i>
                                            {item.name}
                                            </span>
                                            <div className='close-kho'>
                                                <i class="fa-solid fa-circle-xmark" onClick={() => this.handleDelete(item.id)}></i>
                                            </div>
                                    </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* modal */}
                        {this.state.modal === true &&
                            <Modal typeModal={this.state.typeModal}
                            handleOnModal= {this.handleOnModal}
                            getAll = {this.getAll}
                            typekho = 'kho'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Kho));

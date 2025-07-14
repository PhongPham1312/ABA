import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './UserManage.scss'
import Select from 'react-select';
import CommonUtils from '../../../utils/CommonUtils';
import { createUser, getAllUser , 
    getAllPosition, deleteUser ,
    getAllJob
} from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {listnamelink} from '../../../utils/constant'
class UserManage extends Component {

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
            role: '',
            listPosition: [],
            selectedPosition: "",
            listJob: [],
            selectedJob: "",
            job: '',
            showMsg : '',
            hasZalo: true,
            listUser : [],
            linkName: ""
        }
    }

    async componentDidMount() {
        await this.getAllUser()
        this.setState({
            linkName: this.timTenTheoLink()
        })

    }

    // tìm namelink theo link
    timTenTheoLink = () => {
        const item = listnamelink.find(item => item.link === this.props.match?.url);
        return item ? item.name : null;
    };

    // get all user
    getAllUser = async () => {
        let res = await getAllUser();
        if (res && res.errCode === 0) {
                this.setState({
                    listUser: res.data
                })
            }
        else this.setState({
            listUser: []
        })
    }

    // check input phone zalo
    handleCheckboxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    // get all position
    getAllPosition = async() => {
        let res = await getAllPosition();
        let result = [];
        if (res && res.data) {
            res.data.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            })
        }

        this.setState({
            listPosition: result
        })
    }

    // get all job
    getAllJob = async() => {
        let res = await getAllJob();
        let result = [];
        if (res && res.data) {
            res.data.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            })
        }

        this.setState({
            listJob: result
        })

    }


    // onchange select
    handleChangeSelect = (selected, type) => {
        if (type === 'position') {
            this.setState({
                selectedPosition: selected,
                role: selected ? selected.value : ''
            });
        }

        if (type === 'job') {
            this.setState({
                selectedJob: selected,
                job: selected ? selected.value : ''
            });
        }
    };


     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    // change ảnh
    handleFileChange = (event, type) => {
    const file = event.target.files[0];
        if (file) {
            if (type === 'front') {
                this.setState({ frontFileName: file.name });
            } else if (type === 'back') {
                this.setState({ backFileName: file.name });
            }
        }
    }

    // on off modal
    handleOnModal = async () =>{
        await this.getAllPosition();
        await this.getAllJob();
        this.setState({
           modal: !this.state.modal 
        })
    }

    // xử lý nhập
    handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        this.setState(prevState => ({
            hasZalo: checked,
            zalo: checked ? prevState.phone : '' // nếu được check → lấy số phone, không thì xóa zalo
        }));
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // Nếu đang check "Số này có Zalo" thì gán luôn zalo = phone
            this.setState(prevState => ({
                phone: value,
                zalo: prevState.hasZalo ? value : prevState.zalo
            }));
        } else {
            this.setState({
                [name]: value
            });
        }
    };

    // check input value
    checkInputValue = () => {
        const { name, phone, zalo, selectedPosition } = this.state;

        if (!name || name.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập tên ! "
            })
            return false;
        }

        if (!zalo || zalo.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập zalo ! "
            })
            return false;
        }

        if (!phone || phone.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập số điện thoại ! "
            })
        }

        if (!zalo || zalo.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập vị trí ! "
            })
        }

        if (!selectedPosition) {
            this.setState({
                showMsg: "Vui lòng nhập tên ! "
            })
        }

        return true; // Tất cả đều hợp lệ
    }

    // get name
    getLastName = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.trim().split(/\s+/);
        return parts[parts.length - 1];
    };

    // bốn số cuối
    getLastFourDigits = (phoneNumber) => {
        if (!phoneNumber) return '';
        return phoneNumber.slice(-4);
    };

    // ghi tắt chức vụ
    generateShortCode = (text) => {
        if (!text) return '';
        // Tách từ, lấy chữ cái đầu tiên mỗi từ, viết thường
        const words = text.trim().split(/\s+/);
        const shortCode = words.map(word => word[0].toLowerCase()).join('');

        return shortCode + ' _ ';
    };

    // thêm người dùng
    handleAddUser = async () => {
        if(this.checkInputValue() === true) {
            let res = await createUser({
                name: this.state.name,
                phone: this.state.phone,
                password: this.getLastName(this.state.name)+this.getLastFourDigits(this.state.phone),
                zalo: this.state.zalo,
                image_t: this.state.image_t,
                image_s: this.state.image_s,
                role: this.state.role,
                job: this.state.job,
            })
            if (res && res.errCode === 0) {
                this.handleOnModal();
                await this.getAllUser();
                toast.success("Tạo nười dùng mới thành công!");
                this.setState({
                    name: '',
                    phone: '',
                    password: '',
                    zalo: '',
                    image_t: '',
                    image_s: '',
                    role: '',
                    job: '',
                })
                
            }
            else {
                this.handleOnModal();
                toast.error("Tạo người dùng mới không thành công!");
            }
        }
        
    }

    // onchange ảnh
    handleOnchangeImg = async (event, type) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            if (type === 'img-t') {
                this.setState({
                    image_t: base64,
                    frontFileName: file.name
                });
            } else if (type === 'img-s') {
                this.setState({
                    image_s: base64,
                    backFileName: file.name
                });
            }
        }
    };

    // delete user
     handleDeleteUser = async (id) => {
        if (!id) return;

        const confirm = window.confirm("Bạn có chắc chắn muốn ẩn người dùng này không?");
        if (!confirm) return;

        try {
            const res = await deleteUser(id);
            if (res && res.errCode === 0) {
                toast.success("Đã xóa người dùng thành công!");
               await this.getAllUser(); // gọi lại hàm load danh sách
            } else {
                toast.error(res.errMessage || "xóa người dùng thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi hệ thống khi xóa người dùng");
        }

     }


    render() {
        let url = this.props.match.path === '/system/user-manage' ? true : false;
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    <div className='m-2'><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('home')}></i> {this.state.linkName}</div>
                    {/* list user option */}
                    <div className='user-container'>
                        <ul>
                            <li onClick={() => this.gotolink('user-manage')} className={url === true ? 'li1' : ''}>NHÂN VIÊN</li>
                            <li onClick={() => this.gotolink('mark-manage')} className=''>SỈ DẮT MỐI</li>
                            <li onClick={() => this.gotolink('customer-manage')} className=''>KHÁCH HÀNG</li>
                        </ul>
                    </div>

                    {/* list user */}
                    <div className='list-user'>
                        <div>
                            <button className="btn-add-user" onClick={this.handleOnModal}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Điện thoại</th>
                                    <th scope="col">vị trí</th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listUser !== null && 
                                    this.state.listUser.map((item, index) => {
                                        return  (
                                            <tr>
                                                <th scope="row">{index+1}</th>
                                                <td>
                                                    {this.generateShortCode(item.positionUser?.name) + this.getLastName(item.name) }</td>
                                                <td>{item.phone}</td>
                                                <td>{item.jobUser?.name || ''}</td>
                                                <td>
                                                    <i className=" i1 fa-solid fa-info"></i>
                                                    <i className=" i2 fa-solid fa-pen"></i>
                                                    <i className=" i3 fa-solid fa-trash" 
                                                        onClick={() => this.handleDeleteUser(item.id)}
                                                    ></i>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    
                                }
                                
                            </tbody>
                            </table>


                    </div>

                    {/* modal */}
                    {this.state.modal === true && 
                        <div className='modal-user'>
                        <div className='modal-user-container'>
                            <div className='modal-content-ss'>

                                {/* close */}
                                <span className='close-modal' onClick={this.handleOnModal}>x</span>

                                <div className='modal-user-header'>THÊM THÀNH VIÊN</div>
                                
                                {/* form thông tin */}
                                <div className='form-info'>
                                    {/* name */}
                                    <div className='input-info'>
                                        <label>Tên  </label>
                                        <input type='text'
                                         placeholder='Nhập tên thành viên'
                                         name='name'
                                         id='name'
                                         value={this.state.name}
                                         onChange={this.handleInputChange}
                                         />
                                         
                                    </div>

                                    {/* phone */}
                                    <div className='input-info'>
                                        <label className='dt'>Điện thoại</label>
                                        <input type='text'
                                         placeholder='Nhập số điện thoại thành viên'
                                         name='phone'
                                         id='phone'
                                         value={this.state.phone}
                                         onChange={this.handleInputChange}
                                         />
                                    </div>
                                    <div className="input-check">
                                            <input
                                                type="checkbox"
                                                id="hasZalo"
                                                name="hasZalo"
                                                checked={this.state.hasZalo}
                                                onChange={this.handleCheckboxChange}
                                            />
                                            <label htmlFor="hasZalo">Số này có Zalo</label>
                                        </div>
                                </div>

                                <div className='form-info'>
                                    {/* zalo */}
                                    <div className='input-info'>
                                            <label>Zalo</label>
                                            <input
                                                type='text'
                                                placeholder='Nhập Zalo'
                                                name='zalo'
                                                id='zalo'
                                                value={this.state.zalo}
                                                onChange={this.handleInputChange}
                                                disabled={this.state.hasZalo} // ⛔ khóa khi đang check
                                            />
                                    </div>

                                    {/* chức vụ */}
                                    <div className='input-info mt-1'>
                                        <label>Chức vụ</label>
                                        <Select
                                            value={this.state.selectedPosition}
                                            onChange={(selected) => this.handleChangeSelect(selected, 'position')}
                                            options={this.state.listPosition}
                                            placeholder="Chọn chức vụ"
                                        />
                                    </div>

                                    {/* công việc */}
                                    <div className='input-info'>
                                        <label>Vị trí</label>
                                        <Select
                                            value={this.state.selectedJob}
                                            onChange={(selected) => this.handleChangeSelect(selected, 'job')}
                                            options={this.state.listJob}
                                            placeholder="Chọn vị trí"
                                        />
                                    </div>
                                </div>

                                {/* add cccd */}
                               <div className='add-cccd'>
                                    <div className='cccd-t'>
                                        <label>Ảnh mặt trước</label>
                                        <label htmlFor="upload-front" className="upload-icon">
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <input
                                            type="file"
                                            id="upload-front"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) => this.handleOnchangeImg(event, 'img-t')}
                                        />
                                        {this.state.frontFileName && (
                                            <span className="file-name">{this.state.frontFileName}</span>
                                        )}
                                    </div>

                                    <div className='cccd-s'>
                                        <label>Ảnh mặt sau</label>
                                        <label htmlFor="upload-back" className="upload-icon">
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <input
                                            type="file"
                                            id="upload-back"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) => this.handleOnchangeImg(event, 'img-s')}
                                        />
                                        {this.state.backFileName && (
                                            <span className="file-name">{this.state.backFileName}</span>
                                        )}
                                    </div>
                                </div>

                                {/* show error message */}
                                {this.state.showMsg !== null && 
                                    <div className='error-message'>
                                        {this.state.showMsg}
                                </div>
                                }

                                {/* btn */}
                                <div className='div-btn'>
                                    <button className="btn-add-user" 
                                    onClick={this.handleAddUser}>
                                         Thêm
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                    }
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

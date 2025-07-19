import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Select from 'react-select';
import { getAllPosition, getAllJob, createUser } from '../../../../services/userService';
import { toast } from 'react-toastify';

class ModalUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            phone: '',
            password: '',
            ListPosition: [],
            ListJob: [],
            selectPosition: '',
            selectJob: ''
        }
    }

    async componentDidMount() {
        await this.getalljob()
        await this.getallposition()
    }
    
     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    // position
    getallposition = async () => {
        let res = await getAllPosition();
        if(res && res?.errCode === 0){
            let options = res.data.map(item => ({
                label: item.name,
                value: item.id,
            }));
            this.setState({
                ListPosition: options
            })
        }
        else this.setState({
            ListPosition: []
        })
    }

    // job
    getalljob = async () => {
        let res = await getAllJob();
        if(res && res?.errCode === 0){
            let options = res.data.map(item => ({
                label: item.name,
                value: item.id,
            }));
            this.setState({
                ListJob: options
            })
        }
        else this.setState({
            ListJob: []
        })
    }


    // xử lý nhập
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Handle Select
    handleChangeSelect = (selectedOption, type) => {
        this.setState({
            [type]: selectedOption
        });
    }

    checkValue = () => {
        const { name, phone, selectJob, selectPosition } = this.state;
        if (!name) {
            window.confirm("Bạn chưa nhập tên!");
            return false;
        }
        if (!phone) {
            window.confirm("Bạn chưa nhập số điện thoại!");
            return false;
        }
        if (!selectPosition || !selectPosition.value) {
            window.confirm("Bạn chưa chọn chức vụ!");
            return false;
        }
        if (!selectJob || !selectJob.value) {
            window.confirm("Bạn chưa chọn vị trí!");
            return false;
        }
        return true;
    };

    // XỬ LÝ PASSWORD
    gopTenVaSoCuoi = (name, phone) => {
        if (!name || !phone) return '';
            // Lấy 4 số cuối từ phone (chỉ lấy số)
            const phoneDigits = phone.replace(/\D/g, '');
            const soCuoi = phoneDigits.slice(-4);
            return `${name}${soCuoi}`;
    };


    
    handleAdd = async () => {
        if(this.checkValue()){
            let res = await createUser({
                name: this.state.name,
                phone: this.state.phone,
                password: this.gopTenVaSoCuoi(this.state.name, this.state.phone),
                role: this.state.selectPosition.value,
                job: this.state.selectJob.value
            })

            if(res && res?.errCode === 0){
                toast.success('thêm thành công')
                this.props.onmodaluser('')
                await this.props.getalluser()
            }
            else{
                toast.error('thêm không thành công')
                this.props.onmodaluser('')
            }
        }
    }


    render() {
        return (
           <div className='modal-user'>
                       <div className='modal-user-add-container'>
                            <div className='close'><i class="fa-solid fa-circle-xmark" onClick={() => this.props.onmodaluser('')}></i></div>
                            <div className='header'>{this.props?.header}</div>

                            {/* form input name */}
                            <div className='modal-form-input'>
                                <label>tên</label>
                                <input type='text' name='name' id='name' 
                                onChange={this.handleInputChange}
                                />
                            </div>

                             {/* form input phone */}
                            <div className='modal-form-input'>
                                <label>điện thoại</label>
                                <input type='text' name='phone' id='phone' 
                                onChange={this.handleInputChange}
                                />
                            </div>

                             {/* form input phone */}
                            <div className='modal-form-input'>
                                <label>chức vụ</label>
                                <Select
                                    value={this.state.selectPosition}
                                    onChange={(option) => this.handleChangeSelect(option, 'selectPosition')}
                                    options={this.state.ListPosition}
                                    placeholder="Chọn chức vụ"
                                />
                            </div>

                            {/* form input phone */}
                            <div className='modal-form-input'>
                                <label>vị trí</label>
                                <Select
                                    value={this.state.selectJob}
                                    onChange={(option) => this.handleChangeSelect(option, 'selectJob')}
                                    options={this.state.ListJob}
                                    placeholder="Chọn vị trí"
                                />
                            </div>

                            {/* btn */}
                            <div className='btn-modal'>
                               <div onClick={this.handleAdd}>thêm</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalUser));

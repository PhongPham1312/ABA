import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Select from 'react-select';

class ModalUser extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }
    
    // check input phone zalo
    handleCheckboxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        });
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

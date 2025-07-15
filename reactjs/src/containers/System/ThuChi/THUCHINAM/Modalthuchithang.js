import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createThuchithang } from '../../../../services/thuchithang';
import { toast } from 'react-toastify';

class Modalthuchithang extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            parent: this.props?.match.params.id
        }
    }


    componentDidMount() {
        console.log( this.props?.match.params)
    }

    // xử lý nhập
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

     // Bấm Enter để thêm
    handleEnterPress = async (e) => {
        if (e.key === 'Enter') {
            await this.handleAdd();
        }
    };

    // Kiểm tra giá trị
    checkValue = () => {
        if (!this.state?.name?.trim()) {
            window.confirm("Thiếu tên thu chi!");
            return false;
        }
        return true;
    };

    // Gửi yêu cầu thêm
    handleAdd = async () => {
        if (this.checkValue() === true) {
            try {
                let res = await createThuchithang({
                    name: this.state.name.trim(),
                    parent: this.state.parent
                });

                if (res?.errCode === 0) {
                    toast.success("Thêm thành công");
                } else if (res?.errCode === 2) {
                    toast.error("Tên đã tồn tại");
                } else {
                    toast.error("Thêm thất bại");
                }

                if (this.props?.onModal) this.props.onModal('');
                if (this.props?.getallthuchi) this.props.getallthuchi();

            } catch (error) {
                toast.error("Lỗi khi thêm!");
                console.error(error);
            }
        }
    };

    render() {
        return (
            <div className="Modalthuchinam">
                <div className='Modalthuchinam-content'>
                    <div className='close'>
                        <i class="fa-solid fa-circle-xmark" 
                        onClick={()=> this.props?.onModal('')}
                        ></i>
                    </div>
                    <div className='heading'>
                        {this.props?.heading}
                    </div>

                    {/* form input */}
                    <div className='modal-input-form'>
                        <label>TÊN</label>
                        <input type='text' name="name"
                            value={this.state.name}
                            onKeyDown={this.handleEnterPress}
                            onChange={this.handleInputChange}
                            placeholder='THU CHI THÁNG ... '/>
                    </div>

                    
                {/* btn  */}
                <button className="modal-add">
                        <div className='add' onClick={this.handleAdd}>Thêm</div>
                    </button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modalthuchithang));

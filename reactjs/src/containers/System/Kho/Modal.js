import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import { create , createKho } from '../../../services/khoService';
import { toast } from 'react-toastify';


class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            typeModal: '',
            type: ''
        }
    }


    componentDidMount() {
        this.setState({
            typeModal: this.props.typeModal,
            type: this.props.typekho
        })
    }

    // onchang input
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value.toUpperCase()
        });
    };

    // add kho
    handleAdd = async() => {
        
        if(this.props.typekho === 'kho'){
            let res =await create({
                name: this.state.name
            })

            if(res.errCode === 1){
                toast.error("Thiếu tên kho !");
            }

            if(res.errCode === 2){
                toast.error("Tên kho đã tồn tại !");
            }

            if(res.errCode === 2){
                toast.error("Lỗi sever !");
            }

            if(res.errCode === 0){
                toast.success("Tạo kho hàng thành công !");
                await this.props.handleOnModal('')
                await this.props.getAll()
            }
        }

        if(this.props.typekho === 'khomonth'){
            let res =await createKho({
                name: this.state.name,
                parent: this.props.match.params?.id
            })

            if(res.errCode === 1){
                toast.error("Thiếu tên kho !");
            }

            if(res.errCode === 2){
                toast.error("Tên kho đã tồn tại !");
            }

            if(res.errCode === 2){
                toast.error("Lỗi sever !");
            }

            if(res.errCode === 0){
                toast.success("Tạo kho hàng thành công !");
                await this.props.handleOnModal('')
            }
        }
    }

    handleEnterPress = async (e) => {
        if (e.key === 'Enter') {
           await this.handleAdd(); // Gọi hàm xử lý khi Enter
        }
    };

    render() {
        let {typeModal} = this.state
        return (
          <div className='Modal'>
            <div className='modal-container'>
                {/* close modal */}

                <div className='close'>
                    <i class="fa-solid fa-circle-xmark" 
                    onClick={() => this.props.handleOnModal('')}
                    ></i>
                </div>

                {/* heading */}
                <div className='heading'>{typeModal}</div>

                {/* form input */}
                <div className='modal-input-form'>
                    <label>Tên Kho</label>
                    <input type='text' name="name"
                        value={this.state.name}
                        onKeyDown={this.handleEnterPress}
                        onChange={this.handleInputChange}
                        placeholder='Vui lòng nhập tên kho !'/>
                </div>

                {/* btn  */}
                <div>
                    <button className="modal-add">
                        <div className='add' onClick={this.handleAdd}>Thêm</div>
                    </button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));

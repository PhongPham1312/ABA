import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { handleCreateAS } from '../../../../services/userService';

class Modalthuchi extends Component {

    constructor(props){
        super(props);
        this.state = {
            money: '',
            content: '',
            ngay: ''
        }
    }


    async componentDidMount() {
        this.getTodayFormatted()
    }

    // get ngày tháng
    getTodayFormatted = () => {
        const today = new Date();
        const day = today.getDate();        // Lấy ngày (1–31)
        const month = today.getMonth() + 1; // Lấy tháng (0–11) nên phải +1
        this.setState({ngay: `${day}.${month}`})
    }; 

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
        if (!this.state?.money?.trim()) {
            window.confirm("thếu thu chi!");
            return false;
        }
        if (!this.state?.content?.trim()) {
            window.confirm("thiếu nội dung!");
            return false;
        }
        return true;
    };

    // Gửi yêu cầu thêm
    handleAdd = async () => {
        if(this.checkValue() === true ){
            let res  =   await handleCreateAS({
                content: this.state?.content,
                money: this.state?.money,
                ngay: this.state?.ngay
            })

            if(res.errCode === 0) {
                toast.success("thêm thành công")
                await this.props.getallthuchi()
                this.props.onModal()
            }
            else {
                toast.error("thêm không thành công")
                this.props.onModal()
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
                        <label>thu chi</label>
                        <input type='text' name="money"
                            value={this.state.money}
                            onKeyDown={this.handleEnterPress}
                            onChange={this.handleInputChange}
                            placeholder='THU CHI '/>
                    </div>
                    {/* form input */}
                    <div className='modal-input-form mt-1'>
                        <label>nội dung </label>
                        <input type='text' name="content"
                            value={this.state.content}
                            onKeyDown={this.handleEnterPress}
                            onChange={this.handleInputChange}
                            placeholder=' nội dung '/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modalthuchi));

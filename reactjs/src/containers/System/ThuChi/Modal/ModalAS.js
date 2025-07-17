import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createAS } from '../../../../services/sacombank';
import { createTM } from '../../../../services/tienmat';
import { toast } from 'react-toastify';

class ModalAS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngay: '',
            money: '',
            content: '',
            fullday: '',
            formatmoney: ''
        };
    }

    async componentDidMount() {
        this.getCurrentDateDotFormat();
    }

    // lấy ngày tháng năm
    getCurrentDateDotFormat = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        this.setState({
            fullday: `${day}.${month}.${year}`,
            ngay: `${day}.${month}`
        });
    };

    // định dạng giá tiền
    formatNumber = (value) => {
        if (!value && value !== 0) return '';

        // Chuyển về chuỗi, loại bỏ tất cả khoảng trắng
        const cleaned = String(value).replace(/\s/g, '');

        return cleaned;
    };

    // xử lý thay đổi input
    handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'formatmoney') {
            const raw = value.replace(/\s/g, ''); // chỉ loại khoảng trắng
            this.setState({
                [name]: value,
                money: raw
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    // kiểm tra trước khi gửi
    checkValue = () => {
        const { ngay, money, content, fullday } = this.state;

        if (!ngay || ngay.trim() === '') {
            alert('Vui lòng nhập ngày!');
            return false;
        }

        if (!content || content.trim() === '') {
            alert('Vui lòng nhập nội dung!');
            return false;
        }

        if (!money || money.trim() === '') {
            alert('Vui lòng nhập số tiền!');
            return false;
        }

        if (!fullday || fullday.trim() === '') {
            alert('Ngày đầy đủ không hợp lệ!');
            return false;
        }

        const isConfirmed = window.confirm('Bạn có chắc chắn muốn thêm khoản thu chi này?');
        if (!isConfirmed) return false;

        return true;
    };

    // nút thêm
    handleAdd = async () => {
        if (this.checkValue()){
            let res = this.props.type === 'as' ?  await createAS({
                content: this.state.content,
                money: this.state.money,
                ngay: this.state.fullday,
                link: ''
            }) : await createTM({
                content: this.state.content,
                money: this.state.money,
                ngay: this.state.fullday,
                link: ''
            })
            if (res?.errCode === 0) {
                    toast.success('Thêm thành công');
                    this.props.onModalAS('');
                    await this.props.getallthang(this.props.thang)
                } else {
                        toast.error('Thêm thất bại');
                }
        }
    };

    render() {
        return (
            <div className="modal-thuchi">
                <div className="modal-thuchi-container">
                    {/* header */}
                    <div className="close">
                        <i
                            className="fa-solid fa-circle-xmark"
                            onClick={() => this.props.onModalAS('')}
                        ></i>
                    </div>
                    <div className="header">{this.props.typeModal}</div>

                    {/* nội dung */}
                    <div className="modal-thuchi-form">
                        <label>ngày</label>
                        <input
                            type="text"
                            name="ngay"
                            value={this.state.ngay}
                            onChange={this.handleInputChange}
                            placeholder="nhập ngày"
                        />
                    </div>

                    <div className="modal-thuchi-form">
                        <label>nội dung</label>
                        <input
                            type="text"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleInputChange}
                            placeholder="nội dung thu chi"
                        />
                    </div>

                    <div className="modal-thuchi-form">
                        <label>thu chi</label>
                        <input
                            type="text"
                            name="formatmoney"
                            value={this.state.formatmoney}
                            onChange={this.handleInputChange}
                            placeholder="thu chi"
                        />
                    </div>

                    {/* nút */}
                    <button className="modal-add-thuchi" onClick={this.handleAdd}>
                        <div className="add">Thêm</div>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalAS));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import CommonUtils from '../../../utils/CommonUtils';

class ThuChi extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang:  '',
            onListnam:false,
            onListthang:false,
            onModalAS: false
        }
    }


    async componentDidMount() {
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })

    }

     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    
    // định dạng giá tiền
    formatNumber = (value) => {
        if (!value && value !== 0) return '';

        // Chuyển thành chuỗi, loại khoảng trắng
        const strVal = String(value).trim();

        // Kiểm tra có dấu âm không
        const isNegative = strVal.startsWith('-');

        // Lấy phần số (loại bỏ mọi ký tự không phải số)
        let cleaned = strVal.replace(/\D/g, '');
        if (!cleaned) return '';

        // Ép về số, thêm lại dấu nếu âm
        const num = Number(cleaned) * (isNegative ? -1 : 1);

        // Format số có dấu cách: 1 000, 200 000
        const formatted = Math.abs(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Thêm dấu "+" hoặc "-"
        return (num < 0 ? '- ' : '+ ') + formatted;
    };

    onlistnam = () => {
        this.setState({
            onListnam : !this.state.onListnam
        })
    }

    onlistthang = () => {
        this.setState({
            onListthang : !this.state.onListthang
        })
    }

    
    render() {
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                    {/* list năm */}
                    <div className='list-thuchi-folder'>
                        <div className='folder'><span>Thư mục</span> 
                        {this.state.onListnam === true ?
                            <i class="fa-solid fa-arrow-down" onClick={this.onlistnam}></i> : 
                            <i class="fa-solid fa-arrow-right" onClick={this.onlistnam}></i>}
                        </div>
                        {this.state.onListnam === true  &&
                         <ul className='list-fold'>
                            <li>
                                <div  className='li-content'> <span><i class="fa-solid fa-folder"></i>THU CHI NĂM 2025</span>
                                 {this.state.onListthang === true ?
                                <i class="fa-solid fa-arrow-down" onClick={this.onlistthang}></i> : 
                                <i class="fa-solid fa-arrow-right" onClick={this.onlistthang}></i>} </div>
                                
                                {this.state.onListthang === true &&
                                    <ul className='list-fold-content'>
                                        <li> <div  className='li-content'> <span><i class="fa-solid fa-folder"></i>THU CHI NĂM 2025</span> <i class="fa-solid fa-arrow-right"></i> </div>
                                            </li>
                                        <li><div  className='li-content'> <span><i class="fa-solid fa-folder"></i>THU CHI NĂM 2025</span> <i class="fa-solid fa-arrow-right"></i> </div>
                                            </li>
                                        <li><div  className='li-content'> <span><i class="fa-solid fa-folder"></i>THU CHI NĂM 2025</span> <i class="fa-solid fa-arrow-right"></i> </div>
                                            </li>
                                    </ul>
                                }
                                
                            </li>
                            {/*  */}
                            <li>
                                <div  className='li-content'> <span><i class="fa-solid fa-folder"></i>THU CHI NĂM 2025</span> <i class="fa-solid fa-arrow-right"></i> </div>
                            </li>
                            {/*  */}
                            <li>
                                <div  className='li-content'> <span><i class="fa-solid fa-folder"></i>THU CHI NĂM 2025</span> <i class="fa-solid fa-arrow-right"></i> </div>
                            </li>
                            {/*  */}
                            <li>
                                <div  className='li-content'> <span><i class="fa-solid fa-folder"></i>THU CHI NĂM 2025</span> <i class="fa-solid fa-arrow-right"></i> </div>
                            </li>
                        </ul>
                         }
                    </div>


                     {/* link name */}
                        <div className='header-thuchi'>
                           <span> <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`home`)}></i> THU CHI THÁNG {this.state.thang}</span>
                        </div>
                    
                    {/* list kho */}
                    <div className='list-user list-file'>
                        <ul>
                            <li> <span><i class="fa-solid fa-file-import"></i> THU CHI TM THÁNG {this.state.thang}</span></li>
                            <li onClick={() => this.gotolink(`thuchi-as`)}> <span><i class="fa-solid fa-file-import"></i> THU CHI AS THÁNG {this.state.thang}</span></li>
                            <li> <span><i class="fa-solid fa-file-import"></i> LƯƠNG PART TIME THÁNG {this.state.thang}</span></li>
                            <li> <span><i class="fa-solid fa-file-import"></i> LƯƠNG FULL TIME THÁNG {this.state.thang}</span></li>
                        </ul>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThuChi));

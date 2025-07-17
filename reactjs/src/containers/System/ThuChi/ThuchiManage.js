import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import CommonUtils from '../../../utils/CommonUtils';
import { getGroupByNgay } from '../../../services/sacombank';

class ThuChi extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang:  '',
            onListnam:false,
            onListthang:false,
            onModalAS: false,
            dataGroup : '',
            listNamThang: [],
            onListthangfile: false
        }
    }


    async componentDidMount() {
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })
        await this.getGroupByNgays()

    }

    getGroupByNgays = async () => {
    try {
        let res = await getGroupByNgay(); // gọi service
        if (res && res.errCode === 0) {
            const data = res.data;

            // Nếu đây là object rỗng => không có dữ liệu
            if (!data || Object.keys(data).length === 0) return;

            const years = Object.keys(data); // ['2024', '2025']
            const yearList = years.map(year => {
                const months = Object.keys(data[year]); // ví dụ ['7', '8']
                return {
                    year,
                    months
                };
            });

            this.setState({
                dataGroup: data,
                listNamThang: yearList
            });
        }
    } catch (e) {
        console.error('Lỗi getGroupByNgay:', e);
    }
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

    onlistthang = (year) => {
        this.setState(prev => ({
            onListthang: prev.onListthang === year ? '' : year
        }));
    }

    onlistthangfile = (mounth) => {
        this.setState(prev => ({
            onListthangfile: prev.onListthangfile === mounth ? '' : mounth
        }));
    }
    
    render() {
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                    {/* list năm */}
                    <div className='list-thuchi-folder'>
                        <div className='folder'>
                            <span>Thư mục</span>
                            {this.state.onListnam
                            ? <i className="fa-solid fa-arrow-down" onClick={this.onlistnam}></i>
                            : <i className="fa-solid fa-arrow-right" onClick={this.onlistnam}></i>}
                        </div>

                        {this.state.onListnam && (
                            <ul className='list-fold'>
                            {this.state.listNamThang?.map((item, idx) => (
                                <li key={idx}>
                                <div className='li-content'>
                                    <span>
                                    <i className="fa-solid fa-folder"></i> THU CHI NĂM {item.year}
                                    </span>
                                    {this.state.onListthang === item.year ? (
                                    <i className="fa-solid fa-arrow-down" onClick={() => this.onlistthang(item.year)}></i>
                                    ) : (
                                    <i className="fa-solid fa-arrow-right" onClick={() => this.onlistthang(item.year)}></i>
                                    )}
                                </div>

                                {this.state.onListthang === item.year && (
                                    <ul className='list-fold-content'>
                                        {item.months.map((thang, idx2) => (
                                        <li key={idx2}>
                                            <div className='li-content'>
                                            <span><i className="fa-solid fa-folder"></i> THÁNG {thang}</span>
                                            <i className="fa-solid fa-arrow-right" onClick={() =>this.onlistthangfile(thang)}></i>
                                            </div>

                                            {this.state.onListthangfile === thang && 
                                                <ul className='li-content-list-file'>
                                                    <li onClick={() => this.gotolink(`thuchi-tm/${thang}`)}> <span><i class="fa-solid fa-file-import"></i> THU CHI TM THÁNG {thang}</span></li>
                                                    <li onClick={() => this.gotolink(`thuchi-as/${thang}`)}> <span><i class="fa-solid fa-file-import"></i> THU CHI AS THÁNG {thang}</span></li>
                                                    <li> <span><i class="fa-solid fa-file-import"></i> LƯƠNG PART TIME THÁNG {thang}</span></li>
                                                    <li> <span><i class="fa-solid fa-file-import"></i> LƯƠNG FULL TIME THÁNG {thang}</span></li>
                                            </ul>
                                            }
                                        </li>
                                        ))}
                                    </ul>
                                    )}
                                </li>
                            ))}
                            </ul>
                        )}
                    </div>


                     {/* link name */}
                        <div className='header-thuchi'>
                           <span> <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`home`)}></i> THU CHI THÁNG {this.state.thang}</span>
                        </div>
                    
                    {/* list kho */}
                    <div className='list-user list-file'>
                        <ul>
                            <li onClick={() => this.gotolink(`thuchi-tm/${this.state.thang}`)}> <span><i class="fa-solid fa-file-import"></i> THU CHI TM THÁNG {this.state.thang}</span></li>
                            <li onClick={() => this.gotolink(`thuchi-as/${this.state.thang}`)}> <span><i class="fa-solid fa-file-import"></i> THU CHI AS THÁNG {this.state.thang}</span></li>
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

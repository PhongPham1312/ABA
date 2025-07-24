import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { listnamelink } from '../../../utils/constant';
import { getGroupByDateService } from '../../../services/donService';
import CommonUtils from '../../../utils/CommonUtils';
import './Khomanage.scss'

class Kho extends Component {

    constructor(props){
        super(props);
        this.state = {
            linkName: "",
            listnam: [],
            onListthang:'',
            onListFile: '',
            Folder: false,
            thang: ''
        }
    }


     async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })
        await this.getalldon()
        
    }

    getalldon = async () => {
        let res = await getGroupByDateService();
        if(res && res.errCode === 0){
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
                listnam: yearList
            })
        }
        else this.setState({
            listnam: []
        })
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

     onlistthang = (year) => {
        this.setState(prev => ({
            onListthang: prev.onListthang === year ? '' : year
        }));
    }

    onlistfile = (year) => {
        this.setState(prev => ({
            onListFile: prev.onListFile === year ? '' : year
        }));
    }

    onfolder = () => {
        this.setState({
            Folder: !this.state.Folder
        })
    }
  


    render() {
       let {listnam} = this.state
       console.log(listnam)
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    <div className='m-2 header'>
                        <span><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('home')}></i> {this.state.linkName}</span>
                         <div className='input-search'>
                                <input
                                    type='text'
                                    value={this.state.inputsearch}
                                    name='inputsearch'  // <-- sửa chỗ này
                                    onChange={(e) => this.handleOnchangeInput(e)} 
                                    placeholder='nhập để tìm kiếm ...'
                                />

                        </div>
                        <button className="btn-add-user" onClick={() => this.handleOnModal('THÊM KHO HÀNG')}><i className="fas fa-plus"></i> </button>
                    </div>

                    {/* list kho */}
                    <div className='list-user'>
                        <div  className='thumuc'>
                            <span>THƯ MỤC</span>
                            <span onClick={this.onfolder}>{this.state.Folder === true ? <i class="fa-solid fa-arrow-down"></i> : <i class="fa-solid fa-arrow-right"></i> } </span>
                        </div>

                        {/*  */}
                        {this.state.Folder === true && 
                            this.state.listnam && !isEmpty(this.state.listnam)
                                && this.state.listnam.map((item, index) => {
                                    return (
                                        <li className='list-kho-item'>
                                            <div className='list-kho-item-content'>
                                                <span onClick={() =>this.onlistthang(item.year)} ><i class="fa-solid fa-folder"></i> <span>{`KHO HÀNG THÁNG ${item.year}`}</span></span>
                                            {this.state.onListthang === item.year ? <i class="fa-solid fa-arrow-down"></i> : <i class="fa-solid fa-arrow-right"></i> } 
                                            </div>
                                            {this.state.onListthang === item.year &&
                                                <ul className='list-kho-thang'>
                                                {item.months.map((mouth, indexmounth) => {
                                                    return(
                                                        <li>
                                                            <div className='list-kho-item-content'>
                                                                <span onClick={() =>this.onlistfile(mouth)}><i class="fa-solid fa-folder"></i> <span >{`KHO HÀNG THÁNG ${mouth}`}</span></span>
                                                                {this.state.onListFile === mouth ? <i class="fa-solid fa-arrow-down"></i> : <i class="fa-solid fa-arrow-right"></i> } 
                                                            </div>
                                                            {this.state.onListFile === mouth && 
                                                                <ul>
                                                                    <li> <span><i class="fa-solid fa-file-import"></i> PHONE THÁNG {mouth}</span></li>
                                                                    <li> <span><i class="fa-solid fa-file-import"></i> SỬA , THAY THÁNG {mouth}</span></li>
                                                                    <li> <span><i class="fa-solid fa-file-import"></i> CẦM THÁNG {mouth}</span></li>
                                                                    <li> <span><i class="fa-solid fa-file-import"></i> XÁC THÁNG {mouth}</span></li>
                                                                    <li> <span><i class="fa-solid fa-file-import"></i> DỌN THÁNG {mouth}</span></li>
                                                                </ul>
                                                            }
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            }
                                        </li>
                                    )
                        })}

                        {/*  */}
                        <div className='thumuc'>
                            <span>KHO HÀNG THÁNG {this.state.thang}</span>
                        </div>
                        <ul className='list-file-thang'>
                            <li  onClick={() => this.gotolink(`don/${this.state.thang}`)}> <span><i class="fa-solid fa-file-import"></i> PHONE THÁNG {this.state.thang}</span></li>
                            <li  onClick={() => this.gotolink(`don/${this.state.thang}`)}> <span><i class="fa-solid fa-file-import"></i> SỬA , THAY THÁNG {this.state.thang}</span></li>
                            <li  onClick={() => this.gotolink(`don/${this.state.thang}`)}> <span><i class="fa-solid fa-file-import"></i> CẦM THÁNG {this.state.thang}</span></li>
                            <li  onClick={() => this.gotolink(`don/${this.state.thang}`)}> <span><i class="fa-solid fa-file-import"></i> XÁC THÁNG {this.state.thang}</span></li>
                            <li  onClick={() => this.gotolink(`don/${this.state.thang}`)}> <span><i class="fa-solid fa-file-import"></i> DỌN THÁNG {this.state.thang}</span></li>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Kho));

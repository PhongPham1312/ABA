import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './UserManage.scss'
import { listnamelink } from '../../../utils/constant';

class CustomerManage extends Component {

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
            linkName: ''
        }
    }

    componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
    }

    // tìm namelink theo link
            timTenTheoLink = () => {
                const item = listnamelink.find(item => item.link === this.props.match?.url);
                return item ? item.name : null;
            };
    

     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    // thêm người dùng
    handleAddUser = () => {
        this.setState({
            modal: '1'
        })
    }

    // on off modal
    handleOnModal = () =>{
        this.setState({
           modal: !this.state.modal 
        })
    }

    // xử lý nhập
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let url = this.props.match.path === '/system/customer-manage' ? true : false;
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    {/* list user option */}
                    <div className='user-container'>
                        <ul>
                            <li onClick={() => this.gotolink('user-manage')} >NHÂN VIÊN</li>
                            <li onClick={() => this.gotolink('mark-manage')} className=''>SỈ DẮT MỐI</li>
                            <li onClick={() => this.gotolink('customer-manage')} className={url === true ? 'li1' : ''}>KHÁCH HÀNG</li>
                        </ul>
                    </div>
                    <div className='m-2 header'>
                        <span><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('home')}></i> {this.state.linkName}</span>
                        <button className="btn-add-user" onClick={this.handleOnModal}><i className="fas fa-plus"></i>   </button>
                    </div>

                    {/* list user */}
                    <div className='list-user'>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerManage));

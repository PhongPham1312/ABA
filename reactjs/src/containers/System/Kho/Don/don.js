import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { listnamelink } from '../../../../utils/constant';
import CommonUtils from '../../../../utils/CommonUtils';
import tronxanh from "../../../../assets/images/tronxanh.png"
import Modal from './Modal/Modal';

class Don extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang: '',
            onModal: false
        }
    }


     async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })
    }

    // tìm namelink theo link
    timTenTheoLink = () => {
        const item = listnamelink.find(item => item.link === this.props.match.path);
        return item ? item.name : null;
    };

    gotolink = (link) =>
        {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    handleOnModal = (name) => {
        this.setState({
            onModal: !this.state.onModal,
            header: name
        })
    }

    render() {
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    <div className='m-2 header'>
                        <span><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('kho-manage')}></i> 
                        {this.state.linkName} {this.state.thang}</span>
                         <div className='input-search'>
                                <input
                                    type='text'
                                    value={this.state.inputsearch}
                                    name='inputsearch'  // <-- sửa chỗ này
                                    onChange={(e) => this.handleOnchangeInput(e)} 
                                    placeholder='nhập để tìm kiếm ...'
                                />

                        </div>
                        <button className="btn-add-user" 
                        onClick={() => this.handleOnModal('THÊM MÁY')}>
                            <i className="fas fa-plus"></i> </button>
                    </div>

                    {/* list kho */}
                    <div className='list-user'>
                        <li className='list-user-content'>
                            <div className='list-user-info'>
                                <img src={tronxanh} alt='tròn xanh'/>
                                <div className='content-info-item'>...</div>
                                <span>{' _ '}</span>
                                <div className='content-info-item'>...</div>
                                <span>{' _ '}</span>
                                <div className='content-info-item'>...</div>
                            </div>
                            <table class="table table-bordered border-primary">
                                <tbody>
                                    <tr>
                                        <td>Larry the Bird</td>
                                        <td rowspan="3">Cột A (gộp 3 hàng)</td>
                                    </tr>
                                    <tr>
                                        <td>Larry the Bird</td>
                                    </tr>
                                    <tr>
                                        <td>Larry the Bird</td>
                                    </tr>
                                </tbody>
                                </table>
                        </li>


                        {/* modal */}
                        {
                            this.state.onModal === true &&
                            <Modal
                                handleOnModal = {this.handleOnModal} 
                                header = {this.state.header}
                            />
                        }


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Don));

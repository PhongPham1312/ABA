import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import Modal from './Modal';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { listnamelink } from '../../../utils/constant';
import { getAllKhomonth } from '../../../services/khoService';

class KhoMonth extends Component {

    constructor(props){
        super(props);
        this.state = {
            linkName: '',
            listKho: []
        }
    }


     async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        await this.getAll()
    }

    // get all kho
    getAll = async() => {
        let res = await getAllKhomonth();
        if (res && res.errCode === 0) {
                this.setState({
                    listKho: res.data
                })
            }
        else this.setState({
            listKho: []
        })
    }

    // tìm namelink theo link
            timTenTheoLink = () => {
                const item = listnamelink.find(item => item.link === this.props.match?.path);
                return item ? item.name : null;
            };

     gotolink = (link) =>
        {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    } 

    handleOnModal = (type) => {
        this.setState({
            modal : !this.state.modal,
            typeModal: type
        })
    }

    // get all kho
   

    

    render() {
        let {listKho} = this.state
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    {/* link name */}
                    <div className='m-2'>
                        <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('kho-manage')}
                        ></i> {this.state.linkName}
                        </div>

                    {/* list kho */}
                    <div className='list-user'>

                        {/* btn */}
                        <div>
                            <button className="btn-add-user" onClick={() => this.handleOnModal('THÊM KHO HÀNG THÁNG')}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        {/* list */}
                        <div className='list-content'>
                            <ul>
                                {listKho && !isEmpty(listKho) && listKho.map((item, index) => {
                                    return (
                                        <li onClick={() => this.gotolink(`kho-phone-mount/${item.id}`)}>
                                            <span><i className="fa-solid fa-folder"></i>
                                            {item.name}
                                            </span>
                                            <div className='close-kho'>
                                                <i class="fa-solid fa-circle-xmark" onClick={() => this.handleDelete(item.id)}></i>
                                            </div>
                                    </li>
                                    )
                                })}
                            </ul>
                        </div>
                        

                         {/* modal */}
                         {this.state.modal === true &&
                             <Modal typeModal={this.state.typeModal}
                             handleOnModal= {this.handleOnModal}
                             /* getAll = {this.getAll} */
                                typekho = 'khomonth'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KhoMonth));

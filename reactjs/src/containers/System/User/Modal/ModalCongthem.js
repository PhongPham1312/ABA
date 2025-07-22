import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createCongthem , getallcongthem} from '../../../../services/congthem';
import { toast } from 'react-toastify';

class Madalcongthem extends Component {
    constructor(props){
        super(props)
        this.state = {
            congthem: '',
        }
    }

    async componentDidMount() {
    }
    
     // xu ly dang nhap
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    layDonGia = (chuoi) => {
        const match = chuoi.match(/^(\d+)c(\d+)$/);
        if (!match) return 0;

        const donGia = parseInt(match[2], 10);
        return donGia * 1000;
    };

    handleAdd = async () => {
        let res = await createCongthem({
            userid: this.props.user.userid,
            ngay: this.props.user.ngay,
            congthem: this.state.congthem,
            thanhtien: this.layDonGia(this.state.congthem)

        })
        if(res && res.errCode === 0){
            toast.success('thêm thành công ')
            this.props.onModalcongthem('')
            await this.props.getlichbyuser(this.props.user.userid)
            await this.props.getallcongthembyuser(this.props.user.userid)
        }
        else {
            toast.error('thêm không thành công ')
            this.props.onModalcongthem('')
        }
        
    }


    
  
 
    render() {
        return (
            <div className='modal-congthem'>
                <div className='modal-congthem-add-container'>
                    <div className='close-congthem'>
                        <i className="fa-solid fa-circle-xmark" onClick={() => this.props.onModalcongthem('')}></i>
                    </div>
                      <div className='congthem'><input onChange={this.handleInputChange} name='congthem' value={this.state.congthem} type='text'/> <span onClick={this.handleAdd}>thêm</span></div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Madalcongthem));

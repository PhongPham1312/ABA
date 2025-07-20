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

    handleAdd = async (e) => {
        let res = await createCongthem({
            userid: this.props.user.userid,
            ngay: this.props.user.ngay,
            congthem: this.state.congthem,
            thanhtien: this.layDonGia(this.state.congthem)

        })
        if(res && res.errCode === 0){
            toast.success('thêm thành công ')
            this.props.onaddcongthem(null, e)
        }
        else {
            toast.error('thêm không thành công ')
            this.props.onaddcongthem(null, e)
        }
        
    }


    
  
 
    render() {
        return (
            <div className='modal-congthem'>
                <div className='modal-congthem-add-container'>
                        <input name='congthem' onChange={this.handleInputChange} value={this.state.congthem} type='text'/> <div onClick={this.handleAdd} className='them'>thêm</div>                            
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

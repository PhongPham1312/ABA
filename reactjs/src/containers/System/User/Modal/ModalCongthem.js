import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Madalcongthem extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {
    }
    
  
 
    render() {
        return (
            <div className='modal-congthem'>
                <div className='modal-congthem-add-container'>
                    <div className='close'>
                        <i className="fa-solid fa-circle-xmark" onClick={() => this.props.onaddcongthem('')}></i>
                    </div>
                   
ÂFÀWÀA
                            
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

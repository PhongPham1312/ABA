import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import homeManage from '../containers/System/homeManage';
import UserManage from '../containers/System/User/UserManage';
import MarkManage from '../containers/System/User/MarkManage';
import CustomerManage from '../containers/System/User/CustomerManage';
import Kho from '../containers/System/Kho/Kho'
import ThuchiManage from '../containers/System/ThuChi/ThuchiManage';
import ThuchiAs from '../containers/System/ThuChi/ThuchiAs';
import ThuchiTM
 from '../containers/System/ThuChi/ThuchiTM';

 import don from '../containers/System/Kho/Don/don';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list" style={{ position: 'relative' }}>
                    <Switch>
                        {/* home */}
                        <Route path="/system/home" component={homeManage} />

                        {/* người */}
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/mark-manage" component={MarkManage} />
                        <Route path="/system/customer-manage" component={CustomerManage} />

                        {/* kho */}
                        <Route path="/system/kho-manage" component={Kho} />
                        <Route path="/system/don/:id" component={don} />
                        
                        {/* phone , sửa , thay , xác , cầm , DỌN */}
                        <Route path="/system/thuchi" component={ThuchiManage} />
                        <Route path="/system/thuchi-as/:id" component={ThuchiAs} />
                        <Route path="/system/thuchi-tm/:id" component={ThuchiTM} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

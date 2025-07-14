import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import homeManage from '../containers/System/homeManage';
import UserManage from '../containers/System/User/UserManage';
import MarkManage from '../containers/System/User/MarkManage';
import CustomerManage from '../containers/System/User/CustomerManage';
import Kho from '../containers/System/Kho/Kho'
import KhoMonth from '../containers/System/Kho/KhoMonth';
import KhoManage from '../containers/System/Kho/KhoManage'
import camManage from '../containers/System/Kho/camManage';
import suathayManage from '../containers/System/Kho/suathayManage';
import xacManage from '../containers/System/Kho/xacManage';
import donmay from '../containers/System/Kho/donmay';


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
                        
                        {/* kho tháng */}
                        <Route path="/system/kho-manage-month/:id" component={KhoMonth} />

                        {/* phone , sửa , thay , xác , cầm , DỌN */}
                        <Route path="/system/kho-phone-mount/:id" component={KhoManage} />
                        <Route path="/system/kho-cam-mount/:id" component={camManage} />
                        <Route path="/system/kho-sua-thay-mount/:id" component={suathayManage} />
                        <Route path="/system/kho-xac-mount/:id" component={xacManage} />
                        <Route path="/system/kho-don-mount/:id" component={donmay} />
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

export const path = {
    HOME: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system'
};

export const languages = {
    VI: 'vi',
    EN: 'en'
};
 
export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}

export const listnamelink  = [
    {name: 'NHÂN SỰ', link: '/system/user-manage'},
    {name: 'SỈ DẮT MỐI', link: '/system/mark-manage'},
    {name: 'KHÁCH HÀNG', link: '/system/customer-manage'},
    {name: 'KHO HÀNG', link: '/system/kho-manage'},
    {name: 'KHO HÀNG THÁNG', link: '/system/kho-manage-month/:id'},
    {name: 'THÁNG', link: '/system/kho-phone-mount/:id'},
    {name: 'SỬA , THAY THÁNG', link: '/system/kho-sua-thay-mount/:id'},
    {name: 'XÁC THÁNG', link: '/system/kho-xac-mount/:id'},
    {name: 'CẦM THÁNG', link: '/system/kho-cam-mount/:id'},
    {name: 'DỌN THÁNG', link: '/system/kho-don-mount/:id'},
    {name: 'THU CHI', link: '/system/thuchinam'},
    {name: 'THU CHI THÁNG', link: '/system/thuchithang/:id'},

]
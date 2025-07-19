import express from "express";
import userController from '../controllers/userController';
import positionController from '../controllers/positionController'
import jobController from "../controllers/jobController"
import khoController from "../controllers/KhoController"
import khomonthController from "../controllers/khomonthController"
import phoneController from "../controllers/phoneController"
import donController from "../controllers/donController"
import customerController from "../controllers/customerController"
import mayController from '../controllers/mayController'
import linhkiendonController from '../controllers/linhkiendonController'
import ASController from '../controllers/ASController'
import tmController from '../controllers/tmController'
import lichController from '../controllers/lich'
import congthem from '../controllers/congthem'

let router = express.Router();

let initWebRoutes = (app) => {

    // user
    router.get('/api/get-all-user', userController.getAllUser);
    router.post('/api/login', userController.handleLoging);
    router.post('/api/create-user', userController.createUser);
    router.delete('/api/delete-user', userController.deleteUser);

    // position
    router.get('/api/get-all-position', positionController.getAllPosition);

    // job
    router.get('/api/get-all-job', jobController.getAllJob);

    // kho
    router.post('/api/create-kho', khoController.createKho);
    router.get('/api/get-all-kho', khoController.getAll);
    router.delete('/api/delete-kho', khoController.deleteKho);
    
    // kho hàng tháng
    router.post('/api/create-khomonth', khomonthController.createKhomonth);
    router.delete('/api/delete-khomonth', khomonthController.deleteKhomonth);
    router.get('/api/get-all-khomonth', khomonthController.getAllKhomonth);

    // phone
    router.post('/api/create-phone', phoneController.createPhone);
    /* router.delete('/api/delete-phone', phoneController.deletephone); */
    router.get('/api/get-all-phone', phoneController.getAllPhones);

    // dọn
    router.post('/api/create-don', donController.createDon);
    router.get('/api/get-all-don', donController.getAllDon);

    // user
    router.post('/api/create-customer', customerController.addCustomer);
    router.get('/api/get-all-customer', customerController.getAllCustomers);

    // gia
    router.post('/api/create-gia', mayController.addGia);
    router.get('/api/get-all-may', mayController.getMayList);

    // sỉ dắt mố getAllMark
    router.post('/api/create-mark', userController.addMark);
    router.get('/api/get-all-mark', userController.getAllMark);


    // linh kiện dọn
    router.post('/api/create-linhkiendon', linhkiendonController.create);
    router.get('/api/get-all-linhkiendon', linhkiendonController.getAll);
    router.get('/api/get-all-linhkiendon-by-donmay', linhkiendonController.getLinhkienByDonmay);
    router.delete('/api/delete-linhkiendon', linhkiendonController.deleteLinhkiendon);

    // as
    router.post('/api/create-as', ASController.handleCreateAS);
    router.get('/api/get-all-by-thang', ASController.getSacombankByMonthGrouped);
    router.get('/api/get-all-by-ngay', ASController.getGroupByNgay);
    router.delete('/api/delete-as', ASController.deleteAS);

    // tm
    router.post('/api/create-tm', tmController.createTM);
    router.get('/api/get-all-tm-by-thang', tmController.getTienmatkByMonthGrouped);
    router.get('/api/get-all-tm-by-ngay', tmController.getGroupByDateService);
    router.delete('/api/delete-tm', tmController.deleteTM);

    router.post('/api/create-lich', lichController.createOrUpdateLich);
    router.get('/api/get-lich-by-user', lichController.getLichByUserAndRange);
    router.get('/api/get-lich-by-user-all', lichController.handleGetLichByUser);
    router.post('/api/congthem', congthem.handleCreateCongthem);
    router.get('/api/congthem', congthem.handleGetCongthemByUserAndNgay);


 
    return app.use("/", router);
}

module.exports = initWebRoutes;
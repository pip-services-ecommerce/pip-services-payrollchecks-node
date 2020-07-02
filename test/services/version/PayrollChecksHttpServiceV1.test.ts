// let _ = require('lodash');
// let async = require('async');
// let restify = require('restify');
// let assert = require('chai').assert;

// import { ConfigParams } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';

// import { PayrollCheckV1 } from '../../../src/data/version1/PayrollCheckV1';
// import { PayrollCheckTypeV1 } from '../../../src/data/version1/PayrollCheckTypeV1';
// import { PayrollCheckStateV1 } from '../../../src/data/version1/PayrollCheckStateV1';
// import { PayrollChecksMemoryPersistence } from '../../../src/persistence/PayrollChecksMemoryPersistence';
// import { PayrollChecksController } from '../../../src/logic/PayrollChecksController';
// import { PayrollChecksHttpServiceV1 } from '../../../src/services/version1/PayrollChecksHttpServiceV1';

// let httpConfig = ConfigParams.fromTuples(
//     "connection.protocol", "http",
//     "connection.host", "localhost",
//     "connection.port", 3000
// );

// let CHECK1: PayrollCheckV1 = {
//     id: '1',
//     customer_id: '1',
//     type: PayrollCheckTypeV1.Visa,
//     number: '1111111111111111',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
//         postal_code: '85710',
//         country_code: 'US'
//     },
//     ccv: '213',
//     name: 'Test Check 1',
//     saved: true,
//     default: true,
//     state: PayrollCheckStateV1.Ok
// };
// let CHECK2: PayrollCheckV1 = {
//     id: '2',
//     customer_id: '1',
//     type: PayrollCheckTypeV1.Visa,
//     number: '2222222222222222',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Check 2',
//     saved: true,
//     default: false,
//     state: PayrollCheckStateV1.Expired
// };


// suite('PayrollChecksHttpServiceV1', ()=> {    
//     let service: PayrollChecksHttpServiceV1;
//     let rest: any;

//     suiteSetup((done) => {
//         let persistence = new PayrollChecksMemoryPersistence();
//         let controller = new PayrollChecksController();

//         service = new PayrollChecksHttpServiceV1();
//         service.configure(httpConfig);

//         let references: References = References.fromTuples(
//             new Descriptor('pip-services-payrollchecks', 'persistence', 'memory', 'default', '1.0'), persistence,
//             new Descriptor('pip-services-payrollchecks', 'controller', 'default', 'default', '1.0'), controller,
//             new Descriptor('pip-services-payrollchecks', 'service', 'http', 'default', '1.0'), service
//         );
//         controller.setReferences(references);
//         service.setReferences(references);

//         service.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         service.close(null, done);
//     });

//     setup(() => {
//         let url = 'http://localhost:3000';
//         rest = restify.createJsonClient({ url: url, version: '*' });
//     });
    
    
//     test('CRUD Operations', (done) => {
//         let payrollCheck1, payrollCheck2: PayrollCheckV1;

//         async.series([
//         // Create one payroll check
//             (callback) => {
//                 rest.post('/v1/payroll_checks/create_check',
//                     {
//                         check: CHECK1
//                     },
//                     (err, req, res, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isObject(payrollCheck);
//                         assert.equal(payrollCheck.number, CHECK1.number);
//                         assert.equal(payrollCheck.expire_year, CHECK1.expire_year);
//                         assert.equal(payrollCheck.customer_id, CHECK1.customer_id);

//                         payrollCheck1 = payrollCheck;

//                         callback();
//                     }
//                 );
//             },
//         // Create another payroll check
//             (callback) => {
//                 rest.post('/v1/payroll_checks/create_check', 
//                     {
//                         check: CHECK2
//                     },
//                     (err, req, res, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isObject(payrollCheck);
//                         assert.equal(payrollCheck.number, CHECK2.number);
//                         assert.equal(payrollCheck.expire_year, CHECK2.expire_year);
//                         assert.equal(payrollCheck.customer_id, CHECK2.customer_id);

//                         payrollCheck2 = payrollCheck;

//                         callback();
//                     }
//                 );
//             },
//         // Get all payroll checks
//             (callback) => {
//                 rest.post('/v1/payroll_checks/get_checks',
//                     {},
//                     (err, req, res, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Update the payroll check
//             (callback) => {
//                 payrollCheck1.name = 'Updated Check 1';

//                 rest.post('/v1/payroll_checks/update_check',
//                     { 
//                         check: payrollCheck1
//                     },
//                     (err, req, res, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isObject(payrollCheck);
//                         assert.equal(payrollCheck.name, 'Updated Check 1');
//                         assert.equal(payrollCheck.id, CHECK1.id);

//                         payrollCheck1 = payrollCheck;

//                         callback();
//                     }
//                 );
//             },
//         // Delete payroll check
//             (callback) => {
//                 rest.post('/v1/payroll_checks/delete_check_by_id',
//                     {
//                         check_id: payrollCheck1.id,
//                         customer_id: payrollCheck1.customer_id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete payroll check
//             (callback) => {
//                 rest.post('/v1/payroll_checks/get_check_by_id',
//                     {
//                         check_id: payrollCheck1.id,
//                         customer_id: payrollCheck1.customer_id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });
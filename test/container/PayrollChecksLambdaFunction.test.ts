// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { Descriptor } from 'pip-services3-commons-node';
// import { ConfigParams } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';
// import { ConsoleLogger } from 'pip-services3-components-node';

// import { PayrollCheckV1 } from '../../src/data/version1/PayrollCheckV1';
// import { PayrollCheckTypeV1 } from '../../src/data/version1/PayrollCheckTypeV1';
// import { PayrollCheckStateV1 } from '../../src/data/version1/PayrollCheckStateV1';
// import { PayrollChecksMemoryPersistence } from '../../src/persistence/PayrollChecksMemoryPersistence';
// import { PayrollChecksController } from '../../src/logic/PayrollChecksController';
// import { PayrollChecksLambdaFunction } from '../../src/container/PayrollChecksLambdaFunction';

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

// suite('PayrollChecksLambdaFunction', ()=> {
//     let lambda: PayrollChecksLambdaFunction;

//     suiteSetup((done) => {
//         let config = ConfigParams.fromTuples(
//             'logger.descriptor', 'pip-services:logger:console:default:1.0',
//             'persistence.descriptor', 'pip-services-payrollchecks:persistence:memory:default:1.0',
//             'controller.descriptor', 'pip-services-payrollchecks:controller:default:default:1.0'
//         );

//         lambda = new PayrollChecksLambdaFunction();
//         lambda.configure(config);
//         lambda.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         lambda.close(null, done);
//     });
    
//     test('CRUD Operations', (done) => {
//         var payrollCheck1, payrollCheck2: PayrollCheckV1;

//         async.series([
//         // Create one payroll check
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'payroll_checks',
//                         cmd: 'create_check',
//                         check: CHECK1
//                     },
//                     (err, payrollCheck) => {
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
//                 lambda.act(
//                     {
//                         role: 'payroll_checks',
//                         cmd: 'create_check',
//                         check: CHECK2
//                     },
//                     (err, payrollCheck) => {
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
//                 lambda.act(
//                     {
//                         role: 'payroll_checks',
//                         cmd: 'get_checks' 
//                     },
//                     (err, page) => {
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

//                 lambda.act(
//                     {
//                         role: 'payroll_checks',
//                         cmd: 'update_check',
//                         check: payrollCheck1
//                     },
//                     (err, payrollCheck) => {
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
//                 lambda.act(
//                     {
//                         role: 'payroll_checks',
//                         cmd: 'delete_check_by_id',
//                         check_id: payrollCheck1.id,
//                         customer_id: payrollCheck1.customer_id
//                     },
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete payroll check
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'payroll_checks',
//                         cmd: 'get_check_by_id',
//                         check_id: payrollCheck1.id,
//                         customer_id: payrollCheck1.customer_id
//                     },
//                     (err, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isNull(payrollCheck || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });
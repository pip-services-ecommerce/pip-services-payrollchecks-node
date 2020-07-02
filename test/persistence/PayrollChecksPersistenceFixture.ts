// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';

// import { PayrollCheckV1 } from '../../src/data/version1/PayrollCheckV1';
// import { PayrollCheckTypeV1 } from '../../src/data/version1/PayrollCheckTypeV1';
// import { PayrollCheckStateV1 } from '../../src/data/version1/PayrollCheckStateV1';

// import { IPayrollChecksPersistence } from '../../src/persistence/IPayrollChecksPersistence';
// import { AddressV1 } from '../../src/data/version1/ShippingDetailsV1';

// let CHECK1: PayrollCheckV1 = {
//     id: '1',
//     customer_id: '1',
//     type: PayrollCheckTypeV1.Visa,
//     number: '4032036094894795',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
//         state: 'AZ',
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
//     number: '4032037578262780',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         state: 'NY',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Check 2',
//     saved: true,
//     default: false,
//     state: PayrollCheckStateV1.Expired
// };
// let CHECK3: PayrollCheckV1 = {
//     id: '3',
//     customer_id: '2',
//     type: PayrollCheckTypeV1.Visa,
//     number: '4032037578262780',
//     expire_month: 5,
//     expire_year: 2022,
//     first_name: 'Steve',
//     last_name: 'Jobs',
//     billing_address: {
//         line1: '234 6th Str',
//         city: 'Los Angeles',
//         state: 'CA',
//         postal_code: '65320',
//         country_code: 'US'
//     },
//     ccv: '124',
//     name: 'Test Check 2',
//     state: PayrollCheckStateV1.Ok
// };

// export class PayrollChecksPersistenceFixture {
//     private _persistence: IPayrollChecksPersistence;
    
//     constructor(persistence) {
//         assert.isNotNull(persistence);
//         this._persistence = persistence;
//     }

//     private testCreatePayrollChecks(done) {
//         async.series([
//         // Create one payroll check
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     CHECK1,
//                     (err, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isObject(payrollCheck);
//                         assert.equal(payrollCheck.first_name, CHECK1.first_name);
//                         assert.equal(payrollCheck.last_name, CHECK1.last_name);
//                         assert.equal(payrollCheck.expire_year, CHECK1.expire_year);
//                         assert.equal(payrollCheck.customer_id, CHECK1.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create another payroll check
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     CHECK2,
//                     (err, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isObject(payrollCheck);
//                         assert.equal(payrollCheck.first_name, CHECK2.first_name);
//                         assert.equal(payrollCheck.last_name, CHECK2.last_name);
//                         assert.equal(payrollCheck.expire_year, CHECK2.expire_year);
//                         assert.equal(payrollCheck.customer_id, CHECK2.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create yet another payroll check
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     CHECK3,
//                     (err, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isObject(payrollCheck);
//                         assert.equal(payrollCheck.first_name, CHECK3.first_name);
//                         assert.equal(payrollCheck.last_name, CHECK3.last_name);
//                         assert.equal(payrollCheck.expire_year, CHECK3.expire_year);
//                         assert.equal(payrollCheck.customer_id, CHECK3.customer_id);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }
                
//     testCrudOperations(done) {
//         let payrollCheck1: PayrollCheckV1;

//         async.series([
//         // Create items
//             (callback) => {
//                 this.testCreatePayrollChecks(callback);
//             },
//         // Get all payroll checks
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     new FilterParams(),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 3);

//                         payrollCheck1 = page.data[0];

//                         callback();
//                     }
//                 );
//             },
//         // Update the payroll check
//             (callback) => {
//                 payrollCheck1.name = 'Updated Check 1';

//                 this._persistence.update(
//                     null,
//                     payrollCheck1,
//                     (err, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isObject(payrollCheck);
//                         assert.equal(payrollCheck.name, 'Updated Check 1');
//                         // PayPal changes id on update
//                         //!!assert.equal(payrollCheck.id, payrollCheck1.id);

//                         payrollCheck1 = payrollCheck;

//                         callback();
//                     }
//                 );
//             },
//         // Delete payroll check
//             (callback) => {
//                 this._persistence.deleteById(
//                     null,
//                     payrollCheck1.id,
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete payroll check
//             (callback) => {
//                 this._persistence.getOneById(
//                     null,
//                     payrollCheck1.id,
//                     (err, payrollCheck) => {
//                         assert.isNull(err);

//                         assert.isNull(payrollCheck || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }

//     testGetWithFilter(done) {
//         async.series([
//         // Create payroll checks
//             (callback) => {
//                 this.testCreatePayrollChecks(callback);
//             },
//         // Get payroll checks filtered by customer id
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         customer_id: '1'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get payroll checks by state
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         state: 'ok'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal calculate states by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get payroll checks by saved
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         saved: true
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get payroll checks by ids
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         ids: ['1', '3']
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal manages ids by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         ], done);
//     }

// }

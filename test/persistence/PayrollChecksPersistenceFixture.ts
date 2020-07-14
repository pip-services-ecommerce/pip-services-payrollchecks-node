let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams, RandomText } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { PayrollCheckV1 } from '../../src/data/version1/PayrollCheckV1';
import { PayrollCheckStateV1 } from '../../src/data/version1/PayrollCheckStateV1';

import { IPayrollChecksPersistence } from '../../src/persistence/IPayrollChecksPersistence';
import { TestModel } from '../data/TestModel';

let CHECK1: PayrollCheckV1 = TestModel.createPayrollCheck1();
let CHECK2: PayrollCheckV1 = TestModel.createPayrollCheck2();
let CHECK3: PayrollCheckV1 = TestModel.createPayrollCheck3();

export class PayrollChecksPersistenceFixture {
    private _persistence: IPayrollChecksPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreatePayrollChecks(done) {
        async.series([
            // Create one payroll check
            (callback) => {
                this._persistence.create(
                    null,
                    CHECK1,
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);
                        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK1);

                        callback();
                    }
                );
            },
            // Create another payroll check
            (callback) => {
                this._persistence.create(
                    null,
                    CHECK2,
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);
                        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK2);

                        callback();
                    }
                );
            },
            // Create yet another payroll check
            (callback) => {
                this._persistence.create(
                    null,
                    CHECK3,
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);
                        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK3);

                        callback();
                    }
                );
            }
        ], done);
    }

    testCrudOperations(done) {
        let payrollCheck1: PayrollCheckV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreatePayrollChecks(callback);
            },
            // Get all payroll checks
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        payrollCheck1 = page.data[0];

                        callback();
                    }
                );
            },
            // Update the payroll check
            (callback) => {
                payrollCheck1.number = RandomText.text(5, 32);

                this._persistence.update(
                    null,
                    payrollCheck1,
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);
                        assert.equal(payrollCheck.number, payrollCheck1.number);

                        payrollCheck1 = payrollCheck;

                        callback();
                    }
                );
            },
            // Delete payroll check
            (callback) => {
                this._persistence.deleteById(
                    null,
                    payrollCheck1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete payroll check
            (callback) => {
                this._persistence.getOneById(
                    null,
                    payrollCheck1.id,
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isNull(payrollCheck || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
            // Create payroll checks
            (callback) => {
                this.testCreatePayrollChecks(callback);
            },
            // Get payroll checks filtered by customer id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        party_id: '1'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get payroll checks by state
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        state: PayrollCheckStateV1.New
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get payroll checks by ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        ids: ['1', '3']
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get all payroll checks by period
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        from_time: new Date(2020, 1, 15),
                        to_time: new Date(2020, 8, 15),
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
            // Get one payroll check by period
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        from_time: new Date(2020, 4, 15),
                        to_time: new Date(2020, 7, 15),
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

}

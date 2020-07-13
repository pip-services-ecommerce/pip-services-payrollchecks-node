let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { RandomText } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';

import { PayrollCheckV1 } from '../../src/data/version1/PayrollCheckV1';
import { PayrollChecksLambdaFunction } from '../../src/container/PayrollChecksLambdaFunction';
import { TestModel } from '../data/TestModel';

let CHECK1: PayrollCheckV1 = TestModel.createPayrollCheck1();
let CHECK2: PayrollCheckV1 = TestModel.createPayrollCheck2();

suite('PayrollChecksLambdaFunction', () => {
    let lambda: PayrollChecksLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-payrollchecks:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-payrollchecks:controller:default:default:1.0'
        );

        lambda = new PayrollChecksLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });

    suiteTeardown((done) => {
        lambda.close(null, done);
    });

    test('CRUD Operations', (done) => {
        var payrollCheck1, payrollCheck2: PayrollCheckV1;

        async.series([
            // Create one payroll check
            (callback) => {
                lambda.act(
                    {
                        role: 'payroll_checks',
                        cmd: 'create_check',
                        check: CHECK1
                    },
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);
                        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK1);

                        payrollCheck1 = payrollCheck;

                        callback();
                    }
                );
            },
            // Create another payroll check
            (callback) => {
                lambda.act(
                    {
                        role: 'payroll_checks',
                        cmd: 'create_check',
                        check: CHECK2
                    },
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);
                        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK2);

                        payrollCheck2 = payrollCheck;

                        callback();
                    }
                );
            },
            // Get all payroll checks
            (callback) => {
                lambda.act(
                    {
                        role: 'payroll_checks',
                        cmd: 'get_checks'
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Update the payroll check
            (callback) => {
                payrollCheck1.number = RandomText.text(5, 32);

                lambda.act(
                    {
                        role: 'payroll_checks',
                        cmd: 'update_check',
                        check: payrollCheck1
                    },
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);
                        assert.equal(payrollCheck.number, payrollCheck1.number);
                        assert.equal(payrollCheck.id, CHECK1.id);

                        payrollCheck1 = payrollCheck;

                        callback();
                    }
                );
            },
            // Delete payroll check
            (callback) => {
                lambda.act(
                    {
                        role: 'payroll_checks',
                        cmd: 'delete_check_by_id',
                        check_id: payrollCheck1.id,
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete payroll check
            (callback) => {
                lambda.act(
                    {
                        role: 'payroll_checks',
                        cmd: 'get_check_by_id',
                        check_id: payrollCheck1.id,
                    },
                    (err, payrollCheck) => {
                        assert.isNull(err);

                        assert.isNull(payrollCheck || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});
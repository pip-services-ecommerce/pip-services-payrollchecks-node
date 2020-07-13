let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams, RandomText } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { PayrollCheckV1 } from '../../../src/data/version1/PayrollCheckV1';
import { PayrollChecksMemoryPersistence } from '../../../src/persistence/PayrollChecksMemoryPersistence';
import { PayrollChecksController } from '../../../src/logic/PayrollChecksController';
import { PayrollChecksHttpServiceV1 } from '../../../src/services/version1/PayrollChecksHttpServiceV1';
import { TestModel } from '../../data/TestModel';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let CHECK1: PayrollCheckV1 = TestModel.createPayrollCheck1();
let CHECK2: PayrollCheckV1 = TestModel.createPayrollCheck2();

suite('PayrollChecksHttpServiceV1', () => {
    let service: PayrollChecksHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new PayrollChecksMemoryPersistence();
        let controller = new PayrollChecksController();

        service = new PayrollChecksHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-payrollchecks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-payrollchecks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-payrollchecks', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });

    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });


    test('CRUD Operations', (done) => {
        let payrollCheck1, payrollCheck2: PayrollCheckV1;

        async.series([
            // Create one payroll check
            (callback) => {
                rest.post('/v1/payroll_checks/create_check',
                    {
                        check: CHECK1
                    },
                    (err, req, res, payrollCheck) => {
                        assert.isNull(err);
                        assert.isObject(payrollCheck);
                        
                        assert.equal(payrollCheck.party_id, CHECK1.party_id);
                        assert.equal(payrollCheck.state, CHECK1.state);
                        assert.equal(payrollCheck.income_total, CHECK1.income_total);
                        assert.equal(payrollCheck.deductions_total, CHECK1.deductions_total);
                        assert.equal(payrollCheck.net_total, CHECK1.net_total);

                        //TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK1);

                        payrollCheck1 = payrollCheck;

                        callback();
                    }
                );
            },
            // Create another payroll check
            (callback) => {
                rest.post('/v1/payroll_checks/create_check',
                    {
                        check: CHECK2
                    },
                    (err, req, res, payrollCheck) => {
                        assert.isNull(err);

                        assert.isObject(payrollCheck);

                        assert.equal(payrollCheck.party_id, CHECK2.party_id);
                        assert.equal(payrollCheck.state, CHECK2.state);
                        assert.equal(payrollCheck.income_total, CHECK2.income_total);
                        assert.equal(payrollCheck.deductions_total, CHECK2.deductions_total);
                        assert.equal(payrollCheck.net_total, CHECK2.net_total);

                        // TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK2);

                        payrollCheck2 = payrollCheck;

                        callback();
                    }
                );
            },
            // Get all payroll checks
            (callback) => {
                rest.post('/v1/payroll_checks/get_checks',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/payroll_checks/update_check',
                    {
                        check: payrollCheck1
                    },
                    (err, req, res, payrollCheck) => {
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
                rest.post('/v1/payroll_checks/delete_check_by_id',
                    {
                        check_id: payrollCheck1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);
                        //assert.isNull(result);

                        callback();
                    }
                );
            },
            // Try to get delete payroll check
            (callback) => {
                rest.post('/v1/payroll_checks/get_check_by_id',
                    {
                        check_id: payrollCheck1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});
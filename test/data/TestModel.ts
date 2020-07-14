let assert = require('chai').assert;

import { PayrollCheckV1 } from "../../src/data/version1/PayrollCheckV1";
import { PayrollCheckStateV1 } from "../../src/data/version1/PayrollCheckStateV1";
import { IncomeItemV1 } from "../../src/data/version1/IncomeItemV1";
import { DeductionItemV1 } from "../../src/data/version1/DeductionItemV1";

export class TestModel {
    static createPayrollCheck1(): PayrollCheckV1 {
        return PayrollCheckV1.calculateTotals({
            id: '1',
            party_id: '1',
            income: [
                {
                    description: 'task 1',
                    total: 160,
                    hours: 20,
                    rate: 8
                },
                {
                    description: 'task 2',
                    total: 85,
                    hours: 10,
                    rate: 8.5
                },
            ],

            state: PayrollCheckStateV1.Paid,

            paid_time: new Date(2020, 6, 2),
            period_from: new Date(2020, 5, 1),
            period_to: new Date(2020, 5, 31),

            income_total: 145,
            net_total: 0
        });
    }

    static createPayrollCheck2(): PayrollCheckV1 {
        return PayrollCheckV1.calculateTotals({
            id: '2',
            party_id: '2',
            income: [
                {
                    description: 'task 3',
                    total: 700,
                    hours: 50,
                    rate: 14
                },
                {
                    description: 'task 4',
                    total: 1680,
                    hours: 120,
                    rate: 14
                },
            ],
            deductions: [
                {
                    description: 'commission 5',
                    total: 35,
                    ytd_total: 5
                }
            ],
            state: PayrollCheckStateV1.New,
            
            period_from: new Date(2020, 2, 1),
            period_to: new Date(2020, 2, 29),

            income_total: 0,
            net_total: 2340
        });
    }

    static createPayrollCheck3(): PayrollCheckV1 {
        return PayrollCheckV1.calculateTotals({
            id: '3',
            party_id: '1',
            income: [
                {
                    description: 'task 1',
                    total: 160,
                    hours: 135,
                    rate: 8
                },
                {
                    description: 'task 2',
                    total: 85,
                    hours: 10,
                    rate: 8.5
                },
            ],
            deductions: [
                {
                    description: 'commission 1',
                    total: 10,
                    ytd_total: 5
                }
            ],
            state: PayrollCheckStateV1.New,
            
            period_from: new Date(2020, 3, 1),
            period_to: new Date(2020, 3, 31),

            income_total: 145,
            deductions_total: 15,
            net_total: 0
        });
    }

    static assertEqualPayrollCheckV1(actual: PayrollCheckV1, expected: PayrollCheckV1) {
        assert.isNotNull(actual);
        assert.isNotNull(expected);

        assert.equal(actual.id, expected.id);
        assert.equal(actual.number, expected.number);
        assert.equal(actual.party_id, expected.party_id);
        assert.equal(actual.state, expected.state);
        assert.equal(actual.state_details, expected.state_details)

        assert.equal(actual.period_from, expected.period_from);
        assert.equal(actual.period_to, expected.period_to);

        // assert.equal(actual.create_time, expected.create_time);
        // assert.equal(actual.update_time, expected.update_time);
        assert.equal(actual.paid_time, expected.paid_time);

        assert.equal(actual.payment_method_id, expected.payment_method_id);
        assert.equal(actual.payment_id, expected.payment_id);
        assert.equal(actual.check_number, expected.check_number);

        assert.equal(actual.income, expected.income);
        assert.equal(actual.income_total, expected.income_total);
        assert.equal(actual.ytd_income_total, expected.ytd_income_total);

        assert.equal(actual.deductions, expected.deductions);
        assert.equal(actual.deductions_total, expected.deductions_total);
        assert.equal(actual.ytd_deductions_total, expected.ytd_deductions_total);

        assert.equal(actual.net_total, expected.net_total);
        assert.equal(actual.ytd_net_total, expected.ytd_net_total);
    }

    static assertEqualIncomeItemV1(actual: IncomeItemV1, expected: IncomeItemV1) {
        assert.isNotNull(actual);
        assert.isNotNull(expected);

        // assert.equal(actual.description, expected.description);
        // assert.equal(actual.expire_month, expected.expire_month);
        // assert.equal(actual.expire_year, expected.expire_year);
        // assert.equal(actual.first_name, expected.first_name);
        // assert.equal(actual.last_name, expected.last_name);
        // assert.equal(actual.state, expected.state);
    }

    static assertEqualDeductionItemV1(actual: DeductionItemV1, expected: DeductionItemV1) {
        assert.isNotNull(actual);
        assert.isNotNull(expected);

        // assert.equal(actual.bank_code, expected.bank_code);
        // assert.equal(actual.first_name, expected.first_name);
        // assert.equal(actual.last_name, expected.last_name);
        // assert.equal(actual.branch_code, expected.branch_code);
        // assert.equal(actual.country, expected.country);
    }
}
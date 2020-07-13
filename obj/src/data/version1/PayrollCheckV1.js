"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PayrollCheckV1 {
    static calculateTotals(check) {
        var _a, _b, _c;
        if (check.income) {
            let income_total = 0;
            let ytd_income_total = null;
            check.income.forEach(income => {
                if (income.hours && income.rate) {
                    income.total = income.hours * income.rate;
                }
                income_total += income.total;
                if (income.ytd_total) {
                    ytd_income_total = ((ytd_income_total !== null && ytd_income_total !== void 0 ? ytd_income_total : 0)) + income.ytd_total;
                }
            });
            check.income_total = income_total;
            check.ytd_income_total = ytd_income_total;
        }
        if (check.deductions) {
            let deductions_total = 0;
            let ytd_deductions_total = null;
            check.deductions.forEach(deduction => {
                deductions_total += deduction.total;
                if (deduction.ytd_total) {
                    ytd_deductions_total = ((ytd_deductions_total !== null && ytd_deductions_total !== void 0 ? ytd_deductions_total : 0)) + deduction.ytd_total;
                }
            });
            check.deductions_total = deductions_total;
            check.ytd_deductions_total = ytd_deductions_total;
        }
        check.net_total = check.income_total - (_a = check.deductions_total, (_a !== null && _a !== void 0 ? _a : 0));
        if (check.ytd_income_total || check.ytd_deductions_total) {
            check.ytd_net_total = (_b = check.ytd_income_total, (_b !== null && _b !== void 0 ? _b : 0)) - (_c = check.ytd_deductions_total, (_c !== null && _c !== void 0 ? _c : 0));
        }
        return check;
    }
}
exports.PayrollCheckV1 = PayrollCheckV1;
//# sourceMappingURL=PayrollCheckV1.js.map
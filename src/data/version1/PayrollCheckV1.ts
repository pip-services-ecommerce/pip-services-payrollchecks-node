import { IStringIdentifiable } from 'pip-services3-commons-node';
import { IncomeItemV1 } from './IncomeItemV1';
import { DeductionItemV1 } from './DeductionItemV1';

export class PayrollCheckV1 implements IStringIdentifiable {
    public id: string;
    public number?: string;
    public party_id: string;
    public state?: string;
    public state_details?: string;

    public period_from?: Date;
    public period_to?: Date;

    public create_time?: Date;
    public update_time?: Date;
    public paid_time?: Date;

    public payment_method_id?: string;
    public payment_id?: string;
    public check_number?: string;

    public income?: IncomeItemV1[];
    public income_total: number;
    public ytd_income_total?: number;

    public deductions?: DeductionItemV1[];
    public deductions_total?: number;
    public ytd_deductions_total?: number;

    public net_total: number;
    public ytd_net_total?: number;

    public static calculateTotals(check: PayrollCheckV1): PayrollCheckV1 {
        if (check.income) {
            let income_total: number = 0;
            let ytd_income_total: number = null;

            check.income.forEach(income => {
                if (income.hours && income.rate) {
                    income.total = income.hours * income.rate;
                }

                income_total += income.total;
                if (income.ytd_total) {
                    ytd_income_total = (ytd_income_total ?? 0) + income.ytd_total;
                }
            });

            check.income_total = income_total;
            check.ytd_income_total = ytd_income_total;
        }

        if (check.deductions) {
            let deductions_total: number = 0;
            let ytd_deductions_total: number = null;

            check.deductions.forEach(deduction => {
                deductions_total += deduction.total;
                if (deduction.ytd_total) {
                    ytd_deductions_total = (ytd_deductions_total ?? 0) + deduction.ytd_total;
                }
            });

            check.deductions_total = deductions_total;
            check.ytd_deductions_total = ytd_deductions_total;
        }

        check.net_total = check.income_total - (check.deductions_total ?? 0);

        if (check.ytd_income_total || check.ytd_deductions_total) {
            check.ytd_net_total = (check.ytd_income_total ?? 0) - (check.ytd_deductions_total ?? 0);
        }

        return check;
    }
}
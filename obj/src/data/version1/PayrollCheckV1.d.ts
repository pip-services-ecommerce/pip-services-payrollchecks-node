import { IStringIdentifiable } from 'pip-services3-commons-node';
import { IncomeItemV1 } from './IncomeItemV1';
import { DeductionItemV1 } from './DeductionItemV1';
export declare class PayrollCheckV1 implements IStringIdentifiable {
    id: string;
    number?: string;
    party_id: string;
    state?: string;
    state_details?: string;
    period_from?: Date;
    period_to?: Date;
    create_time?: Date;
    update_time?: Date;
    paid_time?: Date;
    payment_method_id?: string;
    payment_id?: string;
    check_number?: string;
    income?: IncomeItemV1[];
    income_total: number;
    ytd_income_total?: number;
    deductions?: DeductionItemV1[];
    deductions_total?: number;
    ytd_deductions_total?: number;
    net_total: number;
    ytd_net_total?: number;
    static calculateTotals(check: PayrollCheckV1): PayrollCheckV1;
}

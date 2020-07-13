import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';

export interface IPayrollChecksController {
    getChecks(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void;

    getCheckById(correlationId: string, check_id: string,
        callback: (err: any, check: PayrollCheckV1) => void): void;

    createCheck(correlationId: string, check: PayrollCheckV1, 
        callback: (err: any, check: PayrollCheckV1) => void): void;

    updateCheck(correlationId: string, check: PayrollCheckV1, 
        callback: (err: any, check: PayrollCheckV1) => void): void;

    deleteCheckById(correlationId: string, check_id: string,
        callback: (err: any, check: PayrollCheckV1) => void): void;
}

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { IPayrollChecksPersistence } from './IPayrollChecksPersistence';
export declare class PayrollChecksMemoryPersistence extends IdentifiableMemoryPersistence<PayrollCheckV1, string> implements IPayrollChecksPersistence {
    constructor();
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void;
}

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';

export interface IPayrollChecksPersistence extends IGetter<PayrollCheckV1, string>, IWriter<PayrollCheckV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: PayrollCheckV1) => void): void;

    create(correlationId: string, item: PayrollCheckV1, 
        callback: (err: any, item: PayrollCheckV1) => void): void;

    update(correlationId: string, item: PayrollCheckV1, 
        callback: (err: any, item: PayrollCheckV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: PayrollCheckV1) => void): void;
}

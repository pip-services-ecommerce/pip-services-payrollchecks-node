let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { TagsProcessor } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { IPayrollChecksPersistence } from './IPayrollChecksPersistence';

export class PayrollChecksMongoDbPersistence
    extends IdentifiableMongoDbPersistence<PayrollCheckV1, string>
    implements IPayrollChecksPersistence {

    constructor() {
        super('payroll_checks');
        super.ensureIndex({ customer_id: 1 });
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });
            
        let state = filter.getAsNullableString('state');
        if (state != null)
            criteria.push({ state: state });

        let partyId = filter.getAsNullableString('party_id');
        if (partyId != null)
            criteria.push({ party_id: partyId });

        let from_time = filter.getAsNullableDateTime('from_time');
        if (from_time != null)
            criteria.push({ create_time: { $gte: from_time } });

        let to_time = filter.getAsNullableDateTime('to_time');
        if (to_time != null)
            criteria.push({ create_time: { $lte: to_time } });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}

let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { TagsProcessor } from 'pip-services3-commons-node';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { IPayrollChecksPersistence } from './IPayrollChecksPersistence';

export class PayrollChecksMemoryPersistence 
    extends IdentifiableMemoryPersistence<PayrollCheckV1, string> 
    implements IPayrollChecksPersistence {

    constructor() {
        super();
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let state = filter.getAsNullableString('state');
        let partyId = filter.getAsNullableString('party_id');
        let ids = filter.getAsObject('ids');

        let from_time = filter.getAsNullableDateTime('from_time');
        let to_time = filter.getAsNullableDateTime('to_time');
                
        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;
        
        return (item: PayrollCheckV1) => {
            if (id && item.id != id) 
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (state && item.state != state) 
                return false;
            if (partyId && item.party_id != partyId) 
                return false;
            if (from_time && item.create_time && item.create_time < from_time)
                return false;
            if (to_time && item.create_time && item.create_time > to_time)
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}

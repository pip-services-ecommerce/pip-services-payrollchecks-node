"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class PayrollChecksMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
        return (item) => {
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.PayrollChecksMemoryPersistence = PayrollChecksMemoryPersistence;
//# sourceMappingURL=PayrollChecksMemoryPersistence.js.map
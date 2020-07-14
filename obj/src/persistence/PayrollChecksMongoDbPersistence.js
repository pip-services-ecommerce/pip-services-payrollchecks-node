"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class PayrollChecksMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('payroll_checks');
        super.ensureIndex({ customer_id: 1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
            criteria.push({ period_to: { $not: { $lt: from_time } } });
        let to_time = filter.getAsNullableDateTime('to_time');
        if (to_time != null)
            criteria.push({ period_from: { $not: { $gt: to_time } } });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.PayrollChecksMongoDbPersistence = PayrollChecksMongoDbPersistence;
//# sourceMappingURL=PayrollChecksMongoDbPersistence.js.map
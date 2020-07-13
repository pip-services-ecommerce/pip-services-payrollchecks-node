"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const PayrollCheckV1_1 = require("../data/version1/PayrollCheckV1");
const PayrollCheckStateV1_1 = require("../data/version1/PayrollCheckStateV1");
const PayrollChecksCommandSet_1 = require("./PayrollChecksCommandSet");
class PayrollChecksController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(PayrollChecksController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new PayrollChecksCommandSet_1.PayrollChecksCommandSet(this);
        return this._commandSet;
    }
    getChecks(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getCheckById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createCheck(correlationId, check, callback) {
        check.state = check.state || PayrollCheckStateV1_1.PayrollCheckStateV1.New;
        check.create_time = new Date();
        check.update_time = new Date();
        check = PayrollCheckV1_1.PayrollCheckV1.calculateTotals(check);
        this._persistence.create(correlationId, check, callback);
    }
    updateCheck(correlationId, check, callback) {
        check.state = check.state || PayrollCheckStateV1_1.PayrollCheckStateV1.New;
        check.update_time = new Date();
        check = PayrollCheckV1_1.PayrollCheckV1.calculateTotals(check);
        this._persistence.update(correlationId, check, callback);
    }
    deleteCheckById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.PayrollChecksController = PayrollChecksController;
PayrollChecksController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-payrollchecks:persistence:*:*:1.0');
//# sourceMappingURL=PayrollChecksController.js.map
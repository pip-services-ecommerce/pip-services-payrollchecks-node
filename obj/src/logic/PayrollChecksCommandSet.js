"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const PayrollCheckV1Schema_1 = require("../data/version1/PayrollCheckV1Schema");
class PayrollChecksCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPayrollChecksCommand());
        this.addCommand(this.makeGetPayrollCheckByIdCommand());
        this.addCommand(this.makeCreatePayrollCheckCommand());
        this.addCommand(this.makeUpdatePayrollCheckCommand());
        this.addCommand(this.makeDeletePayrollCheckByIdCommand());
    }
    makeGetPayrollChecksCommand() {
        return new pip_services3_commons_node_2.Command("get_checks", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getChecks(correlationId, filter, paging, callback);
        });
    }
    makeGetPayrollCheckByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_check_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('check_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let checkId = args.getAsString("check_id");
            this._logic.getCheckById(correlationId, checkId, callback);
        });
    }
    makeCreatePayrollCheckCommand() {
        return new pip_services3_commons_node_2.Command("create_check", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('check', new PayrollCheckV1Schema_1.PayrollCheckV1Schema()), (correlationId, args, callback) => {
            let check = args.get("check");
            this._logic.createCheck(correlationId, check, callback);
        });
    }
    makeUpdatePayrollCheckCommand() {
        return new pip_services3_commons_node_2.Command("update_check", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('check', new PayrollCheckV1Schema_1.PayrollCheckV1Schema()), (correlationId, args, callback) => {
            let check = args.get("check");
            this._logic.updateCheck(correlationId, check, callback);
        });
    }
    makeDeletePayrollCheckByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_check_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('check_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let checkId = args.getAsNullableString("check_id");
            this._logic.deleteCheckById(correlationId, checkId, callback);
        });
    }
}
exports.PayrollChecksCommandSet = PayrollChecksCommandSet;
//# sourceMappingURL=PayrollChecksCommandSet.js.map
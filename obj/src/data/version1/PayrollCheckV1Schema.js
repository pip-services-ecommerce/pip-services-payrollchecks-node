"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const IncomeItemV1Schema_1 = require("./IncomeItemV1Schema");
class PayrollCheckV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('number', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('party_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('state', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('state_details', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('period_from', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('period_to', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('create_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('update_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('paid_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('payment_method_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('payment_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('check_number', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('income', new pip_services3_commons_node_2.ArraySchema(new IncomeItemV1Schema_1.IncomeItemV1Schema()));
        this.withRequiredProperty('income_total', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('ytd_income_total', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('deductions', new pip_services3_commons_node_2.ArraySchema(new IncomeItemV1Schema_1.IncomeItemV1Schema()));
        this.withOptionalProperty('deductions_total', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('ytd_deductions_total', pip_services3_commons_node_3.TypeCode.Float);
        this.withRequiredProperty('net_total', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('ytd_net_total', pip_services3_commons_node_3.TypeCode.Float);
    }
}
exports.PayrollCheckV1Schema = PayrollCheckV1Schema;
//# sourceMappingURL=PayrollCheckV1Schema.js.map
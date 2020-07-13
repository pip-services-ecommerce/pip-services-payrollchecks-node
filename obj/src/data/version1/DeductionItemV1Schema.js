"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class DeductionItemV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('description', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('total', pip_services3_commons_node_2.TypeCode.Float);
        this.withOptionalProperty('ytd_total', pip_services3_commons_node_2.TypeCode.Float);
    }
}
exports.DeductionItemV1Schema = DeductionItemV1Schema;
//# sourceMappingURL=DeductionItemV1Schema.js.map
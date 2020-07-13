"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class ShippingDetailsV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('recipient', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('phone', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('line1', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('line2', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('city', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('state', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('postal_code', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('country_code', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('instructions', pip_services3_commons_node_2.TypeCode.String);
    }
}
exports.ShippingDetailsV1Schema = ShippingDetailsV1Schema;
//# sourceMappingURL=ShippingDetailsV1Schema.js.map
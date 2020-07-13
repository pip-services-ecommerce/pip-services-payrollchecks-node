"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const PayrollChecksServiceFactory_1 = require("../build/PayrollChecksServiceFactory");
class PayrollChecksLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("payroll_checks", "Payroll checks function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-payrollchecks', 'controller', 'default', '*', '*'));
        this._factories.add(new PayrollChecksServiceFactory_1.PayrollChecksServiceFactory());
    }
}
exports.PayrollChecksLambdaFunction = PayrollChecksLambdaFunction;
exports.handler = new PayrollChecksLambdaFunction().getHandler();
//# sourceMappingURL=PayrollChecksLambdaFunction.js.map
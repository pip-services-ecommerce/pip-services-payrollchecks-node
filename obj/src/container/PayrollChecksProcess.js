"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const PayrollChecksServiceFactory_1 = require("../build/PayrollChecksServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class PayrollChecksProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("payroll_checks", "Payroll checks microservice");
        this._factories.add(new PayrollChecksServiceFactory_1.PayrollChecksServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.PayrollChecksProcess = PayrollChecksProcess;
//# sourceMappingURL=PayrollChecksProcess.js.map
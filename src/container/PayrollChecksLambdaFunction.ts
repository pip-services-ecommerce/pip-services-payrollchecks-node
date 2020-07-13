import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { PayrollChecksServiceFactory } from '../build/PayrollChecksServiceFactory';

export class PayrollChecksLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("payroll_checks", "Payroll checks function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-payrollchecks', 'controller', 'default', '*', '*'));
        this._factories.add(new PayrollChecksServiceFactory());
    }
}

export const handler = new PayrollChecksLambdaFunction().getHandler();
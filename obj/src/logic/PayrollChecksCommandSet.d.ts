import { CommandSet } from 'pip-services3-commons-node';
import { IPayrollChecksController } from './IPayrollChecksController';
export declare class PayrollChecksCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IPayrollChecksController);
    private makeGetPayrollChecksCommand;
    private makeGetPayrollCheckByIdCommand;
    private makeCreatePayrollCheckCommand;
    private makeUpdatePayrollCheckCommand;
    private makeDeletePayrollCheckByIdCommand;
}

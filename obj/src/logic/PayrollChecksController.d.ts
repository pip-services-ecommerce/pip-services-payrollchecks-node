import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { IPayrollChecksController } from './IPayrollChecksController';
export declare class PayrollChecksController implements IConfigurable, IReferenceable, ICommandable, IPayrollChecksController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getChecks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void;
    getCheckById(correlationId: string, id: string, callback: (err: any, check: PayrollCheckV1) => void): void;
    createCheck(correlationId: string, check: PayrollCheckV1, callback: (err: any, payroll_check: PayrollCheckV1) => void): void;
    updateCheck(correlationId: string, check: PayrollCheckV1, callback: (err: any, payroll_check: PayrollCheckV1) => void): void;
    deleteCheckById(correlationId: string, id: string, callback: (err: any, check: PayrollCheckV1) => void): void;
}

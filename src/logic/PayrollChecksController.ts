// let async = require('async');

// import { ConfigParams } from 'pip-services3-commons-node';
// import { IConfigurable } from 'pip-services3-commons-node';
// import { IReferences } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { IReferenceable } from 'pip-services3-commons-node';
// import { DependencyResolver } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { ICommandable } from 'pip-services3-commons-node';
// import { CommandSet } from 'pip-services3-commons-node';
// import { BadRequestException } from 'pip-services3-commons-node';

// import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
// import { PayrollCheckStateV1 } from '../data/version1/PayrollCheckStateV1';
// import { IPayrollChecksPersistence } from '../persistence/IPayrollChecksPersistence';
// import { IPayrollChecksController } from './IPayrollChecksController';
// import { PayrollChecksCommandSet } from './PayrollChecksCommandSet';
// import { UnauthorizedException } from 'pip-services3-commons-node/obj/src/errors/UnauthorizedException';

// export class PayrollChecksController implements  IConfigurable, IReferenceable, ICommandable, IPayrollChecksController {
//     private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
//         'dependencies.persistence', 'pip-services-payrollchecks:persistence:*:*:1.0'
//     );

//     private _dependencyResolver: DependencyResolver = new DependencyResolver(PayrollChecksController._defaultConfig);
//     private _persistence: IPayrollChecksPersistence;
//     private _commandSet: PayrollChecksCommandSet;

//     public configure(config: ConfigParams): void {
//         this._dependencyResolver.configure(config);
//     }

//     public setReferences(references: IReferences): void {
//         this._dependencyResolver.setReferences(references);
//         this._persistence = this._dependencyResolver.getOneRequired<IPayrollChecksPersistence>('persistence');
//     }

//     public getCommandSet(): CommandSet {
//         if (this._commandSet == null)
//             this._commandSet = new PayrollChecksCommandSet(this);
//         return this._commandSet;
//     }
    
//     public getChecks(correlationId: string, filter: FilterParams, paging: PagingParams, 
//         callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void {
//         this._persistence.getPageByFilter(correlationId, filter, paging, callback);
//     }

//     public getCheckById(correlationId: string, id: string, customerId: string,
//         callback: (err: any, check: PayrollCheckV1) => void): void {
//         this._persistence.getOneById(correlationId, id, (err, check) => {
//             // Do not allow to access check of different customer
//             if (check && check.customer_id != customerId)
//                 check = null;
            
//             callback(err, check);
//         });
//     }

//     public createCheck(correlationId: string, check: PayrollCheckV1, 
//         callback: (err: any, payroll_check: PayrollCheckV1) => void): void {

//         check.state = check.state || PayrollCheckStateV1.Ok;
//         check.create_time = new Date();
//         check.update_time = new Date();

//         this._persistence.create(correlationId, check, callback);
//     }

//     public updateCheck(correlationId: string, check: PayrollCheckV1, 
//         callback: (err: any, payroll_check: PayrollCheckV1) => void): void {

//         let newCheck: PayrollCheckV1;

//         check.state = check.state || PayrollCheckStateV1.Ok;
//         check.update_time = new Date();
    
//         async.series([
//             (callback) => {
//                 this._persistence.getOneById(correlationId, check.id, (err, data) => {
//                     if (err == null && data && data.customer_id != check.customer_id) {
//                         err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong payroll check customer id')
//                             .withDetails('id', check.id)
//                             .withDetails('customer_id', check.customer_id);
//                     }
//                     callback(err);
//                 });
//             },
//             (callback) => {
//                 this._persistence.update(correlationId, check, (err, data) => {
//                     newCheck = data;
//                     callback(err);
//                 });
//             }
//         ], (err) => {
//             callback(err, newCheck);
//         });
//     }

//     public deleteCheckById(correlationId: string, id: string, customerId: string,
//         callback: (err: any, check: PayrollCheckV1) => void): void {  

//         let oldCheck: PayrollCheckV1;

//         async.series([
//             (callback) => {
//                 this._persistence.getOneById(correlationId, id, (err, data) => {
//                     if (err == null && data && data.customer_id != customerId) {
//                         err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong payroll check customer id')
//                             .withDetails('id', id)
//                             .withDetails('customer_id', customerId);
//                     }
//                     callback(err);
//                 });
//             },
//             (callback) => {
//                 this._persistence.deleteById(correlationId, id, (err, data) => {
//                     oldCheck = data;
//                     callback(err);
//                 });
//             }
//         ], (err) => {
//             if (callback) callback(err, oldCheck);
//         });
//     }

// }

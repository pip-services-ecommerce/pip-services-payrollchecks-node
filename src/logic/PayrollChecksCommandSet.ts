import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { PayrollCheckV1Schema } from '../data/version1/PayrollCheckV1Schema';
import { IPayrollChecksController } from './IPayrollChecksController';

export class PayrollChecksCommandSet extends CommandSet {
    private _logic: IPayrollChecksController;

    constructor(logic: IPayrollChecksController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetPayrollChecksCommand());
		this.addCommand(this.makeGetPayrollCheckByIdCommand());
		this.addCommand(this.makeCreatePayrollCheckCommand());
		this.addCommand(this.makeUpdatePayrollCheckCommand());
		this.addCommand(this.makeDeletePayrollCheckByIdCommand());
    }

	private makeGetPayrollChecksCommand(): ICommand {
		return new Command(
			"get_checks",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getChecks(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetPayrollCheckByIdCommand(): ICommand {
		return new Command(
			"get_check_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('check_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let checkId = args.getAsString("check_id");
                this._logic.getCheckById(correlationId, checkId, callback);
            }
		);
	}

	private makeCreatePayrollCheckCommand(): ICommand {
		return new Command(
			"create_check",
			new ObjectSchema(true)
				.withRequiredProperty('check', new PayrollCheckV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let check = args.get("check");
                this._logic.createCheck(correlationId, check, callback);
            }
		);
	}

	private makeUpdatePayrollCheckCommand(): ICommand {
		return new Command(
			"update_check",
			new ObjectSchema(true)
				.withRequiredProperty('check', new PayrollCheckV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let check = args.get("check");
                this._logic.updateCheck(correlationId, check, callback);
            }
		);
	}
	
	private makeDeletePayrollCheckByIdCommand(): ICommand {
		return new Command(
			"delete_check_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('check_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let checkId = args.getAsNullableString("check_id");
                this._logic.deleteCheckById(correlationId, checkId, callback);
			}
		);
	}

}
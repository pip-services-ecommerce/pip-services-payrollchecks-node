import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class IncomeItemV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('description', TypeCode.String);
        this.withOptionalProperty('rate', TypeCode.Float);
        this.withOptionalProperty('hours', TypeCode.Float);
        this.withRequiredProperty('total', TypeCode.Float);
        this.withOptionalProperty('ytd_total', TypeCode.Float);
    }
}

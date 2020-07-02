import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class DeductionItemV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('description', TypeCode.String);
        this.withRequiredProperty('total', TypeCode.Float);
        this.withOptionalProperty('ytd_total', TypeCode.Float);
    }
}

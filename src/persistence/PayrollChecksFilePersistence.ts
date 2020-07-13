import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

import { PayrollChecksMemoryPersistence } from './PayrollChecksMemoryPersistence';
import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';

export class PayrollChecksFilePersistence extends PayrollChecksMemoryPersistence {
	protected _persister: JsonFilePersister<PayrollCheckV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<PayrollCheckV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}
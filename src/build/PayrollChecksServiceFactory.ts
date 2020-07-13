import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { PayrollChecksMongoDbPersistence } from '../persistence/PayrollChecksMongoDbPersistence';
import { PayrollChecksFilePersistence } from '../persistence/PayrollChecksFilePersistence';
import { PayrollChecksMemoryPersistence } from '../persistence/PayrollChecksMemoryPersistence';
import { PayrollChecksController } from '../logic/PayrollChecksController';
import { PayrollChecksHttpServiceV1 } from '../services/version1/PayrollChecksHttpServiceV1';

export class PayrollChecksServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-payrollchecks", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-payrollchecks", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-payrollchecks", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-payrollchecks", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-payrollchecks", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-payrollchecks", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(PayrollChecksServiceFactory.MemoryPersistenceDescriptor, PayrollChecksMemoryPersistence);
		this.registerAsType(PayrollChecksServiceFactory.FilePersistenceDescriptor, PayrollChecksFilePersistence);
		this.registerAsType(PayrollChecksServiceFactory.MongoDbPersistenceDescriptor, PayrollChecksMongoDbPersistence);
		this.registerAsType(PayrollChecksServiceFactory.ControllerDescriptor, PayrollChecksController);
		this.registerAsType(PayrollChecksServiceFactory.HttpServiceDescriptor, PayrollChecksHttpServiceV1);
	}
}

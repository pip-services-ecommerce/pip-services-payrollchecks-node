import { ConfigParams } from 'pip-services3-commons-node';

import { PayrollChecksMemoryPersistence } from '../../src/persistence/PayrollChecksMemoryPersistence';
import { PayrollChecksPersistenceFixture } from './PayrollChecksPersistenceFixture';

suite('PayrollChecksMemoryPersistence', ()=> {
    let persistence: PayrollChecksMemoryPersistence;
    let fixture: PayrollChecksPersistenceFixture;
    
    setup((done) => {
        persistence = new PayrollChecksMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new PayrollChecksPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});
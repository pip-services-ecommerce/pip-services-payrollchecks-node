import { ConfigParams } from 'pip-services3-commons-node';

import { PayrollChecksFilePersistence } from '../../src/persistence/PayrollChecksFilePersistence';
import { PayrollChecksPersistenceFixture } from './PayrollChecksPersistenceFixture';

suite('PayrollChecksFilePersistence', ()=> {
    let persistence: PayrollChecksFilePersistence;
    let fixture: PayrollChecksPersistenceFixture;
    
    setup((done) => {
        persistence = new PayrollChecksFilePersistence('./data/payroll_checks.test.json');

        fixture = new PayrollChecksPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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
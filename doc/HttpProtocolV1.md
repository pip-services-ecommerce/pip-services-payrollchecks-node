# HTTP Protocol (version 1) <br/> PayrollChecks Microservice

PayrollChecks microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [POST /v1/payroll_checks/get_checks](#operation1)
* [POST /v1/payroll_checks/get_check_by_id](#operation2)
* [POST /v1/payroll_checks/create_check](#operation3)
* [POST /v1/payroll_checks/update_check](#operation4)
* [POST /v1/payroll_checks/delete_check_by_id](#operation5)

## Operations

### <a name="operation1"></a> check: 'POST', route '/v1/payroll_checks/get_checks'

Get payroll checks by filter

**Request body:**
- filter: Object
    - id: string - (optional) unique check id
    - ids: string - (optional) list of unique check ids 
    - state: string - (optional) check state (PayrollCheckStateV1)
    - party_id: string - (optional) check reference party id
    - from_time: Date - (optional)  checks whose periods are in the range from_time - to_time
    - to_time: Date - (optional) checks whose periods are in the range from_time - to_time
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Page with retrieved payroll checks

### <a name="operation2"></a> check: 'POST', route '/v1/payroll_checks/get_check_by_id'

Get check by id

**Request body:**
- check_id: string - check id

**Response body:**
- check: PayrollCheckV1 - finded check 

### <a name="operation3"></a> check: 'POST', route '/v1/payroll_checks/create_check'

Add new check

**Request body:** 
- check: PayrollCheckV1 - params for creates new check

**Response body:**
- check: PayrollCheckV1 - created new check

### <a name="operation4"></a> check: 'POST', route '/v1/payroll_checks/update_check'

Update existed check

**Request body:**
- check: PayrollCheckV1 - params for update existed check

**Response body:**
- check: PayrollCheckV1 - updated check 

### <a name="operation5"></a> check: 'POST', route '/v1/payroll_checks/delete_check_by_id'

Delete check by id

**Request body:**
- check_id: string - check id for delete

**Response body:**
- check: PayrollCheckV1 - deleted check 


# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Payroll checks microservice

This is payroll checks microservice from Pip.Services library. 

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca, Lambda
* External APIs: HTTP/REST, Seneca, Lambda
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-payrollchecks-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)
  - [Lambda Version 1](doc/LambdaProtocolV1.md)

## Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class PayrollCheckV1 implements IStringIdentifiable {
    public id: string;
    public number?: string;
    public party_id: string;
    public state?: string;
    public state_details?: string;

    public period_from?: Date;
    public period_to?: Date;

    public create_time?: Date;
    public update_time?: Date;
    public paid_time?: Date;
    
    public payment_method_id?: string;
    public payment_id?: string;
    public check_number?: string;
    
    public income?: IncomeItemV1[];
    public income_total: number;
    public ytd_income_total?: number;

    public deductions?: DeductionItemV1[];
    public deductions_total?: number;
    public ytd_deductions_total?: number;

    public net_total: number;
    public ytd_net_total?: number;
}

class PayrollCheckStateV1 {
    public static New: string = "new";
    public static Canceled: string = "canceled";
    public static Paid: string = "paid";
    public static Failed: string = "failed";
}

interface IPayrollChecksV1 {
    getChecks(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PayrollCheckV1>) => void): void;

    getCheckById(correlationId: string, check_id: string,
        callback: (err: any, check: PayrollCheckV1) => void): void;

    createCheck(correlationId: string, check: PayrollCheckV1, 
        callback: (err: any, check: PayrollCheckV1) => void): void;

    updateCheck(correlationId: string, check: PayrollCheckV1, 
        callback: (err: any, check: PayrollCheckV1) => void): void;

    deleteCheckById(correlationId: string, check_id: string,
        callback: (err: any, check: PayrollCheckV1) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-ecommerce/pip-services-payrollchecks-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-payrollchecks"
  description: "PayrollChecks microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-payrollchecks:persistence:file:default:1.0"
  path: "./data/payroll_checks.json"

- descriptor: "pip-services-payrollchecks:controller:default:default:1.0"

- descriptor: "pip-services-payrollchecks:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-payrollchecks-node": "^1.1.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-payrollchecks-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.PayrollChecksHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new payroll_check
var payroll_check = {
    id: '2',
    party_id: '2',
    income: [
        {
            description: 'task 3',
            total: 700,
            hours: 50,
            rate: 14
        },
        {
            description: 'task 4',
            total: 1680,
            hours: 120,
            rate: 14
        },
    ],
    deductions: [
        {
            description: 'commission 5',
            total: 35,
            ytd_total: 5
        }
    ],
    state: PayrollCheckStateV1.New,
    income_total: 0,
    net_total: 2340
};

client.createCheck(
    null,
    payroll_check,
    function (err, payroll_check) {
        ...
    }
);
```

```javascript
// Get the list of payroll_checks
client.getChecks(
    null,
    {
        party_id: '2',
        state: PayrollCheckStateV1.New
    },
    {
        total: true,
        skip: 0,
        take: 10
    },
    function(err, page) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Denis Kuznetsov*.

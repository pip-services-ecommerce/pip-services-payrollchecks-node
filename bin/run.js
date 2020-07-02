let PayrollChecksProcess = require('../obj/src/container/PayrollChecksProcess').PayrollChecksProcess;

try {
    new PayrollChecksProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}

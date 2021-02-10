const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function reportManager(tid) {
    const csvWriter = createCsvWriter({
        path: `./reports/${tid}.csv`,
        header: [
            {id: 'name', title: 'NAME'},
            {id: 'lang', title: 'LANGUAGE'}
        ]
    });

    const appendRecordToReportFile = (records) => {
        return new Promise((resolve, reject) => {
            csvWriter.writeRecords(records)
            .then(() => {
                resolve('done');
            });
        });
    };

    return {
        appendRecordToReportFile,
    };

};

module.exports = reportManager;
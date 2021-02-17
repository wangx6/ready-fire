const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function reportManager(tid) {
    const csvWriter = createCsvWriter({
        path: `./reports/${tid}.csv`,
        header: [
            {id: 'rid', title: 'rid'},
            {id: 'dateTime', title: 'dateTime'},
            {id: 'data', title: 'data'},
            // {id: 'duration', title: 'duration'},
            // {id: 'startTime', title: 'startTime'},
            // {id: 'endTime', title: 'endTime'},
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
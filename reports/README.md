# Ready-Fire

This is a library aiming to perform common performance tests.
###  Load tests
`POST`  
`/run-test`
```json
{
    "config":{
        "url": "https://jsonplaceholder.typicode.com/todos/1",
        "methodType": "get",
        "maxThroughput": 10,
        "testType": "stress",
        "duration":10, 
        "payload": {
            "name": "test name",
            "id:": "112233445566-xx-cc-11166"
        }
    }
}
```

### Burst test
```json
{
    "config":{
        "url": "https://jsonplaceholder.typicode.com/todos/1",
        "methodType": "get",
        "maxThroughput": 10,
        "testType": "stress",
        "duration":10, 
        "payload": {
            "name": "test name",
            "id:": "112233445566-xx-cc-11166"
        }
    }
}
```

### Stress test
```json
{
    "config":{
        "url": "https://jsonplaceholder.typicode.com/todos/1",
        "methodType": "get",
        "maxThroughput": 10,
        "testType": "stress",
        "duration":10, 
        "payload": {
            "name": "test name",
            "id:": "112233445566-xx-cc-11166"
        }
    }
}
```
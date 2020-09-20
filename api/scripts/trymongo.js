const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';

// Atlas URL - replace UUU with user, PPP with passcode, XXX with hostname
//const url = 'mondb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

function testWithCallbacks(callback) {
    console.log('\n--- testWithCallbacks ---');
    const client = new MongoClient(url, { useUnifiedTopology: true }); // 'useNewUrlParser' has been replaced by 'useUnifiedTopology'; former is deprecated
    client.connect( (err, client)  => {
        if(err) {
            callback(err);
            return;
        }
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('employees');
        const employee = { id: 1, name: 'A. Callback', age: 23 };
        collection.insertOne(employee, (err, result) => {
            if(err) {
                client.close();
                callback(err);
                return;
            }
            console.log('Result of insert:\n', result.insertedId);
            collection.find({_id: result.insertedId})
                      .toArray( (err, docs) => {
                        if(err) {
                            client.close();
                            callback(err);
                            return;
                        }
                        console.log('Result of find:\n', docs);
                        client.close();
                        callback(err);
                        });
        });
    });
}

async function testWithAsync() {  // preferable method than the callback method as this is much cleaner
    console.log('\n--- testWithAsync ---');
    const client = new MongoClient(url, {useUnifiedTopology: true} );
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('employees');
        const employee = {id: 2, name: 'B. Async', age: 16};
        const result = await collection.insertOne(employee);
        console.log('Result of insert:\n', result.insertedId);
        const docs = await collection.find({_id: result.insertedId})
                                     .toArray();
        console.log('Result of find:\n', docs);
    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }
}

testWithCallbacks(err => {
    if(err){
        console.log(err);
    }
    testWithAsync();
});
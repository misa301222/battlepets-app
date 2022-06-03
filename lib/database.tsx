import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = await MongoClient.connect(`mongodb+srv://misael:admin@cluster0.ti88g.mongodb.net/BattlePetsDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as any);

    return client;
}
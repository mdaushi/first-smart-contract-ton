import { Address, TonClient, Cell } from 'ton'

let address = Address.parse('YOUR CONTRACT ADDRESS');

(async () => {
    // Create sandbox API client
    const client = new TonClient({
        endpoint: 'https://sandbox.tonhubapi.com/jsonRPC'
    });

    // Call get method and log the result
    let counter = await client.callGetMethod(address, 'counter');
    console.log('Counter', parseInt(counter.stack[0][1], 16));

    let owner = await client.callGetMethod(address, 'owner');
    let ownerCell = Cell.fromBoc(Buffer.from(owner.stack[0][1].bytes, 'base64'))[0];
    let ownerAddress = ownerCell.beginParse().readAddress()?.toFriendly({ testOnly: true });
    console.log('Address: ', ownerAddress);
})()
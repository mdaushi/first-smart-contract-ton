import { Cell, contractAddress, StateInit, toNano, beginCell, Address } from 'ton';
import { readFileSync } from 'fs';
import qs from 'qs';
import qrcode from 'qrcode-terminal';

// Create a data cell similar to the initial contract state
const dataCell = beginCell()
    .storeUint(0, 32)                        // counter
    .storeAddress(Address.parse('/* YOUR ADDRESS */'))
    .endCell();

// Load code from build
const codeCell = Cell.fromBoc(readFileSync('./build/hello-world.boc'))[0];

// Calculate address from code & data
const address = contractAddress({
    workchain: 0,
    initialCode: codeCell,
    initialData: dataCell
});

// Prepare init message
const initCell = new Cell();
new StateInit({
    code: codeCell,
    data: dataCell,
}).writeTo(initCell);

// Encode link to deploy contract
let link = 'https://test.tonhub.com/transfer/' + address.toFriendly({ testOnly: true }) + '?' + qs.stringify({
    text: 'Deploy contract',
    amount: toNano(1).toString(10),
    init: initCell.toBoc({ idx: false }).toString('base64')
});
console.log(toNano(1).toString(10))
console.log('Address: ' + address.toFriendly({ testOnly: true }));
qrcode.generate(link, { small: true }, (code) => {
     console.log(code)
});
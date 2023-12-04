import fs from 'fs'
import { yarg } from './config/plugins/args.plugin';

const { b: base, l: limit, s: show } = yarg;

let tableResultOutput: string = ''
let headerMessage: string = `
***********************************
           ${base} TIMES TABLE       
***********************************\n
`;

for (let i = 1; i <= limit; i++) {
    tableResultOutput += `${base} x ${i} = ${ i * base} \n`
}

tableResultOutput = headerMessage + tableResultOutput;

if ( show ) {
    console.log(tableResultOutput)
}
const outputPath = `outputs`
fs.mkdirSync(outputPath, {recursive: true});
fs.writeFileSync(`${outputPath}/table-${base}.txt`, tableResultOutput, 'utf8')

console.log('>>> Proccess completed')
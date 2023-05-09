import * as fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
//@ts-ignore
import PERMISSIONS from './permissions';
import * as mysql from 'mysql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function csvToArr(stringVal: string, splitter: string = ',') {
	const [keys, ...rest] = stringVal
		.trim()
		.split('\n')
		.map((item) => item.split(splitter));
	const formedArr = rest.map((item) => {
		const object: any = {};
		keys.forEach((key, index) => (object[key] = item.at(index)));
		return object;
	});
	return formedArr;
}



export class ETL {
	private csvData: any;
	private allowedColumns: string[];
	private rawData: string;
	private checkIntervalid: any;

	private filename: string;
	private position: string;

	// Filters the data based on the permissions
	private filterForWithPermissions(data: any, allowedColumns: string[]) {
		return data.map((row: any) => {
			const filteredRow: any = {};

			allowedColumns.forEach((column: string) => {
				filteredRow[column] = row[column];
			});
			return filteredRow;
		});
	}

	private trimData(data: any, length: number) {
		return data.slice(0, length);
	}

	constructor(filename: string, position: string) {
		if (!filename || !position) return;

		this.filename = filename;
		this.position = position;
		const rawData: any = fs.readFileSync(path.resolve(__dirname, `${filename}.csv`), 'utf8');

		if (!rawData) return;
		this.rawData = rawData;
		let unfilteredData: any = csvToArr(rawData, ',');

		unfilteredData = this.trimData(unfilteredData, 50);

		this.allowedColumns = PERMISSIONS[position][filename];

		this.csvData = this.filterForWithPermissions(unfilteredData, this.allowedColumns);
		this.saveData(filename, position);

	}

	getData() {
		return this.csvData;
	}

	getColumns() {
		return this.allowedColumns;
	}

	private saveData(filename: string, position: string) {
		//save
		// const csvRaw = csvToArr(this.csvData, ",");
		// fs.writeFileSync(path.resolve(__dirname, `${filename}_${position}.csv`), csvRaw);
	}
}

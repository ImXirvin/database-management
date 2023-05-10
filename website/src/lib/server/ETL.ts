import * as fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
//@ts-ignore
import PERMISSIONS from './permissions';

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

function arrToCsv(arr: any, splitter: string = ',') {
	const keys = Object.keys(arr[0]);
	const values = arr.map((item: any) => Object.values(item));
	const csv = [keys, ...values].map((item) => item.join(splitter)).join('\n');
	return csv;
}



export class ETL {
	private csvData: any;
	private allowedColumns: string[];

	private filename: string;
	private position: string;

	// Filters the data based on the permissions
	private filterForWithPermissions(data: any, allowedColumns: string[]) {
		return data.map((row: any) => {
			const filteredRow: any = {};

			// Filters the row based on the allowed columns
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

		// Sets the filename and position
		this.filename = filename;
		this.position = position;

		// Gets the raw data from the file
		const rawData: any = fs.readFileSync(path.resolve(__dirname, `${filename}.csv`), 'utf8');

		if (!rawData) return;

		// Processes CVS data to JSON
		let unfilteredData: any = csvToArr(rawData, ',');

		// Trims the data to 50 rows
		unfilteredData = this.trimData(unfilteredData, 50);

		// Gets the allowed columns for the user
		this.allowedColumns = PERMISSIONS[position][filename];

		// Filters the data based on the permissions
		this.csvData = this.filterForWithPermissions(unfilteredData, this.allowedColumns);

		// Saves the data to a file
		this.saveData(filename, position);

	}

	getData() {
		return this.csvData;
	}

	getColumns() {
		return this.allowedColumns;
	}

	private saveData(filename: string, position: string) {
		const csvRaw = arrToCsv(this.csvData, ",");
		// Writes the data to a file with the filename and position
		fs.writeFileSync(path.resolve(__dirname, `./processed/${filename}_${position}.csv`), csvRaw);
	}
}

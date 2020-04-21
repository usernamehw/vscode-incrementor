import { suite, test, beforeEach, afterEach, before, describe, it } from 'mocha';
import vscode, { Range, Position, Selection } from 'vscode';
import _ from 'lodash';
import { expect } from 'chai';

import { Incrementor } from '../../extension';

const DELAY_VALUE = 100;
const editor = vscode.window.activeTextEditor;
const { document } = editor;
// const inc = new Incrementor();

const delay = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));


function getEntireRange(): vscode.Range {
	const lastLineRange = document.lineAt(document.lineCount - 1).range;
	return new vscode.Range(0, 0, lastLineRange.end.line, lastLineRange.end.character);
}
async function setDocumentText(text: string): Promise<boolean> {
	const completeRange = getEntireRange();
	return await editor.edit(builder => {
		builder.replace(completeRange, text);
	});
}
async function getAllEditorText(): Promise<string> {
	await delay(DELAY_VALUE);
	return document.getText();
}
async function runIncrement(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.incByOne');
}
async function runIncrement10(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.incByTen');
}
async function runIncrement01(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.incByTenth');
}
async function runDecrement(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.decByOne');
}
async function runDecrement10(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.decByTen');
}
async function runDecrement01(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.decByTenth');
}
interface IIdk {
	startOfTheDocument: [number, number, number, number];
}
const quickSelection: IIdk = {
	startOfTheDocument: [0, 0, 0, 1],
};
function setSelection(n1: [number, number, number, number]): void {
	editor.selection = new Selection(...n1);
	// if (typeof n3 === 'number' && typeof n4 === 'number') {
	// 	editor.selection = new Selection(n1, n2, n3, n4);
	// } else {
	// 	editor.selection = new Selection(n1, n2, n1, n2);
	// }
}

beforeEach(done => setTimeout(done, 100));
// afterEach(done => setTimeout(done, 500));

describe('One cursor, simple examples', () => {
	it('Increment 1️ should be 2', async () => {
		await setDocumentText('1');
		await runIncrement();
		const text = await getAllEditorText();
		expect(text).to.equal('2');
	});

	it('Decrement 1 should be 0', async () => {
		await setDocumentText('1');
		await runDecrement();
		const text = await getAllEditorText();
		expect(text).to.equal('0');
	});

	it('Increment 1 by 10  should be 11', async () => {
		await setDocumentText('1');
		await runIncrement10();
		const text = await getAllEditorText();
		expect(text).to.equal('11');
	});
	it('Decrement 0 by 10  should be -10', async () => {
		await setDocumentText('0');
		await runDecrement10();
		const text = await getAllEditorText();
		expect(text).to.equal('-10');
	});

	// it('Increment -512 by 0.1  should be -511.9', async () => {
	// 	await setDocumentText('-100');
	// 	await runIncrement01();
	// 	const text = await getAllEditorText();
	// 	expect(text).to.equal('-99.9');
	// });
	it('Decrement -20 by 0.1  should be -20.1', async () => {
		await setDocumentText('-20');
		await runDecrement01();
		const text = await getAllEditorText();
		expect(text).to.equal('-20.1');
	});
});

describe('Numbers with text, like "1px"', () => {
	it('Increment 0px should be 1px', async () => {
		await setDocumentText('0px');
		await runIncrement();
		const text = await getAllEditorText();
		expect(text).to.equal('1px');
	});
	it('Decrement 0px should be -1px', async () => {
		await setDocumentText('0px');
		await runDecrement();
		const text = await getAllEditorText();
		expect(text).to.equal('-1px');
	});
});

import { suite, test, beforeEach, afterEach, before, describe, it } from 'mocha';
import vscode, { Range, Position, Selection } from 'vscode';
import { expect } from 'chai';


const DELAY_VALUE = 100;
const editor = vscode.window.activeTextEditor;
const { document } = editor;

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

async function inc(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.incByOne');
}
async function inc10(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.incByTen');
}
async function inc01(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.incByTenth');
}
async function dec(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.decByOne');
}
async function dec10(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.decByTen');
}
async function dec01(): Promise<void> {
	await vscode.commands.executeCommand('incrementor.decByTenth');
}
async function incByCustomValue(value: number): Promise<void> {
	await vscode.commands.executeCommand('incrementor.incByCustomValue', value);
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
		await inc();
		const text = await getAllEditorText();
		expect(text).to.equal('2');
	});

	it('Decrement 1 should be 0', async () => {
		await setDocumentText('1');
		await dec();
		const text = await getAllEditorText();
		expect(text).to.equal('0');
	});

	it('Increment 1 by 10  should be 11', async () => {
		await setDocumentText('1');
		await inc10();
		const text = await getAllEditorText();
		expect(text).to.equal('11');
	});
	it('Decrement 0 by 10  should be -10', async () => {
		await setDocumentText('0');
		await dec10();
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
		await dec01();
		const text = await getAllEditorText();
		expect(text).to.equal('-20.1');
	});
});

describe('Numbers with text, like "1px"', () => {
	it('Increment 0px should be 1px', async () => {
		await setDocumentText('0px');
		await inc();
		const text = await getAllEditorText();
		expect(text).to.equal('1px');
	});
	it('Decrement 0px should be -1px', async () => {
		await setDocumentText('0px');
		await dec();
		const text = await getAllEditorText();
		expect(text).to.equal('-1px');
	});
});

describe('Custom values', () => {
	it('Inc 10 by 12.5 => 22.5', async () => {
		await setDocumentText('10');
		await incByCustomValue(12.5);
		const text = await getAllEditorText();
		expect(text).to.equal('22.5');
	});
	it('Inc -12 by -500', async () => {
		await setDocumentText('-12');
		await incByCustomValue(-500);
		const text = await getAllEditorText();
		expect(text).to.equal('-512');
	});
});

import { suite, test, beforeEach, afterEach, before, describe, it } from 'mocha';
import vscode, { Range, Position, Selection } from 'vscode';
import { expect } from 'chai';

import { config } from '../../extension';

const DELAY_VALUE = 100;
const editor = vscode.window.activeTextEditor;
const { document } = editor;

const delay = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

config.enums = [
	['one', 'two'],
	['❤', '🧡', '💛'],
];

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
interface Sel {
	[key: string]: [number, number, number, number];
}
const sel: Sel = {
	startOfTheDocument: [0, 0, 0, 0],
};
function setSelection(n1: [number, number, number, number]): void {
	editor.selection = new Selection(...n1);
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

	it('Increment -512 by 0.1  should be -511.9', async () => {
		await setDocumentText('-512');
		setSelection(sel.startOfTheDocument);
		await inc01();
		const text = await getAllEditorText();
		expect(text).to.equal('-511.9');
	});
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

describe('Enums', () => {
	it('one => two', async () => {
		await setDocumentText('one');
		await inc();
		const text = await getAllEditorText();
		expect(text).to.equal('two');
	});
	it('❤ => 🧡', async () => {
		await setDocumentText('❤');
		await inc();
		const text = await getAllEditorText();
		expect(text).to.equal('🧡');
	});
	it('💛 => ❤ (cycle)', async () => {
		await setDocumentText('💛');
		await inc();
		const text = await getAllEditorText();
		expect(text).to.equal('❤');
	});
});

describe('Multi cursor', () => {
	it('Multi line', async () => {
		const multilinetext = `1px\n2px`;
		await setDocumentText(multilinetext);
		const firstSelection = new Selection(...sel.startOfTheDocument);
		const secondSelection = new Selection(1, 0, 1, 0);
		editor.selections = [firstSelection, secondSelection];
		await inc();
		const text = await getAllEditorText();
		const multilineResult = `2px\n3px`;
		expect(text).to.equal(multilineResult);
	});
	it('Multiple cursors on a single line', async () => {
		await setDocumentText('1px 2px');
		const firstSelection = new Selection(...sel.startOfTheDocument);
		const secondSelection = new Selection(0, 4, 0, 4);
		editor.selections = [firstSelection, secondSelection];
		await inc();
		const text = await getAllEditorText();
		expect(text).to.equal('2px 3px');
	});
});

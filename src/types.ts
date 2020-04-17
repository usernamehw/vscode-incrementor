import vscode from 'vscode';

export interface IConfig {
	loopEnums: boolean;

	enums: string[][];

	decimalPlaces: number;
}

export interface IPosChar {
	pos: vscode.Position;
	char: string;
}

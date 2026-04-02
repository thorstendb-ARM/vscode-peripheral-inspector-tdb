/********************************************************************************
 * Copyright (C) 2024 Arm Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE File
 ********************************************************************************/

import * as vscode from 'vscode';
import * as manifest from '../../manifest';
import { PeripheralBaseNode } from '../../model/peripheral/nodes';
import { PeripheralBaseNodeDTO } from '../../common/peripheral-dto';
import { CDTTreeDataProvider, CDTTreeWebviewViewProvider } from '@eclipse-cdt-cloud/vscode-ui-components/lib/vscode-types';

export class PeripheralsTreeTableWebView extends CDTTreeWebviewViewProvider<PeripheralBaseNode> {
    public static viewType = `${manifest.PACKAGE_NAME}.peripheral-treetable`;

    public constructor(
        protected dataProvider: CDTTreeDataProvider<PeripheralBaseNode, PeripheralBaseNodeDTO>,
        protected context: vscode.ExtensionContext,
    ) {
        super(dataProvider, context);
        this.resolveWebviewView = this.resolveWebviewView.bind(this);
    }

    async activate(context: vscode.ExtensionContext): Promise<void> {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(PeripheralsTreeTableWebView.viewType, this)
        );
    }

    async resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext<unknown>,
        _token: vscode.CancellationToken
    ): Promise<void> {
        await super.resolveWebviewView(webviewView, _context, _token);
        webviewView.title = 'Peripheral Tree Table';
    }
}

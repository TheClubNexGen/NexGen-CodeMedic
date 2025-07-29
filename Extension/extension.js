const vscode = require('vscode');
const OpenAI = require('openai');
require('dotenv').config()
class CodeMedicViewProvider {
	constructor(_extensionUri) {
		this._extensionUri = _extensionUri;
		this.openai = new OpenAI({ 
			apiKey:process.env.OPENAI_API_KEY 
		});
	}

	async debugCode(code) {
		try {
			const response = await this.openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "system",
						content: "You are a code debugging assistant. Only provide the fixed code without any explanations or code block markers."
					},
					{
						role: "user",
						content: `Debug and fix this code:\n\n${code}`
					}
				],
				temperature: 0.7,
				max_tokens: 1500
			});

			// Strip code block markers if they exist
			let result = response.choices[0].message.content;
			result = result.replace(/```[\w]*\n?|\n```$/g, '').trim();
			return result;
		} catch (error) {
			console.error('OpenAI API Error:', error);
			return `Error: ${error.message}`;
		}
	}

	// This is required - it's the main entry point for the view
	resolveWebviewView(webviewView, context, _token) {
		this._view = webviewView;
		
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		};

		// Handle messages from the webview
		webviewView.webview.onDidReceiveMessage(async (message) => {
			if (message.command === 'debug') {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					const code = editor.document.getText();
					vscode.window.showInformationMessage('Debugging code...');
					const debugResult = await this.debugCode(code);
					this.updateContent(code, editor.document.fileName.split('/').pop(), debugResult);
				}
			}
		});

		// Get initial content
		this.updateContentFromActiveEditor();

		// Update content when the active editor changes
		vscode.window.onDidChangeActiveTextEditor(() => {
			this.updateContentFromActiveEditor();
		});

		// Update content when the editor content changes
		vscode.workspace.onDidChangeTextDocument((event) => {
			const activeEditor = vscode.window.activeTextEditor;
			if (activeEditor && event.document === activeEditor.document) {
				this.updateContentFromActiveEditor();
			}
		});
	}

	updateContentFromActiveEditor() {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const code = document.getText();
			const fileName = document.fileName.split('/').pop(); // Get just the filename
			this.updateContent(code, fileName);
		} else {
			this.updateContent('No file is currently open.', 'No File');
		}
	}

	updateContent(content, fileName, debugResult = null) {
		if (this._view) {
			const escapedContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			const escapedDebugResult = debugResult ? debugResult.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
			
			this._view.webview.html = `
				<!DOCTYPE html>
				<html>
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<style>
							body { 
								padding: 10px; 
								font-family: var(--vscode-editor-font-family);
								font-size: var(--vscode-editor-font-size);
								background-color: var(--vscode-editor-background);
							}
							.button {
								background-color: var(--vscode-button-background);
								color: var(--vscode-button-foreground);
								border: none;
								padding: 8px 12px;
								cursor: pointer;
								margin: 5px;
								border-radius: 4px;
								font-weight: 500;
							}
							.button:hover {
								background-color: var(--vscode-button-hoverBackground);
							}
							pre { 
								white-space: pre-wrap; 
								word-wrap: break-word;
								margin: 10px 0;
								padding: 15px;
								background-color: #1e1e1e;  /* Dark background */
								border: 1px solid #333;
								border-radius: 6px;
								color: #d4d4d4;  /* Light gray text */
								box-shadow: 0 2px 4px rgba(0,0,0,0.2);
								line-height: 1.5;
							}
							.button-container {
								display: flex;
								gap: 10px;
								margin-bottom: 15px;
								padding: 10px;
								background-color: var(--vscode-editor-background);
								border-radius: 6px;
							}
							.output-container {
								background-color: transparent;
								border-radius: 6px;
								padding: 10px;
							}
						</style>
					</head>
					<body>
						<div class="button-container">
							<button class="button" onclick="debugCode()">Debug</button>
							${debugResult ? `<button class="button" onclick="copyDebuggedCode()">Copy Fixed Code</button>` : ''}
						</div>
						<div class="output-container">
							${debugResult ? `<pre>${escapedDebugResult}</pre>` : `<pre>${escapedContent}</pre>`}
						</div>
						<script>
							const vscode = acquireVsCodeApi();
							
							function debugCode() {
								vscode.postMessage({
									command: 'debug'
								});
							}

							function copyDebuggedCode() {
								const code = document.querySelector('pre').textContent;
								navigator.clipboard.writeText(code)
									.then(() => {
										const button = document.querySelector('button:last-child');
										button.textContent = 'Copied!';
										setTimeout(() => {
											button.textContent = 'Copy Fixed Code';
										}, 1000);
									});
							}
						</script>
					</body>
				</html>
			`;
		}
	}
}

function activate(context) {
	console.log('CodeMedic Extension is now active!');

	// Register the WebView provider
	const provider = new CodeMedicViewProvider(context.extensionUri);
	let disposableView = vscode.window.registerWebviewViewProvider(
		'codemedic-view',
		provider,
		{
			webviewOptions: { retainContextWhenHidden: true }
		}
	);

	context.subscriptions.push(disposableView);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

import {   createTheme } from "@uiw/codemirror-themes";
import { tags as t } from '@lezer/highlight';
export const  InputTheme= createTheme({
    theme: 'dark',
    settings: {
        background: '#000000',
        backgroundImage: '',
        foreground: '#ffffff',
        caret: '#c4d0b9',
        selection: '#D6D6D6',
        selectionMatch: '#000000',
        gutterBackground: '#000000',
        gutterForeground: '#6d6d55',
        gutterBorder: '#000000',
        gutterActiveForeground: '#a91919',
        lineHighlight: '#424242',
    },
    styles: [
        { tag: t.comment, color: '#008a02' },
        { tag: t.lineComment, color: '#f57575' },
        { tag: t.definition(t.typeName), color: '#194a7b' },
        { tag: t.typeName, color: '#194a7b' },
        { tag: t.tagName, color: '#008a06' },
        { tag: t.variableName, color: '#008a06' },
    ],
});
export const  OutputTheme= createTheme({
    theme: 'dark',
    settings: {
        background: '#000000',
        backgroundImage: '',
        foreground: '#ffffff',
        caret: '#c4d0b9',
        selection: '#D6D6D6',
        selectionMatch: '#000000',
        gutterBackground: '#000000',
        gutterForeground: '#6d6d55',
        gutterBorder: '#000000',
        gutterActiveForeground: '#a91919',
        lineHighlight: '#424242',
    },
    styles: [
        { tag: t.comment, color: '#787b80' },
        { tag: t.lineComment, color: '#f57575' },
        { tag: t.definition(t.typeName), color: '#194a7b' },
        { tag: t.typeName, color: '#194a7b' },
        { tag: t.tagName, color: '#008a02' },
        { tag: t.variableName, color: '#008a02' },
    ],
});

export const myOutputStyle = {
    paddingBottom: '0px',
    borderColor: 'white',
    borderWidth: '6px',  
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
  };
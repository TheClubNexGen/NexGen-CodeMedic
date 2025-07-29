import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import {  loadLanguage } from '@uiw/codemirror-extensions-langs';
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode';
const OutputEditor=({myOutputStyle,responseValue,editorLang})=>{
  //  console.log(editorLang);
 console.log(responseValue);
 return (
    <>
         
      <CodeMirror
      value={responseValue? responseValue:'' }
      height="200px"
      style={myOutputStyle}
      theme={xcodeLight }
      extensions={[loadLanguage( editorLang),EditorView.lineWrapping]}
      readOnly
        />
        </>
 )   
}
export default OutputEditor
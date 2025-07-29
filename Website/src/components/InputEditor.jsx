import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useState } from 'react';
import { langNames, loadLanguage } from '@uiw/codemirror-extensions-langs';
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode';
const InputEditor = ({ myStyle, setValue, setEditorLang }) =>
{

    const [lang, setLang] = useState(langNames[0])
    const langHandler = (e) =>
    {
        setEditorLang(e.target.value)
        setLang(e.target.value)
    }
    return (
        <>
            


            <select onChange={langHandler} className=' border-b-0 rounded-t-xl px-1 py-2 bg-white text-black ' >
                {langNames.sort().map((language, index) => (
                    <option className='text-black' value={language} key={index} >{language}</option>
                ))}
            </select>
            <CodeMirror
            placeholder={'Enter Code'}
                className='border-2 '
                height="300px"
                style={myStyle}
                theme={  xcodeLight}
                extensions={[loadLanguage(lang),EditorView.lineWrapping]}
                onChange={(value, viewUpdate) =>
                {
                    setValue(value)
                    console.log(viewUpdate);
                }}
                />
                </>
        
    )
}
export default InputEditor
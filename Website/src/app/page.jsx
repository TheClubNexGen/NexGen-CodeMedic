'use client'
import { useState } from "react"
import axios from "axios";
import InputEditor from "../components/InputEditor";
import Button from "../components/Button";
import OutputEditor from "../components/OutputEditor";
import { InputTheme, inputTheme, myOutputStyle, OutputTheme } from "@/constants";

const Debugger = () =>
{
    const [editorLang, setEditorLang] = useState('javascript')
    const [value, setValue] = useState('')
    const [inputError, setInputError] = useState('')
    const [loading, setLoading] = useState(false)
    const [resOutput, setResOutput] = useState('')
    const [error, setError] = useState('')
    const myStyle={paddingBottom:'0px',borderColor:'white', borderTopWidth:'6px',borderTopRightRadius:'10px' }
    
    const debuggerHandler = async () =>
    {
        if (  !value)
        {
            console.log(!value);
          return setError('Code is Required !');
        }

        try
        {
            setError('')
            setLoading(true)
            console.log(value, inputError);
            const response = await axios.post('/api/debug', {
                codeLang:editorLang, value, inputError }).then((res) =>
            {
                console.log(res);
                setResOutput(res.data?.debugged)
                setLoading(false)
            })

        } catch (error)
        {
            console.log(error);

        }
    }
     
    return (
        <>
        
            <InputEditor setEditorLang={setEditorLang} setValue={setValue} myStyle={myStyle} />
            <label className="flex border-none px-1 py-4 gap-1 rounded-b-lg  bg-white text-black" >
                <span>
                    Error Input:
                </span>
                <textarea className="flex-1 p-1 border-black/25 border"  type="text" placeholder="Enter error or log" onChange={e => setInputError(e.target.value)} />
            </label>
            <Button handler={debuggerHandler} btnName={loading ? 'Debugging' : 'Debug'} />
            <p className="text-red-500" >
                {error}
            </p>
            {
                 !resOutput ?<></>: <OutputEditor editorLang={editorLang} myTheme={OutputTheme} responseValue={resOutput} myOutputStyle={myOutputStyle} />  
            }
 
        </>
    )
}
export default Debugger
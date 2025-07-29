"use client"
import { useState } from "react";
import Button from "../../components/Button";
import InputEditor from "../../components/InputEditor";
import OutputEditor from "../../components/OutputEditor";
import { InputTheme, myOutputStyle, OutputTheme } from "@/constants";
import axios from "axios";

const Explainer = () =>
{
    const [editorLang, setEditorLang] = useState('javascript')
    const [loading, setLoading] = useState(false)
    const [resOutput, setResOutput] = useState('')
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const myStyle={paddingBottom:'0px',borderColor:'white',borderBottomWidth:'6px',borderTopWidth:'6px',borderTopRightRadius:'10px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}
 
    const explainerHandler = async () =>
    {
        console.log(value);
        if ( !value)
        {
             
            return setError('Code is Required !');
        }
        try
        {
            setError('')
            setLoading(true)
            console.log(value,);
            const response = await axios.post('/api/explain', { value ,codeLang:editorLang}).then((res) =>
            {
                console.log(res);
                setResOutput(res.data?.explanation)
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
            <Button handler={explainerHandler} btnName={loading ? 'Loading' : 'Explain'} />
            <p className="text-red-500" >
                {error}
            </p>
            {
                !resOutput ?<></>: <OutputEditor editorLang={editorLang} myOutputStyle={myOutputStyle} responseValue={resOutput} />   
            }
        </>
    )
}
export default Explainer
"use client"
import { useState } from "react";
import Button from "../../components/Button";
import InputEditor from "../../components/InputEditor";
import OutputEditor from "../../components/OutputEditor";
import { myOutputStyle } from "@/constants";
import axios from "axios";

const Commenter = () =>
{
    const [editorLang, setEditorLang] = useState('javascript')
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [resOutput, setResOutput] = useState('')
    const [error, setError] = useState('')
    const myStyle={paddingBottom:'0px',borderColor:'white',borderBottomWidth:'6px',borderTopWidth:'6px',borderTopRightRadius:'10px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}
 
    const commentHandler =async () =>
    {
        if (value == 'Enter Code' || !value)
            {
                return setError('Code is Required !');
            }
            try
            {
                setError('')
                setLoading(true)
                console.log(value);
                const response = await axios.post('/api/comment', { value ,codeLang:editorLang}).then((res) =>
                {
                    console.log(res);
                    setResOutput(res.data?.commented)
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
            <Button handler={commentHandler} btnName={loading ? 'Commenting' : 'Comment'} />
            <p className="text-red-500" >
                {error}
            </p>
            {
                 !resOutput ?<></>: <OutputEditor editorLang={editorLang} myOutputStyle={myOutputStyle} responseValue={resOutput}  />   
            }
        </>
    )
}
export default Commenter
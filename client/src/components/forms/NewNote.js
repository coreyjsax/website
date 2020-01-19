import React, { useState } from "react"
import ReactDOM from 'react-dom'
import { Row, Col } from "reactstrap";
import { PageHeader, Drawer, Switch } from 'antd'
import {Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap'
import Select, {components} from 'react-select'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



const NewNote = (props) => {
    const [show, setShow] = useState('editor')
    const [title, setTitle] = useState()
console.log(props)
    const handleClick = (e, action) => {
        setShow(action)
    }
    return (
        <>
        <button onClick={(e) => handleClick(e, 'preview')}>Preview</button><button onClick={(e) => handleClick(e, 'editor')}>Editor</button>
        <span>blah {props.NotebookId}</span>
        {   show == 'preview' ? 
            <>
                <h1>{props.Name || 'Note title'}</h1>

                <div>{ReactHtmlParser(props.Body)}</div>
            </>
                              : 
            <>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type="text" defaultValue={props.Name || "Title"}  onChange={(e) => props.handleForm(e, 'noteTitle') }/>
                </FormGroup>
                <FormGroup>
                    <Label>Create your note...</Label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={props.Body || 'test'}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            props.handleInput(data)
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    
                    />
                </FormGroup>
            
            </>
        }

        
        </>
    )
}
export default NewNote
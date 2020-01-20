import React, { useState } from "react"
import ReactDOM from 'react-dom'
import { Row, Col } from "reactstrap";
import { PageHeader, Drawer, Switch, Icon} from 'antd'
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
                    <Input type="text" defaultValue={props.Name || ""}  onChange={(e) => props.handleForm(e, 'noteTitle') }/>
                </FormGroup>
                <FormGroup>
                    <Label>Summary</Label>
                    <Input type="textarea" defaultValue={props.Summary || ''} onChange={(e) => props.handleForm(e, 'noteSummary')} />
                </FormGroup>
                <FormGroup>
                    <Label>Public ?</Label>
                    <Switch 
                        checkedChildren={<Icon type="check"/>}
                        unCheckedChildren={<Icon type="close"/>}
                        defaultChecked
                        onChange={(e) => props.Public(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Create your note...</Label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={props.Body || ''}
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
                <Button
                    onClick={(e) => props.createNewNote()}
                >
                    Submit
                </Button>        
            </>
        }

        
        </>
    )
}
export default NewNote
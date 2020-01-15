import React, { useState } from "react"
import ReactDOM from 'react-dom'
import { Row, Col } from "reactstrap";
import { PageHeader, Drawer, Switch } from 'antd'
import {Form, FormGroup, FormText, Input, Button } from 'reactstrap'
import Select, {components} from 'react-select'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



const NewNote = (props) => {
    const [show, setShow] = useState('editor')
    const [title, setTitle] = useState()

    const handleClick = (e, action) => {
        setShow(action)
    }
    return (
        <>
        <button onClick={(e) => handleClick(e, 'preview')}>Preview</button><button onClick={(e) => handleClick(e, 'editor')}>Editor</button>
        {   show == 'preview' ? 
            <div>{ReactHtmlParser(props.Body)}</div>
                              : 
            <CKEditor
                editor={ ClassicEditor }
                data={props.body || 'test'}
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
        }

        <FormGroup>
            <Input type="text" placeHolder="note title" />
        </FormGroup>
        </>
    )
}
export default NewNote
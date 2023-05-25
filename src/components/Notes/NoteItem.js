import React, { Component } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Api from '../Api';
import Helper from '../Helper';

class NoteItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            isEditing:false,
            note:{}
        }
    }
    componentDidMount(){
        this.setState({
            note:this.props.note
        })
    }
    deleteHanlder(event){
        let note = this.state.note;
        let that = this;
        let api = Api;
        api.setUserToken();
        this.setState({
            isLoading:true
        })
        api.axios().delete('/note/delete/'+note.note_id).then(res=>{
            Helper.alert(res.data.message)
            that.props.reload()
            if(res.data.type){
                that.setState({
                    isLoading:false
                })
            }else{
                that.setState({
                    isLoading:false
                })
            }
            
        })
    }
    onEditHandler(){
        this.setState({
            isEditing:true
        })
    }
    onNoteChange(e){
        let oldNote = this.state.note;
        this.setState({
            note:{
                ...oldNote,
                note_details:e.target.value
            }
        })
    }
    noteUpdateHandler(){
        let note = this.state.note;
        let that = this;
        let api = Api;
        api.setUserToken();
        this.setState({
            isLoading:true
        })
        let data ={
            note_id:note.note_id,
            details:note.note_details,
        }
        api.axios().put('/note/update',data).then(res=>{
            Helper.alert(res.data.message)
            if(res.data.type){
                that.setState({
                    isEditing:false,
                    isLoading:false
                })
            }else{
                that.setState({
                    isLoading:false
                })
            }
            
        })
    }
    editor(){
        if(!this.state.isEditing){
            return<></>
        }
        return(
            <>
                <div className='note_create_form'>
                    <Input name="note" value={this.state.note.note_details} onChange={this.onNoteChange.bind(this)} inputType="textarea" />
                    <Button title="Save" onClick={this.noteUpdateHandler.bind(this)}/>
                </div>
            </>
        )
    }
    getContents(){
        if(this.state.isEditing){
            return<></>
        }
        let note = this.state.note;
        return <div className='note_text'><pre>{note.note_details}</pre></div>
    }
    controllers(){
        if(this.state.isEditing){
            return<></>
        }
        return (
            <div className='note_controller'>
                <span onClick={this.onEditHandler.bind(this)}>Edit</span>
                <span className='delete' onClick={this.deleteHanlder.bind(this)}>Delete</span>
            </div>
        )
    }
    render() {
        if(this.state.isLoading){
            return <p>Loading...</p>
        }
        return (
            <div className='note_item_wraper'>
                {this.editor()}
                {this.getContents()}
                {this.controllers()}

                
            </div>
        );
    }
}

export default NoteItem;
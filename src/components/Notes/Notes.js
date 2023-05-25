import React, { Component } from 'react';
import NoteItem from './NoteItem';
import Api from '../Api';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Helper from '../Helper';

class Notes extends Component {
    constructor(props){
        super(props);
        this.state = {
            note:'',
            isLoading:false,
            isCreating:false,
            notes:[]
        }
    }
    componentDidMount(){
        this.loadNotes();
    }
    loadNotes(){
        let api = Api;
        api.setUserToken();
        let that = this;
        this.setState({
            notes:[],
            isLoading:true
        })
        api.axios().get('/note/get/'+this.props.type+'/'+this.props.integrator).then(res=>{
            that.setState({
                isLoading:false,
                notes:res.data.data
            })
        })
    }
    onNoteChange(e){
        this.setState({
            note:e.target.value
        })
    }
    noteCreateHandler(e){
        let note  = this.state.note;
        let api = Api;
        api.setUserToken();
        this.setState({
            isCreating:true
        })
        let data = {
            details:note,
            integrator:this.props.integrator,
            type:this.props.type
        }
        let that = this;
        api.axios().post('/note/create',data).then(res=>{
            that.setState({
                isCreating:false,
                note:''
            })
            that.loadNotes();
            Helper.alert(res.data.message)
        })
    }
    render() {
        return (
            <div className='notes_section'>
                <div className='note_create_form'>
                    <Input name="note" value={this.state.note} onChange={this.onNoteChange.bind(this)} label="Note" inputType="textarea" />
                    <Button title="Create" onClick={this.noteCreateHandler.bind(this)}/>
                </div>
                <div className='all_notes_list'>
                {
                    this.state.notes.map( (note,key) => {
                        return <NoteItem note={note} key={key} reload={this.loadNotes.bind(this)} />
                    } )
                }
                </div>
                
            </div>
        );
    }
}

export default Notes;
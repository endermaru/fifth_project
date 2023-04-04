import Note from "./note.js";

const Notes = {
    notearray: [],
    note_add(what,due){
        const note=new Note(what,due);
        this.notearray.push(note);
        this.notearray_save();
        return note;
    },
    note_remove(note){
        const index=this.notearray.indexOf(note);
        this.notearray.splice(index,1);
        this.notearray_save();
        return note;
    },
    note_modify(note,what,due){
        const index=this.notearray.indexOf(note);
        this.notearray.splice(index,1,new Note(what,due));
        this.notearray_save();
        return note;
    },
    togglefinish(note){
        note.finished=!note.finished;
    },
    notearray_save(){
        localStorage.setItem("notearray",JSON.stringify(this.notearray));
    },
    notearray_load(){
        const lst=localStorage.getItem("notearray");
        const lst2=JSON.parse(lst);
        if (lst2){
            this.notearray=[];
            lst2.forEach((element)=>{
                this.note_add(element['what'],element['due']);
            });
        };
    },
}

export default Notes;
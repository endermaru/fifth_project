import Notes from './notearray.js';

const app = {
    lstpanel: document.getElementById("lst_panel"),
    form: document.querySelector("form"),
    whatInput: document.getElementById("what"),
    dueInput: document.getElementById("due"),
    actionbtn: document.getElementById("action"),
    ismodi: false,
    moditempnote: "",

    init(){
        Notes.notearray_load();
        this.renderArray();
        this.form.addEventListener("submit",(event)=>{
            if (!this.ismodi){
                event.preventDefault();
            }
            const what=this.whatInput.value;
            const due=this.dueInput.value;
            if (what && due){
                if (this.ismodi && this.moditempnote){
                    Notes.note_modify(this.moditempnote,what,due);
                    this.ismodi=false;
                    this.moditempnote="";
                } else {
                    const anote=Notes.note_add(what,due);
                    this.renderNote(anote);
                    this.whatInput.value="";
                    this.dueInput.value="";
                }
            } else {
                alert("error : 유효하지 않은 값이 존재합니다!")
            }
        });
    },
    renderNote(note){
        const li=document.createElement("li");
        if (note.finished){
            li.classList.add("finished");
        }
        
        const div=document.createElement("div");
        div.textContent=`${note.what} - ${note.due}`;
        div.classList.add("what");
        

        const checkbtn=document.createElement("button");
        checkbtn.classList.add("check");
        checkbtn.textContent='\u2714\uFE0F';
        checkbtn.addEventListener("click",()=>{
            Notes.togglefinish(note);
            this.renderArray();
        });

        const delbtn=document.createElement("button");
        delbtn.classList.add("del");
        delbtn.textContent="\u{1F5D1}\u{FE0F}";
        delbtn.addEventListener("click",()=>{
            Notes.note_remove(note);
            this.renderArray();
        });

        const modibtn=document.createElement("button");
        modibtn.classList.add("modi");
        modibtn.textContent="\u270F\uFE0F";
        modibtn.addEventListener("click",()=>{
            this.whatInput.value=note.what;
            this.dueInput.value=note.due;
            this.ismodi=true;
            this.moditempnote=note;
            this.renderArray();
            this.actionbtn.textContent="수정";
        });

        li.appendChild(checkbtn);
        li.appendChild(delbtn);
        li.appendChild(modibtn);
        li.appendChild(div);
        this.lstpanel.appendChild(li);
    },
    renderArray(){
        this.lstpanel.innerHTML="";
        Notes.notearray.forEach((note)=>{
            this.renderNote(note);
        })
    }
}

app.init();
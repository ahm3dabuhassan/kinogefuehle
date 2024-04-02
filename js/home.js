let fetchConn = { 
    host: './fetchOverview.php?addFilm=',
    init: function (data) {
        console.log(99);
        fetch(fetchConn.host+data)
        .then(response => {
            return response.text();
        })
        .then(response => {
            document.getElementById('status').innerHTML = response;
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }
}

let addFilm = {
    trigger: document.getElementById('addFilm-button'),
    parent: document.getElementById('addFilm'),
    elements: ['Titel', 'Regisseur', 'Genre', 'Datum', 'Gedanke', 'Dauern', 'Poster'],
    forCancel: {
    	el: [],
    	bt: document.querySelector('#addFilm-cancel')
    },
    variables: {
        'lab': null,
        'inp': null,
        'reflection': {
            storage: {el:null, label:null},
            attributes : {'id':'Gedanke','name':'Gedanke','cols':'10','rows':'17'}
        }
    },
    values: {
        source: null,
        storage: {}
    },
    task: function () {
        document.addEventListener('scoll', () => {console.log('b');})
        window.scrollTo({ top: 600, behavior: 'smooth' });
    	addFilm.forCancel.bt.addEventListener('click', addFilm.cancel);
    	addFilm.forCancel.bt.style.display = 'block';
        addFilm.trigger.innerHTML = 'Absenden';
        for(let i=0; i<addFilm.elements.length; i++) {
            if(addFilm.elements[i] == 'Poster') { 
                addFilm.variables['lab'] = document.createElement('label');
                addFilm.variables['inp'] = document.createElement('input');
                addFilm.variables['inp'].type = 'file'; 
                addFilm.variables['inp'].className = 'sendValues';
                addFilm.variables['inp'].name = addFilm.elements[i];
                addFilm.variables['inp'].id = addFilm.elements[i];
                addFilm.variables['lab'].htmlFor = addFilm.elements[i];
                addFilm.variables['lab'].innerHTML = `${addFilm.elements[i]}:`;
                addFilm.parent.insertBefore(addFilm.variables['lab'], addFilm.trigger);  
                addFilm.parent.insertBefore(addFilm.variables['inp'], addFilm.trigger);  
            } else if(addFilm.elements[i] == 'Gedanke') {
               addFilm.variables.reflection.storage.el = document.createElement('textarea');
               addFilm.variables.reflection.storage.el.className = 'sendValues';
               addFilm.variables.reflection.storage.label = document.createElement('label');
               addFilm.variables.reflection.storage.label.innerHTML = 'Dein bester Gedanke über dieses bewegende Bild:';
               addFilm.variables.reflection.storage.label.htmlFor = 'Gedanke';
                for(let key in addFilm.variables.reflection.attributes) {
                    addFilm.variables.reflection.storage.el[key] = addFilm.variables.reflection.attributes[key];
                }
              addFilm.parent.insertBefore(addFilm.variables.reflection.storage.label, addFilm.trigger);
              addFilm.parent.insertBefore(addFilm.variables.reflection.storage.el, addFilm.trigger);
            } else {
                if(addFilm.elements[i-1] == 'Datum') {
                    addFilm.variables['inp'].placeholder = "YYYY-MM-DD";
                }
                addFilm.variables['lab'] = document.createElement('label');
                addFilm.variables['inp'] = document.createElement('input');
                addFilm.variables['inp'].className = 'sendValues';
                addFilm.variables['inp'].id = addFilm.elements[i];
                addFilm.variables['inp'].name = addFilm.elements[i];
                addFilm.variables['lab'].htmlFor = addFilm.elements[i];
                addFilm.variables['lab'].innerHTML = `${addFilm.elements[i]}:`;
                addFilm.parent.insertBefore(addFilm.variables['lab'], addFilm.trigger);
                addFilm.parent.insertBefore(addFilm.variables['inp'], addFilm.trigger);
            }
        }
        addFilm.trigger.removeEventListener("click", addFilm.task);
        addFilm.trigger.addEventListener('click', addFilm.saveValues);
    },
    assignEvent: function (e) { 
        addFilm.trigger.addEventListener('click', addFilm.task);
    },
    saveValues: function (e) { 
        let counter = 0;
        let labels = document.querySelectorAll('#addFilm > label');
        addFilm.values.source = document.querySelectorAll('#addFilm > .sendValues');
        addFilm.values.storage['UserID'] = e.target.value;
        for(let i=0; i<addFilm.values.source.length; i++) {  
            if(addFilm.values.source[i].value.length != 0) {
                if(addFilm.values.source[i].id != 'Poster') {
                    addFilm.values.storage[addFilm.values.source[i].id] = addFilm.values.source[i].value; 
                } 
            }  else {
                counter++;
                labels[i].style.color = 'red';
            }
        }
        if(counter == 0) {
            fetchConn.init(JSON.stringify(addFilm.values.storage)); 
            sendPoster.init();
            for(let i=0; i<addFilm.values.source.length; i++) {
                addFilm.values.source[i].value = null; 
                labels[i].style.color = 'black';
            }
            setTimeout(() => {
                document.querySelector('#status').innerHTML = '';
            }, 1700);
        }
    },
    cancel: function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        addFilm.forCancel.el[0] = document.querySelectorAll('#addFilm > input');
        addFilm.forCancel.el[1] = document.querySelectorAll('#addFilm > label');
        addFilm.forCancel.el[2] = document.querySelectorAll('#addFilm > textarea');
      	for(let i=0; i<addFilm.forCancel.el.length; i++) {
      	    for(let z=0; z<addFilm.forCancel.el[i].length; z++) {
      			addFilm.forCancel.el[i][z].remove();
      		}
      	}
      	addFilm.trigger.innerHTML = 'Add..[ ]';
      	addFilm.forCancel.bt.style.display = 'none';
      	addFilm.trigger.removeEventListener("click", addFilm.saveValues);
      	addFilm.trigger.addEventListener('click', addFilm.task);
    }
}

class FetchTask {  
    constructor(par, val, mt) { 
        this.par = par;
        this.val = val;
        this.host = './fetchOverview.php?';
        this.fuse = null;
        this.mt = mt;
        this.cards = null;
    }
    connect() {
        this.fuse = this.host+this.par+'='+this.val;
        fetch(this.fuse)
        .then(response => {
            return response.json();
        })
        .then(response => { 
            this.cards = new Cards(response, '#overview', {'display':'grid','grid-template-columns':'1fr 1fr','justify-self':'center','width':'70%','min-height':'60vh','padding':'2px','background-color':'gainsboro','color':'blue','font-family':'monospace','border-radius':'10px','margin':'5px','padding':'15px','box-shadow':'0px 6px 10px 1px rgba(60, 60, 60, .4)'});
        })
        .catch(err => {
            console.log(err);
        })
        return this.outz;
    }
} 

class RemoveElements {
    constructor(target, prafix ,type = null) {
        this.target = target; 
        this.type = type;
        this.prafix = prafix;
        this.source = null;
    }
    go() {
        if (this.type != null) {
            this.source = document.querySelectorAll(`${this.prafix}${this.target} > ${this.type}`);
        } else {
            this.source = document.querySelectorAll(`${this.prafix}${this.target} > *`);
        }
        console.log("Klasse:"+this.source, `${this.prafix}${this.target} > ${this.type}`);
        for(let i=0; i<this.source.length; i++) {
            this.source[i].remove();
        }
    }
}

class Cards {
    constructor(data, parent, style) {
        this.data = data; 
        this.parent = document.querySelector(parent);
        this.cardstyle = style;
        this.userID = null,
        this.elements = { 
            parent: null, 
            child: {i: null, l: null},
            poster: {},
            buttonParent: null, 
            buttonParent: null,
            delete: { 
                evnt: (e) => { 
                    if(window.confirm(`Willst du ${e.target.name} aus Datenbank löschen?`)) {
                        new FetchTask('delUserFilm', e.target.value).connect();
                        e.target.parentElement.remove();
                    }   
                }, 
                el: null,
                attr: {'innerHTML':'Löschen', 'style':'grid-column:2/3;grid-row:1/2;justify-self:end;width:50px;height:50px;border-radius:50%;border:0;padding:5px;background-color:white;font-family:futura;color:blue;display:flex;align-items:center;justify-content:center;'}
            },
            edit: {
                save: {kinder: {}, status: null, inputs: {}},
                evnt: (e) => {
                    this.elements.send.el[e.target.parentElement.id] = document.createElement('button');
                    for(let key in this.elements.send.attr) {
                        this.elements.send.el[e.target.parentElement.id][key] =  this.elements.send.attr[key];
                    }
                    this.elements.send.el[e.target.parentElement.id].addEventListener('click', this.elements.send.evnt);
                    e.target.parentElement.appendChild(this.elements.send.el[e.target.parentElement.id]);
                    this.elements.edit.save.kinder[e.target.parentElement.id] = document.querySelectorAll(`#${e.target.parentElement.id} > *`);
                    for(let i=0; i<this.elements.edit.save.kinder[e.target.parentElement.id].length; i++) {
                        if(this.elements.edit.save.kinder[e.target.parentElement.id][i].nodeName == 'P') {
                            this.elements.edit.save.kinder[e.target.parentElement.id][i].remove();
                        }
                    }
                    let askForButton = document.querySelectorAll('.editCancel');
                    const movieID = e.target.parentElement.id.replace("e","");
                    for(let i=0; i<askForButton.length; i++) {
                         if(movieID == askForButton[i].value) {
                            askForButton[i].innerHTML = 'Cancel'; 
                            askForButton[i].removeEventListener('click', this.elements.edit.evnt);
                            askForButton[i].addEventListener('click', (e) => {
                                this.elements.edit.save.inputs[e.target.parentElement.id] = document.querySelectorAll(`#${e.target.parentElement.id} > .edit-input`);
                                    if(Object.keys(this.elements.edit.save.inputs).length > 0) {
                                        for(let i=0; i<this.elements.edit.save.inputs[e.target.parentElement.id].length; i++) {
                                            this.elements.edit.save.inputs[e.target.parentElement.id][i].remove();
                                        }
                                    }
                                    for(let i=0; i<this.elements.edit.save.kinder[e.target.parentElement.id].length; i++) {
                                        e.target.parentElement.appendChild(this.elements.edit.save.kinder[e.target.parentElement.id][i]);
                                    }
                                    askForButton[i].addEventListener('click', this.elements.edit.evnt);
                                    askForButton[i].innerHTML = 'Edit';
                                    this.elements.send.el[e.target.parentElement.id].remove();
                                    this.elements.edit.save.inputs[e.target.parentElement.id] = {};
                                });
                         }
                    }
                    for(let key1 in this.data) {
                        if(this.data[key1]['Id'] == e.target.parentElement.id.replace("e","")) {
                            for(let key2 in this.data[key1]) {
                                if (key2 != 'Gedanke' && key2 != 'Id' && key2 != 'UserID' && key2 != 'Poster') {
                                    this.elements.child.i = document.createElement('input'); 
                                    this.elements.child.i.setAttribute('style','height:3vh;align-self:center;border-radius:5px;border:0;');
                                    this.elements.child.i.className = 'edit-input';
                                    this.elements.child.i.id = key2;
                                    this.elements.child.i.value = this.data[key1][key2]; 
                                    this.elements.child.l = document.createElement('label');
                                    this.elements.child.l.className = 'edit-input';
                                    this.elements.child.l.innerHTML = key2+':';
                                    this.elements.child.l.style.alignSelf = 'center';
                                    e.target.parentElement.appendChild(this.elements.child.l);
                                    e.target.parentElement.appendChild(this.elements.child.i); 
                                } else if (key2 == 'Gedanke') {
                                    this.elements.child.i = document.createElement('textarea'); 
                                    this.elements.child.i.className = 'edit-input';
                                    this.elements.child.i.id = key2;
                                    this.elements.child.i.style.borderRadius = '5px';
                                    this.elements.child.i.style.border = 0;
                                    this.elements.child.i.value = this.data[key1][key2];
                                    this.elements.child.l = document.createElement('label');
                                    this.elements.child.l.className = 'edit-input';
                                    this.elements.child.l.innerHTML = key2+':';
                                    e.target.parentElement.appendChild(this.elements.child.l);
                                    e.target.parentElement.appendChild(this.elements.child.i);
                                }
                            }
                        }
                    }
                },
                el: null,
                attr: {'innerHTML':'Edit', 'style':'grid-column:2/3;grid-row:1/2;justify-self:end;align-self:center;width:50px;height:50px;border-radius:50%;border:0;padding:5px;background-color:white;font-family:futura;color:blue;'}
            },
            send: {
                el: {},
                values: {},
                source: null,
                attr: {'innerHTML':'Senden', 'style':'grid-column:2/3;grid-row:1/2;justify-self:end;align-self:end;width:50px;height:50px;border-radius:50%;border:0;padding:5px;background-color:white;font-family:futura;color:blue;'},
                evnt: (e) => {
                   this.elements.send.source = document.querySelectorAll(`#${e.target.parentElement.id} > .edit-input`);
                   const movieID = e.target.parentElement.id.replace("e","");
                   this.elements.send.values[movieID] = {};
                   for(let i=0; i<this.elements.send.source.length; i++) {
                        if(this.elements.send.source[i].tagName == 'INPUT' || this.elements.send.source[i].tagName == 'TEXTAREA') {
                            this.elements.send.values[movieID][this.elements.send.source[i].id] = this.elements.send.source[i].value;
                        }
                   }
                   let js = JSON.stringify(this.elements.send.values);
                   new FetchTask('updateMovie', js ).connect();
                   for(let key in this.elements.send.values[movieID]) {
                       if(key != 'Id' && key != 'Poster' && key != 'UserID') {
                            let par = document.createElement('p');
                            par.setAttribute('style', 'grid-column:1/2; display: block');
                            par.innerHTML = `${key}: ${this.elements.send.values[movieID][key]}`;
                            e.target.parentElement.appendChild(par);
                      }
                   }
                   this.elements.send.values = {};
                   new RemoveElements(e.target.parentElement.id, '#', '.edit-input').go();
                   let askForButton = document.querySelectorAll('.editCancel');
                   for(let i=0; i<askForButton.length; i++) {
                        if(movieID == askForButton[i].value) {
                            askForButton[i].innerHTML = 'Edit';
                            askForButton[i].addEventListener('click', this.elements.edit.evnt);   
                        }
                   }
                   console.log('CheckID::'+this.userID);
                   let neueDatei = new FetchTask('get', this.userID).connect();
                   console.log(neueDatei);
                   this.elements.edit.save.kinder[e.target.parentElement.id] = {};
                   e.target.remove();
                }
            }
        }
    if(this.parent.children.length > 0) {
      new RemoveElements('overview', '#', '*').go();
    }
      this.build();
    }
    build() {
        console.log('Ahmed:'+this.parent.children.length, this.parent);
        for(let key01 in this.data) { 
            this.elements.parent = document.createElement('div'); 
            this.elements.parent.className = 'cards';
            this.elements.delete.el = document.createElement('button');
            this.elements.edit.el = document.createElement('button');
           for(let key in this.elements.edit.attr) {
                this.elements.edit.el[key] = this.elements.edit.attr[key];
            }
            for(let key in this.elements.delete.attr) {
                this.elements.delete.el[key] = this.elements.delete.attr[key];
            } 
            this.elements.delete.el.addEventListener('click', this.elements.delete.evnt);
            this.elements.edit.el.addEventListener('click', this.elements.edit.evnt);

            this.elements.poster[key01] = new Image(180, 220);
            this.elements.poster[key01].setAttribute('style', 'grid-column:1/2;grid-row:1/2;border-radius:5px;border:4px solid white;padding:4px;');
            this.elements.poster[key01].src = `./poster/${this.data[key01]['Poster']}`;
            for(let key in this.cardstyle) {
                    if(MQController.mediaTest() != 'mobile') {
                    this.elements.parent['style'][key] = this.cardstyle[key];      
                    }else {
                        this.elements.parent.setAttribute('style','display:grid;grid-template-columns:1fr 1fr;justify-self:center;width:80%;min-height:60vh;padding:2px;background-color:#BFBEBB;border-radius:10px;margin: 2% 7% 0% 7%;padding:2%;font-family:monospace;');
                    }
            }
            for(let key02 in this.data[key01]) { 
                this.elements.delete.el.value = this.data[key01]['Id'];
                this.elements.edit.el.value = this.data[key01]['Id'];
                this.elements.edit.el.className = 'editCancel';
                this.elements.delete.el.name = this.data[key01]['Titel'];
                this.elements.parent.id = 'e'+this.data[key01]['Id'];
                this.userID = this.data[key01]['UserID'];
                if(key02 != 'Id' && key02 != 'Poster' && key02 != 'UserID') {
                    this.elements.child = document.createElement('p');
                    this.elements.child.setAttribute('style', 'grid-column:1/2;  display: block');
                    this.elements.child.innerHTML = `${key02}: ${this.data[key01][key02]}`;
                    this.elements.parent.appendChild(this.elements.child);
                }
            }
            this.elements.parent.appendChild(this.elements.poster[key01]);
            this.elements.parent.appendChild(this.elements.delete.el);
            this.elements.parent.appendChild(this.elements.edit.el);
            this.parent.appendChild(this.elements.parent);
        }
    }
} 


let moveAddFilm = {
    oldParent: document.querySelector('#overview'),
    cards: null,
    aTagParent: document.querySelector('#sider'),
    saved: document.querySelector('#addFilm'),
    aTag: document.createElement('a'),
    go: function () {
        console.log(this.saved);
        this.saved.remove();
        this.aTag.innerHTML = 'Film fügen';
        if(MQController.mediaTest() == 'mobile') {
            this.aTag.setAttribute('style', 'display:flex;align-items:center;justify-content:center;width:81%;height:6vh;font-size:20px;border:2px solid blue;margin:0 auto;clear:both;padding:0;border-style:dotted;');
        }else{
            this.aTag.setAttribute('style', 'border: 4px solid blue; border-style: dotted;');
        }
        this.aTagParent.appendChild(moveAddFilm.aTag);
        this.aTag.addEventListener('click', (e) => {
            e.target.remove();

            if(this.oldParent.children.length > 0) {
                     new RemoveElements('overview', '#', '*').go();
                 this.oldParent.appendChild(this.saved);
             } else {
                 this.oldParent.appendChild(this.saved); 
             }
        });
    },
}
let sendPoster = {
    trigger: null,
    dataObject: null,
    send: function () {
        fetch('./fetchOverview.php?poster', {
            method: 'POST',
            body: this.dataObject
        })
        .then((response) => {
            response.text();
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    },
    init: function () {
        this.dataObject = new FormData(); 
        this.trigger = document.querySelector('#Poster');
        this.dataObject.append('poster', this.trigger.files[0]);
        this.send();
    }
}

let getPosts = {
    trigger: document.querySelector('#userPost'),
    id: null,
    data: null,
    parent: {
        source: document.querySelector('#overview'),
        child: null,
    },
    getData: function (x) {
        console.log(this.parent.source.children.length);
        this.id = x;
        fetch(`./fetchOverview.php?getPosts=${this.id}`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.data = response;
            this.build();
        })
        .catch(err => {
            console.log(err);
        })
    },
    build: function () {
        let saveTopic = null;
        if(this.parent.source.children.length > 0) {
            new RemoveElements('overview', '#', '*').go();
        }
        for(let i=0; i<this.data.length; i++) {
            let pParent = document.createElement('div');
                pParent.className = 'user-posts';
            for(let key in this.data[i]) {
                if(key == 'Topic') {
                    saveTopic = this.data[i][key];
                }
                let p = document.createElement('p');
                p.innerHTML = `${this.data[i][key]}`;
                pParent.appendChild(p);
            }
            let linkForum = document.createElement('a');
            linkForum.innerHTML = 'zum Thema >';
                linkForum.href= `./forum.php?Topic=${saveTopic}`;
            pParent.appendChild(linkForum);
            if(MQController.mediaTest() == 'mobile') {
                pParent.setAttribute('style','margin-left:2%');
                pParent.children[2].style.fontSize = '11px';
            }else {
                pParent.children[2].style.fontSize = '11px';
                pParent.children[2].style.marginLeft = '2%';

            }
            this.parent.source.appendChild(pParent);
        }
    }

}


let getUserFilm = document.querySelector('#userFilm');
    getUserFilm.addEventListener('click', (e) => {
    let gFilm = new FetchTask('get', e.target.getAttribute('value'));
    let ik = gFilm.connect();
    moveAddFilm.go();
}); 

let getUserPost = document.querySelector('#userPost');
    getUserPost.addEventListener('click', (e) => {
        console.log('posts...');
        getPosts.getData(e.target.getAttribute('value'));
        moveAddFilm.go();
});

addFilm.assignEvent(); 

document.getElementById('home-main').addEventListener('click', () => {
    let menu = document.getElementById('menu-input');
    menu.checked = false; 
});

class FetchFinder {  
	constructor(par, val, host) { 
		this.par = par;
		this.val = val;
		this.host = host;
		this.fuse = null;
		this.connect();
	}
	connect() {
		this.fuse = this.host+this.par+'='+this.val;
		fetch(this.fuse)
		.then(response => {
			return response.json();
		})
		.then(response => {
			finder.data = response;
			})
		.catch(err => {
			console.log(err);
		})
		return this.outz;
	}
}
let finder = {
    element: document.querySelector('#finder > input'),
    connection:null,
    data: null,
    out: null,
    parent: document.getElementById('outOfFinder'),
    cancelButton: {
        target: document.querySelector('#finder'),
        el: document.createElement('div')
    },
    funk:  (e) => {  	
            finder.out = {}
			console.log(this.data);
            for(let key01 in finder.data) { 
                for(let key02 in finder.data[key01]) { 
                    if(finder.data[key01]['Titel'].includes(finder.element.value)) {		
                            finder.out[finder.data[key01]['Titel']] = finder.data[key01];
                    } 
                }
            }
			console.log('SUCHEN');
			console.log(finder.element.value);
            finder.build();
    },
    build: function () {
		if(MQController.mediaTest() == 'mobile'){
			finder.parent.style.backgroundColor = 'gray';
		}
        console.log(Object.keys(finder.out).length);
        finder.cancelButton.el.addEventListener('click', (e) => {
            finder.parent.style.display = 'none';
            finder.element.value = '';
            e.target.remove();
        });
            this.parent.innerHTML = '';
            if(finder.element.value != '') {
                this.parent.style.display = 'block';
                finder.cancelButton.el.innerHTML = 'X';
                finder.cancelButton.el.setAttribute('style','display:flex;align-items:center;justify-content:center;position:relative;right:0px;top:0px;width:20px;height:18px;padding:1px;border-radius:50%;background-color:#252525;color:white;font-weigth:bold;float:right;margin-left:4%;margin-right:3%;');
                finder.cancelButton.target.appendChild(finder.cancelButton.el);
            } else {
                this.parent.style.display = 'none';
                finder.cancelButton.el.remove();
            }
            if(Object.keys(finder.out).length != 0){
                for(let key01 in this.out) {
                    this.parent.innerHTML += `<div style='height:9vh;border:2px solid white;padding:2%;font-family:monospace;margin-bottom:3px;border-radius:5px;'><span style='clear:both'></span><img src='./poster/${this.out[key01]['Poster']}' width='45' style='float:left;margin-right:2%;'><p class='finder-titel' style='vertical-align:top;margin-top:0px;width:240px;color:white;line-height:1vh;aline-height:top;'>Titel: ${this.out[key01]['Titel']}<span style="color:blue;font-size:36px;">.</span></p>
                    <a href='./filmpages/${this.out[key01]['Titel'].replaceAll(' ','')}.php'>Website von "${this.out[key01]['Titel']}"</a></div>`; 
					if(this.out[key01]['Titel'].length < 20){
						let finderTitel = document.querySelectorAll('.finder-titel');
						finderTitel[finderTitel.length-1].style.height = '4vh'; 
					}
				}
            }else{
                this.parent.innerHTML = "Sorry, wir haben das nicht &#128542;";
            }
		},
		init:() => {
			this.connection =  new FetchFinder('finder', 'film', './fetchOverview.php?');
			finder.element.addEventListener('click',() => {console.log('input');});
		}
    }
	
	let findEvent = document.querySelector('#finder > input');
	let finderInit = document.querySelector('#finder > input');
	finderInit.addEventListener('click', finder.init);
	findEvent.addEventListener('keyup',() => {finder.funk();}); 

    MQController = { 
        nav:{
            a:document.querySelectorAll('.mq-element'),
            parent: document.querySelector('#selection'),
            target: document.querySelector('#menu-show'),
            finder: {
                parent: document.querySelector('nav'),
                source: [document.querySelector('#finder'),document.querySelector('#outOfFinder')],
                el: document.createElement('li')
            },
            li:[], 
            logo: {
                parent: document.querySelector('#logo'),
                child: document.querySelectorAll('#logo > p')
            }
        },
        main:{  
            parent: document.querySelector('#home-main'),
            sider: document.querySelector('#sider'),
            spanBreak: document.querySelectorAll('.span-break'),
            siderButtonIcon:document.querySelectorAll('.sider-button-icon'),
            overview: document.querySelector('#overview'),
            cards: null,
            aButton: null,
            addFilm: document.querySelector('#addFilm')
        }, 
        desktop:window.matchMedia('(min-width:760px)'),
        mobile:window.matchMedia('(min-width:320px)'),
        evnt:() => {
            MQController.desktop.addEventListener('change', MQController.cntr);
            MQController.mobile.addEventListener('change', MQController.cntr);
        },
        mediaTest:() => {  
            switch(true) {
                case MQController.desktop.matches == true:
                    return 'desktop';
                break;
                case MQController.mobile.matches == true:
                    return 'mobile';
                break;
            }
        },
        cntr:() => {	
            switch(true){
                case MQController.desktop.matches == true:
                    console.log('DESKTOP-DESKTOP');
                    finder.parent.innerHTML = '';
                    document.querySelector('body').style.padding = '2%';
                    MQController.nav.finder.parent.style.padding = '1%';
                    MQController.nav.finder.parent.style.width = '95%';
                    MQController.main.parent.setAttribute('style','display:grid;grid-template-columns:repeat(4, 1fr);width:100%;min-height:8vh;');
                    MQController.main.sider.setAttribute('style','grid-column:1/2;');
                    for(let i=0; i<MQController.main.spanBreak.length; i++){
                        MQController.main.spanBreak[i].style.display = 'none';
                    }
                    MQController.main.overview.setAttribute('style','grid-column:2/5;display:grid;rid-template-columns:repeat(2, 1fr);rid-template-rows:repeat(3, 1fr);');
                    MQController.main.addFilm.setAttribute('style','grid-column:1/4;grid-row:1/2;justify-self:center;align-self:center;display:grid;margin-top:20px;padding:1%;border-radius:10px;');
                    MQController.main.aButton = document.querySelectorAll('#sider > a');
                    MQController.nav.logo.child[0].style.fontSize = '30px';
				    MQController.nav.logo.child[1].style.fontSize = '33px';
				    MQController.nav.logo.parent.style.marginTop = 0;
				    MQController.nav.logo.parent.style.marginLeft = '5px';
                    for(let i=0; i<MQController.main.aButton.length; i++){
                        MQController.main.aButton[i].setAttribute('style','display:block;padding:5%;width:71%;');   
                    }
                    if(MQController.main.aButton[3] != undefined){
                        MQController.main.aButton[3].setAttribute('style','display:block;padding:5%;width:71%;margin:0 auto;margin-top:10px;font-size:24px;text-decoration:none;font-family:futura;text-align:center;border-radius:10px;border:4px solid blue;border-style:dotted;')
                    }
                    for(let i=0; i<MQController.main.siderButtonIcon.length; i++) {
                            MQController.main.siderButtonIcon[i].setAttribute('style','font-size:19px;color:blue;font-weight:bold;');    
                    }
                    MQController.main.cards = document.querySelectorAll('.cards');
                    if(MQController.main.cards != undefined) {
                        for(let i=0; i<MQController.main.cards.length; i++){
                            MQController.main.cards[i].setAttribute('style','display:grid;grid-template-columns:1fr 1fr;justify-self:center;width:70%;min-height:60vh;padding:2%;border-radius:10px;font-family:monospace;margin:5px;background-color:rgb(191, 190, 187);');
                        }
                    } 
                    MQController.nav.finder.parent.style.width = '94%';
                    for(let i=0; i<MQController.nav.a.length; i++){
                        MQController.nav.a[i].style.fontSize = '17px';
                        if(MQController.nav.parent.children.length < 10) {
                            MQController.nav.finder.source[0].style.width = '65%';
                            MQController.nav.finder.source[0].children[0].style.width = '85%';
                            MQController.nav.parent.appendChild(MQController.nav.a[i]);
                            MQController.nav.finder.parent.appendChild(MQController.nav.finder.source[0]);
                            MQController.nav.finder.parent.appendChild(MQController.nav.finder.source[1]);
                            MQController.nav.target.children[(MQController.nav.target.children.length-3)+i].remove();
                            MQController.nav.finder.source[1].setAttribute('style','display:none;position:absolute;top:16%;left:28%;border-radius:10px;padding:1%;z-index:111;background-color:rgba(128,128,128, 0.8);width:20%;');
                        }
                    }
                    MQController.nav.parent.style.display = 'grid';	
                    MQController.nav.target.setAttribute('style','width:170px;height:fit-content;margin-top:32px;right:9%;position:absolute;top:13.5%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
                break;
                case MQController.mobile.matches == true:
                console.log('MOBILE-MOBILE');
                finder.parent.innerHTML = '';
                MQController.main.parent.setAttribute('style','display:block;padding:0;');
                MQController.main.sider.setAttribute('style','display:block;width:100%;min-height:10vh;margin-bottom:2%;border-width:0 0 1px 0;border-color:#BFBEBB;padding-top:2%;padding-bottom:2%;');
                for(let i=0; i<MQController.main.spanBreak.length; i++){
                    MQController.main.spanBreak[i].style.display = 'block';
                }
                MQController.main.overview.setAttribute('style','display:block;width:100%;min-height:100vh;border-width:1px 0 0 0;border-color:#BFBEBB;');
                MQController.main.addFilm.setAttribute('style','width:94%;margin-top:2%;margin-left:2%;padding:1%;');
                MQController.main.aButton = document.querySelectorAll('#sider > a');
                for(let i=0; i<MQController.main.aButton.length; i++){
                    MQController.main.aButton[i].setAttribute('style','width:25%;height:5vh;float:left;font-size:14px;padding:2%;margin-left:3%;margin-bottom:1.3%;');   
                }
                if(MQController.main.aButton[3] != undefined){
                    MQController.main.aButton[3].setAttribute('style','display:flex;align-items:center;justify-content:center;width:81%;height:6vh;font-size:20px;border:2px solid blue;margin:0 auto;clear:both;padding:0; border-style:dotted;')
                }
                for(let i=0; i<MQController.main.siderButtonIcon.length; i++) {
                    MQController.main.siderButtonIcon[i].setAttribute('style','font-size:17px;color:blue;font-weight:bold;');
                }
                MQController.main.cards = document.querySelectorAll('.cards');
                if(MQController.main.cards != undefined) {
                    for(let i=0; i<MQController.main.cards.length; i++){
                        MQController.main.cards[i].setAttribute('style','display:grid;grid-template-columns:1fr 1fr;justify-self:center;width:80%;min-height:60vh;padding:2%;border-radius:10px;font-family:monospace;margin:2% 7% 0% 7%;background-color:rgb(191, 190, 187);');
                    }
                } 
                document.querySelector('body').style.padding = 0;
                MQController.nav.finder.el.id = 'mobile-finder';
                MQController.nav.finder.el.setAttribute('style','height:fit-content');
                MQController.nav.finder.source[0].style.width = '100%';
                MQController.nav.finder.parent.style.width = '100%';
                MQController.nav.finder.parent.style.padding = 0;
                MQController.nav.finder.source[0].children[0].style.width = '95%';
                MQController.nav.finder.source[1].setAttribute('style','display:block;position:relative;top:0;left:0;margin-left:2%;padding:2%;margin-top:2%;border-radius:10px;');
                MQController.nav.finder.el.appendChild(MQController.nav.finder.source[0]);
                MQController.nav.finder.el.appendChild(MQController.nav.finder.source[1]);
                MQController.nav.target.style.top = '11.6%';
                MQController.nav.target.insertBefore(MQController.nav.finder.el, document.querySelectorAll('.menuAnimL')[0]);
                MQController.nav.logo.child[0].style.fontSize = '24px';
                MQController.nav.logo.child[1].style.fontSize = '27px';
                MQController.nav.logo.parent.style.marginTop = '6%';
                MQController.nav.logo.parent.style.marginLeft = '10%';
                document.querySelector('#mobile-finder').setAttribute('style','	width:96%;margin-bottom:3%;margin-top:1%;padding:0;border-radius:0;');
                    for(let i=0; i<MQController.nav.a.length; i++){ 
                        if(MQController.nav.target.children.length < 10) {
                            MQController.nav.li[i] = document.createElement('li');
                            MQController.nav.li[i].setAttribute('style','color:#252525;width:60%;border:2px solid red;');
                            MQController.nav.li[i].appendChild(MQController.nav.a[i]);
                            MQController.nav.target.appendChild(MQController.nav.li[i]);
                        }
                    }
                    MQController.nav.parent.style.display = 'none';	
                    MQController.nav.target.setAttribute('style','width:100%;height:fit-content;margin:0;position:absolute;left:0;top:14%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
                break;
            }
        }
    }
    
    MQController.evnt();
    document.body.addEventListener('onload',MQController.cntr());

    let menuAnimation = { 
		source: null,
		circle: null,
		child: null,
		counter: 0,
		sts: true,
		directions: ['left', 'right'],
		add: (par) => {
			for(let z=0; z<2; z++){
				this.circle = document.createElement('div');
				this.circle.className = 'circleAnim';
				this.circle.setAttribute('style',`position:relative;${menuAnimation.directions[z]}:0;z-index:8;width:28px;height:28px;border-radius:50%;background-color:#BFBEBB;display:inline-block;`);
				if(z < 1) {
					menuAnimation.source[par].parentElement.insertBefore(this.circle, menuAnimation.source[par].parentElement.children[0]);
				} else {
					menuAnimation.source[par].parentElement.appendChild(this.circle);
				}
			}
			menuAnimation.motion.func(menuAnimation.source[par]);
		},
		rmv: () => {
			this.child = document.querySelectorAll('.circleAnim');
					for(let i=0; i<this.child.length; i++){
						this.child[i].remove();
					}
		},
		fun: () => {
			if(menuAnimation.sts == true) {
				menuAnimation.source = document.querySelectorAll('#menu-show > li > .menuAnimA');
				for(let i=0; i<menuAnimation.source.length; i++){ 
					menuAnimation.source[i].addEventListener('mouseover', function add01 (e) {
						menuAnimation.counter++;
						menuAnimation.add(i);
					});
					menuAnimation.source[i].addEventListener('mouseout', (e) => {
						e.target.setAttribute('style','background-color:none');
						menuAnimation.rmv();
						menuAnimation.motion.startPosition = 0;
						window.clearInterval(menuAnimation.motion.evnt); 
						menuAnimation.motion.evnt = null;
					});
				}
				menuAnimation.sts = false;
			}else if(menuAnimation.sts == false) {
				menuAnimation.rmvEv();
			}	
		},
		rmvEv: () => {
			for(let i=0; i<this.source.length; i++){
				this.source[i].removeEventListener('mouseover', this.add);
			}
		},
		motion: {
			source: null,
			endPositon: null,
			startPosition: 0,
			e: 2,
			evnt: null,
			func: (par) => {
				if(MQController.mediaTest() == 'mobile') {
					menuAnimation.motion.startPosition = 90;
				}
				menuAnimation.motion.source = [par.parentElement.children[0], par.parentElement.children[2]];
				menuAnimation.motion.endPosition = par.parentElement.offsetWidth / 2;
				menuAnimation.motion.evnt = window.setInterval(menuAnimation.motion.go,20);			
			},
			go: () => {
				if(menuAnimation.motion.endPosition > menuAnimation.motion.startPosition){
					menuAnimation.motion.startPosition++;
					menuAnimation.motion.source[0].style.left = menuAnimation.motion.startPosition+'px';
					menuAnimation.motion.source[1].style.right = menuAnimation.motion.startPosition+'px';
					if(menuAnimation.motion.startPosition == Math.trunc(menuAnimation.motion.endPosition / 2)) {
						menuAnimation.motion.source[0].setAttribute('style',`position:relative;left:${menuAnimation.motion.startPosition}px;z-index:8;width:22px;height:22px;border-radius:50%;border:1.5px solid blue;display:inline-block;`);
						menuAnimation.motion.source[1].setAttribute('style',`position:relative;right:${menuAnimation.motion.startPosition}px;z-index:8;width:22px;height:22px;border-radius:50%;border:1.5px solid blue;display:inline-block;`);
					}
				}else{
					window.clearInterval(menuAnimation.motion.evnt);
					menuAnimation.motion.source[0].remove();
					menuAnimation.motion.source[1].remove();
				}
			}
		},
	} 

	let anim = document.querySelector('#menu > div');
	anim.addEventListener('click', menuAnimation.fun);

function init () {
    const fetchHost = './fetchAdmin.php?';  
    class FetchTask {  
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
                console.log(response);
                new MakeTable(response)})
            .catch(err => {
                console.log(err);
            })
            return this.outz;
        }
    }
    class SetEvent {
        constructor(tar, fun) {
            this.target = tar; 
            this.fun = fun; 
            this.el = null;
            this.go();
        }
        go() {
            this.el = document.getElementById(this.target);
            this.el.addEventListener('click', this.fun);
        }
    }
    
    let ev01 = new SetEvent('admin-user', () => { new FetchTask('read', 'users', fetchHost)});
    let ev02 = new SetEvent('admin-film', () => { new FetchTask('read', 'film', fetchHost)});
    let ev03 = new SetEvent('admin-post', () => { new FetchTask('read', 'posts', fetchHost)}); 
    
    class ExtraWindow {
        constructor(parentDiv, data, style, table) {
            this.parent = document.querySelector(parentDiv);
            this.child = null;
            this.data = data;
            this.table = table;
            this.elements = {
                div: document.createElement('div'),
                input: null,
                label: null,
                textarea: null,
                textAll: null,
                buttons: []
            }
            this.style = style;
            this.build(parentDiv);
        }
        build(x) {
            if(+document.getElementsByClassName('admin-update').length == 0) {
                this.child = document.querySelectorAll(`${x} > *`);
                for(let i=0; i<this.child.length; i++) {
                    this.child[i].setAttribute('style','grid-column:1/3;grid-row:1/2;z-index:0;width:96%;position:relative;justify-self:center;margin-top:10px;');
                }
                for(let i=0; i<this.data.length-3; i++) {
                    if(this.data[i].id != 'Gedanke' && this.data[i].id != 'Content') { // this.data[i].id,  Content || Gedanke, BEFORE: i != 6
                        this.elements.label = document.createElement('div');
                        this.elements.label.innerHTML = this.data[i].id; 
                        this.elements.input = document.createElement('input');
                        this.elements.input.id = this.data[i].id;
                        this.elements.input.className = 'admin-update-values';
                        this.elements.input.value = this.data[i].innerHTML; 
                        this.elements.div.appendChild(this.elements.label);
                        this.elements.div.appendChild(this.elements.input);
                    } else {
                        this.elements.textarea = document.createElement('textarea');
                        this.elements.textarea.setAttribute('style', 'width:145px;float:left;');
                        this.elements.textAll = document.createElement('div');
                        this.elements.textAll.setAttribute('style','width:fit-content;height:fit-content;border:1px solid blue;font-family:monospace;font-size:11px;');
                        this.elements.textAll.innerHTML = 'Ganzer Text';
                        this.elements.textAll.addEventListener('click', () => {
                            console.log('Textarea-Event laeuft..');
                            if(this.elements.textarea.style.height != '200px') {
                                this.elements.textarea.setAttribute('style','height:200px;width:145px;');
                            } else {
                                this.elements.textarea.setAttribute('style','height:30px;width:145px;');
                            }
                        })
                        this.elements.textarea.innerHTML = this.data[i].innerHTML;
                        this.elements.textarea.id = this.data[i].id;
                        this.elements.textarea.className = 'admin-update-values';
                        this.elements.label = document.createElement('div');
                        this.elements.label.innerHTML = 'Gedanke'; 
                        this.elements.div.appendChild(this.elements.label);
                        this.elements.div.appendChild(this.elements.textarea);
                        this.elements.div.appendChild(this.elements.textAll);
                    }
                }
                for(let key in this.style) {
                    this.elements.div['style'][key] = this.style[key];
                }
                this.elements.buttons[0] = document.createElement('button');
                this.elements.buttons[0].innerHTML = 'Save';
                this.elements.buttons[0].addEventListener('click', (e) => { 
                let updateSource = document.querySelectorAll('.admin-update-values');
                let updateValues = {};
                for(let i=0; i<updateSource.length; i++) {
                    console.log(updateSource[i].value);
                    updateValues[updateSource[i].id] = updateSource[i].value;
                }
                updateValues['table'] = this.table;
                let js = JSON.stringify(updateValues); 
                console.log(updateValues);
                new FetchTask('update', js, fetchHost);
                e.target.parentElement.remove();
            });
                this.elements.buttons[1] = document.createElement('button');
                this.elements.buttons[1].innerHTML = 'Cancel';
                this.elements.buttons[1].addEventListener('click', (e) => {e.target.parentElement.remove()});
                this.elements.div.appendChild(this.elements.buttons[0]);
                this.elements.div.appendChild(this.elements.buttons[1]);
                this.elements.div.className = 'admin-update';
                this.parent.appendChild(this.elements.div);
                }
            }
    }

    class MakeTable {
        constructor(data) { 
            this.source = {
                data: data,
            },
            this.table = {
                body: '',
                head: "<table id='admin-table' style='grid-column:1/3;grid-row:1/2;width:96%;justify-self:center;margin-top:10px;'>"
            },
            this.fun = {
                edit: (e) => {       
                   let parentRow = document.querySelectorAll('#admin-table > tbody > tr'); 
                   let target = parentRow[parseInt(e.target.parentElement.id)+1];
                   new ExtraWindow('#overview', target.children, {'position':'fixed','width': '420px','background-color':'blue','color':'white','padding':'2%','positon':'relative','z-index':'1', 'border-radius':'5px','left':'650px','top':'260px'}, e.target.id);
                   new FetchTask('edit', JSON.stringify([e.target.value,e.target.id]), fetchHost);
                },
                delete: (e) => {
                    let ask = window.confirm('Willst Du diesen Datensatz wirklich löschen?');
                    if(ask) {
                        new FetchTask('delete', JSON.stringify([e.target.value,e.target.id]), fetchHost)}
                    }
                },
            this.counter= {
                1:0,
                2:0
            },
            this.event = {
                el: null,
                funDel: this.fun.delete,
                funEdit: this.fun.edit
            }
            this.counter02 = 0;
            this.target =  document.querySelector('#overview');
            this.build();
        }
        build() {   
                for(let key01 in this.source['data']) {  
                    if(key01 != 'table') {
                        this.table['body'] += `<tr id='${this.counter[2]}'>`;
                        for(let key02 in this.source['data'][key01]) {
                            this.counter[1]++;
                            if(this.counter[1] <= Object.keys(this.source['data'][key01]).length) {
                                this.table['head'] += `<td>${key02}</td>`;
                                this.table['body'] += `<td  class='admin-table-data' id='${key02}'>${this.source['data'][key01][key02]}</td>`;
                            } else {
                                this.table['body'] += `<td class='admin-table-data' id='${key02}'>${this.source['data'][key01][key02]}</td>`;
                            }
                        }         
                            this.table['body'] += `<td id='${this.counter[2]}'><button class='action' id='${this.source['data']['table']}' value='${this.source['data'][key01]['Id']}'>Edit</button></td><td id='${this.counter[2]}'><button class='action' id='${this.source['data']['table']}' value='${this.source['data'][key01]['Id']}'>Delete</button></td></tr>`;
                            this.table['body'] += `</td>`;
                        this.counter[2]++;
                    }
                }
                this.table['head'] += `<td>Edit</td><td>Delete</td>`;
                this.table['body'] += "</table>";
                this.table['body'] = this.table['head'] + this.table['body'];
                this.target.innerHTML = this.table['body'];
                this.source['data'] = null;
                this.setEvent(); 
        }
        setEvent() {
            this.event['el'] = document.querySelectorAll('.action');
            for(let i=0; i<this.event['el'].length; i++) {
                if(i%2 != 0) {
                    this.event['el'][i].addEventListener('click', this.event['funDel']);
                }else {
                    this.event['el'][i].addEventListener('click', this.event['funEdit']);
                }
            }
        }
    }    
}
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
    funk:  (e) => {  	
            finder.out = {}
            this.connection =  new FetchFinder('finder', 'film', './fetchOverview.php?');
            for(let key01 in finder.data) { 
                for(let key02 in finder.data[key01]) { 
                    if(finder.data[key01]['Titel'].includes(finder.element.value)) {		
                            finder.out[finder.data[key01]['Titel']] = finder.data[key01];
                    } 
                }
            }
            finder.build();
    },
    build: function () {
            this.parent.innerHTML = '';
            if(finder.element.value != '') {
                this.parent.style.display = 'block';
            } else {
                this.parent.style.display = 'none';
            }
            for(let key01 in this.out) {
                this.parent.innerHTML += `<div style='border:2px solid white;padding:2%;font-family:monospace;margin-bottom:3px;border-radius:5px;'><span style='clear:both'></span><img src='./poster/${this.out[key01]['Poster']}' width='45' style='float:left;'><p style='width:200px;color:white;'>Titel: ${this.out[key01]['Titel']}<span style="color:blue;font-size:36px;">.</span></p>
                <a href='./filmpages/${this.out[key01]['Titel'].replaceAll(' ','')}.php'>Website von "${this.out[key01]['Titel']}"</a></div>`; 
            }
    }
}


let findEvent = document.querySelector('#finder > input');
findEvent.addEventListener('keyup',() => {finder.funk();});
findEvent.addEventListener('keydown',() => {finder.funk();});

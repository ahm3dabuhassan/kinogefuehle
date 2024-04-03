console.log('JS ist da, man!');

class ForumActions {
    source;
    name;
    value;
    transformation;
    allElements;
    init(id,value,name) {
        this.source = id;
        this.name = name;
        this.value = parseInt(value);
        this.transformation = {
            'parent': null,
            'before': null,
            'now': null
        }
        this.allElements = { 
            'div': document.querySelectorAll('.forum-post'),
            'content': null, 
            'date': document.querySelectorAll('.forum-date'),
            'button': {
                edit: document.querySelectorAll('.forum-posts-button[name="edit"]'),
            },
            'extraButton': document.createElement('button'),
        }
        this.showElement();
    }
    showElement(e){
        this.allElements.content = document.querySelectorAll('.forum-content');
        this.transformation.parent = this.allElements.div[this.value];
        switch(this.name){
            case 'edit':
                console.log('Edit Case..');
                if(document.querySelector('#textAreaNewValue') == undefined){
                    console.log(this.allElements.formElement);
                    this.transformation.now = document.createElement('textarea');
                    this.transformation.now.id = 'textAreaNewValue';
                    this.transformation.now.innerHTML = this.allElements.content[this.value].innerHTML; 
                    this.transformation.now.setAttribute('style','grid-row:2/5;grid-column:1/6;width:96%;height:8vh;justify-self:center;margin-top:7%');
                    this.allElements.content[this.value].style.display = 'none';
                    this.transformation.parent.appendChild(this.transformation.now);
                    this.allElements.button.edit[this.value].innerHTML = 'Cancel';
                    this.allElements.button.edit[this.value].name = 'cancel';
                    this.allElements.extraButton.setAttribute('style','grid-row:4/5;justify-self:end;width:66px;height:66px;margin-right:7%;margin-bottom:9%;border:0;border-radius:50%;background-color:blue;color:white;');
                    this.allElements.extraButton.innerHTML = 'Senden';
                    this.allElements.div[this.value].appendChild(this.allElements.extraButton);
                    this.name = 'cancel';
                    this.allElements.extraButton.addEventListener('click', this.update);
                }
            break;
            case 'cancel':
                console.log('Cancel Case..');
                document.querySelector('#textAreaNewValue').remove();
                this.allElements.content[this.value].style.display = 'block';
                this.allElements.button.edit[this.value].innerHTML = 'Edit';
                this.allElements.button.edit[this.value].name = 'edit';
                this.allElements.extraButton.remove();
            break;

        }
    }
    update = (e) => {
        console.log('UPDATE...');
        new FetchTask('updatePost', JSON.stringify([e.target.parentElement.id, document.querySelector('#textAreaNewValue').value]), './fetchForum.php?');
        this.allElements.content[this.value].style.display = 'block';
        this.allElements.content[this.value].innerHTML = document.querySelector('#textAreaNewValue').value;
        this.transformation.now.remove();
        this.allElements.extraButton.remove();
        this.allElements.button.edit[this.value].innerHTML = 'Edit';
        this.allElements.button.edit[this.value].name = 'edit';
    }
}

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
        console.log(this.fuse);
        fetch(this.fuse)
        .then(response => {
            return response.json();
        })
        .then(response => {
             finder.data = response;
        ;})
        .catch(err => {
            console.log(err);
        })
    }
}
let initForum = new ForumActions();
let eventForum = (e) => {
    switch(e.target.name){
        case 'edit':
            console.log('KOMMT EDIT');
            initForum.init(e.target.parentElement,e.target.parentElement.getAttribute('value'),e.target.name);
        break;
        case 'cancel':
            console.log('KOMMT CANCEL');
            initForum.showElement();
        break;
    }

}

let setEvents = document.querySelectorAll('.forum-posts-button');

for(let i=0; i<setEvents.length; i++) {
    if(i % 2 == 0) {
        setEvents[i].addEventListener('click', eventForum);   
    } else {
        setEvents[i].addEventListener('click', (e) => {
            let conf = window.confirm(`Willst du den Post wirklich löschen?`);
            if(conf) {
                let el = document.querySelectorAll('.forum-post');
                new FetchTask('deletePost', e.target.value , './fetchForum.php?');
                console.log(el[e.target.id]);
                el[e.target.id].remove();
                let box = document.querySelectorAll('.forum-comment-box');
                let newPostBox =  document.querySelectorAll('.forum-add-comment');
                box[e.target.id].remove();
                newPostBox[e.target.id].remove();
            }
        });
    }
}
let emptyPost = {
    target: null,
    source: null,
    ev: () => {
        if(this.source.value.length == 0){
          document.querySelector('#message').setAttribute('style','display:block;grid-column:5/6;font-weight:bold;color:bold');
          setTimeout(()=>{
            document.querySelector('#message').style.display = 'none';
          }, 1500);
            return(false);
        }else{
            return(true);
        }
    },
    assignEvent: () => {
        this.target = document.querySelector('#forum-input > form');
        this.source = document.querySelector('#forum-input > form > textarea[name="userpost"]');
        this.target.setAttribute('onsubmit', 'return emptyPost.ev();');
    }
}

let message = {
    element: {
        el: document.createElement('div'),
        style: 'width:10%;height:5vh;border:1px solid blue;padding:1%;position:absolute;right:-10%;',
        txt: 'Der Post ist leider leer.',
        interval: null,
        end: 38,
        counter: 0
    },
    init: () => {
        console.log('INIT');
        message.element.el.setAttribute('style', message.element.style);
        message.element.el.innerHTML = message.element.txt;
        document.body.appendChild(message.element.el);
        message.element.interval = setInterval(message.move,50);
    },
    move: () => {
        if(message.element.counter < message.element.end){
            message.element.counter++;
            message.element.el.style.right = `${message.element.counter}%`;
        }else{
            clearInterval(message.element.interval);
        } 
    }
}

emptyPost.assignEvent();

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
                    this.parent.innerHTML += `<div style='height:9vh;border:2px solid white;padding:2%;font-family:monospace;margin-bottom:3px;border-radius:5px;'><span style='clear:both'></span><img src='./poster/${this.out[key01]['Poster']}' width='45' style='float:left;margin-right:2%;'><p class='finder-titel' style='vertical-align:top;margin-top:0px;width:200px;color:white;line-height:1vh;aline-height:top;'>Titel: ${this.out[key01]['Titel']}<span style="color:blue;font-size:36px;">.</span></p>
                    <a href='./filmpages/${this.out[key01]['Titel'].replaceAll(' ','')}.php'>Website von "${this.out[key01]['Titel']}"</a></div>`; 
                    if(this.out[key01]['Titel'].length < 20){
						let finderTitel = document.querySelectorAll('.finder-titel');
						finderTitel[finderTitel.length-1].style.height = '4vh'; 
					}
                }
            }else{
                this.parent.innerHTML = "Sorry, wir haben das nicht &#128542;";
            }
		}
    }
	
	let findEvent = document.querySelector('#finder > input');
	findEvent.addEventListener('keyup',() => {finder.funk();});
	findEvent.addEventListener('keydown',() => {finder.funk();}); 

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
            parent: document.querySelector('#forum-main'),
            info: { 
                parent: document.querySelector('#forum-info'),
                child: document.querySelectorAll('.forum-info-box')
            },
            allTopics: document.querySelectorAll('.topic-overview'),
            lastPost: document.querySelectorAll('.last-post')
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
                    MQController.nav.finder.parent.style.width = '94%';
                    MQController.nav.finder.parent.style.padding = '1%';
                    MQController.nav.logo.child[0].style.fontSize = '30px';
                    MQController.nav.logo.child[1].style.fontSize = '33px';
                    MQController.nav.logo.parent.style.marginTop = 0;
                    MQController.nav.logo.parent.style.marginLeft = '5px';
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
                    MQController.main.parent.style.width = '60%';
                    MQController.main.parent.style.marginTop = '3%';
                    MQController.main.parent.style.paddingBottom = '%';
                    MQController.main.info.parent.style.width = '100%';
                    for(let i=0; i<MQController.main.allTopics.length;i++){
                        MQController.main.allTopics[i].style.width = '95%';
                        MQController.main.lastPost[i].style.fontSize = '10px';
                    }
                    MQController.nav.parent.style.display = 'grid';	
                    MQController.nav.target.setAttribute('style','width:170px;height:fit-content;margin-top:32px;right:9%;position:absolute;top:13.5%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
                break;
                case MQController.mobile.matches == true:
                console.log('MOBILE-MOBILE');
                finder.parent.innerHTML = '';
                document.querySelector('body').style.padding = 0;
                MQController.nav.finder.el.id = 'mobile-finder';
                MQController.nav.finder.el.setAttribute('style','height:fit-content');
                MQController.nav.finder.source[0].style.width = '100%';
                MQController.nav.finder.parent.style.width = '100%';
                MQController.nav.finder.parent.style.padding = 0;
                MQController.nav.finder.source[0].children[0].style.width = '95%';
                MQController.nav.finder.source[1].setAttribute('style','display:none;position:relative;top:0;left:0;margin-left:2%;padding:2%;margin-top:2%;border-radius:10px;');
                MQController.nav.finder.el.appendChild(MQController.nav.finder.source[0]);
                MQController.nav.finder.el.appendChild(MQController.nav.finder.source[1]);
                MQController.nav.target.insertBefore(MQController.nav.finder.el, document.querySelectorAll('.menuAnimL')[0]);
                MQController.nav.logo.child[0].style.fontSize = '24px';
                MQController.nav.logo.child[1].style.fontSize = '27px';
                MQController.nav.logo.parent.style.marginTop = '6%';
                MQController.nav.logo.parent.style.marginLeft = '10%';
                MQController.main.parent.style.width = '100%';
                for(let i=0; i<MQController.main.allTopics.length;i++){
                    MQController.main.allTopics[i].style.width = '100%';
                    MQController.main.lastPost[i].style.fontSize = '8px';
                }
                document.querySelector('#mobile-finder').setAttribute('style','	width:96%;margin-bottom:3%;margin-top:1%;padding:0;border-radius:0;');
                    for(let i=0; i<MQController.nav.a.length; i++){ 
                        if(MQController.nav.target.children.length < 10) {
                            MQController.nav.li[i] = document.createElement('li');
                            MQController.nav.li[i].setAttribute('style','border:1px solid #BFBEBB;width:98%;height:6vh;border-radius:0 0 0 10px;align-items:center;margin-bottom:3%;display:flex;jusitfy-content:center;align-content:center;');
                            MQController.nav.a[i].setAttribute('style','width:60%;margin:0 auto;font-size:14px;text-decoration:none;color:#252525;text-align:center;')
                            MQController.nav.li[i].appendChild(MQController.nav.a[i]);
                            MQController.nav.target.appendChild(MQController.nav.li[i]);
                        }
                    }
                    MQController.nav.parent.style.display = 'none';	
                    MQController.nav.target.setAttribute('style','width:87%;height:fit-content;margin:0;position:absolute;left:5%;top:10.4%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
                break;
            }
        }
    }
    
    MQController.evnt();
    document.body.addEventListener('onload',MQController.cntr());

    let slideShow = {
        target: [document.querySelector('#forum-slide-container01'),document.querySelector('#forum-slide-container02')],
        interval: null,
        path: './img/forum/',
        counter: 0,
        pictures: {
            1: ['forum-slide01a.png','forum-slide02a.png','forum-slide03a.png'],
            2: ['forum-slide01b.png','forum-slide02b.png','forum-slide03b.png']
        },
        go: ()=>{
            slideShow.target[0].children[0].setAttribute('style','width:94%;height:7vh;border-radius:5px;');
            slideShow.target[1].children[0].setAttribute('style','width:94%;height:7vh;border-radius:5px;');
            slideShow.interval = setInterval(slideShow.slide, 300);
            console.log(slideShow.pictures[1][0]);
        },
        slide: () => {
            if(slideShow.counter < slideShow.pictures[1].length){
                slideShow.target[0].children[0].src = `${slideShow.path}${slideShow.pictures[1][slideShow.counter]}`;
                slideShow.target[1].children[0].src = `${slideShow.path}${slideShow.pictures[2][slideShow.counter]}`;
                slideShow.counter++
            } else {
                slideShow.counter = 0;
            }
        }
 
    }

    slideShow.go();

    let dB = {
        source: null,
        check: () => {
            dB.source = document.querySelectorAll('.forum-posts-button');
            if(dB.source != undefined){
                for(let i=0; i<dB.source.length; i++){
                    if(dB.source[i].disabled == true){
                        dB.source[i].style.opacity = '0.5';
                    }
                }
            }
        }
    }
    dB.check();

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

    let addComment = {
        trigger: null,
        id: null,
        cntrl: null, 
        sts: true,
        text: {
            el: document.createElement('textarea'),
            parent: null,
            interval: null,
            counter: 0,
            cancel: document.createElement('button'), 
            delete: null,
            newPost: {
                el: [],
                date: null,
                parent: null,
                button: null
            }
        },
        updateData:null,
        commentBox: null,
        post: null, 
        assignEvent: () => {
            console.log('assignEvent');
            addComment.trigger = document.querySelectorAll('.forum-add-comment-button');
            addComment.text.parent = document.querySelectorAll('.forum-add-comment');
            addComment.commentBox = document.querySelectorAll('.forum-comment-box');
            console.log(addComment.commentBox);
            for(let i=0; i<addComment.trigger.length; i++){
                addComment.trigger[i].addEventListener('click', addComment.func);
                addComment.commentBox[i].addEventListener('click', addComment.showComments);
            }
        },
        func: (e) => {
            console.log('func');
            addComment.cntrl = document.querySelectorAll('button[active="true"]');
            if(document.querySelectorAll('.forum-add-comment-text')[0] == undefined && addComment.cntrl.length == 0 || e.target.id == addComment.id && document.querySelectorAll('button[task="send"]').length == 1){
                switch(e.target.getAttribute('task')){
                    case 'send':
                        console.log('SEND');
                        let postTopicID = e.target.name.split('/');
                        new FetchTask('newComment', JSON.stringify([postTopicID[1], postTopicID[0], userID ,addComment.text.el.value]), './fetchOverview.php?');
                        console.log(addComment.commentBox[e.target.id]);
                        addComment.text.newPost.parent = document.createElement('div');
                        addComment.text.newPost.parent.className = 'forum-comment-box-post';

                        console.log('Hallo...');
                        addComment.text.newPost.el = [];
                        addComment.text.newPost.el[0] = document.createElement('p');
                        addComment.text.newPost.el[1] = document.createElement('p');
                        addComment.text.newPost.el[2] = document.createElement('p');
                        addComment.text.newPost.button = document.createElement('button');
                        addComment.text.newPost.button.id = 
                        addComment.text.newPost.date = new Date().toLocaleString("en-GB");
                        addComment.text.newPost.el[0].innerHTML = 'Du';
                        addComment.text.newPost.el[1].innerHTML = addComment.text.newPost.date.replace(/\//g, ".");
                        addComment.text.newPost.el[2].innerHTML = addComment.text.el.value;
                        addComment.text.newPost.parent.id = 0;
                        addComment.text.newPost.parent.setAttribute('style', 'display:block');
                        for(let i=0; i<addComment.text.newPost.el.length; i++){
                            addComment.text.newPost.parent.appendChild(addComment.text.newPost.el[i]);
                        }
                        addComment.commentBox[e.target.id].appendChild(addComment.text.newPost.parent);
                    break;
                    case 'write':
                        console.log('WRITE..');
                        addComment.id = e.target.id;
                        addComment.text.el.className = 'forum-add-comment-text';
                        addComment.trigger[e.target.id].style.width = '15%';
                        addComment.trigger[e.target.id].style.marginLeft = '0.3%';
                        addComment.trigger[e.target.id].setAttribute('active','true');
                        addComment.text.parent[e.target.id].style.width = '46%';
                        addComment.text.parent[e.target.id].style.padding = '2%';
                        addComment.text.parent[e.target.id].appendChild(addComment.text.el);
                        addComment.text.interval = setInterval(addComment.sizeUp,13);
                    break;
                }
            }
        },
        sizeUp: () => {
            if(addComment.text.counter < 68.5) {
                addComment.text.counter++;
                addComment.text.el.style.width = `${addComment.text.counter}%`;
            }else {
                console.log('clear...');
                clearInterval(addComment.text.interval);
                addComment.text.counter = 0;
                addComment.text.cancel.innerHTML = 'X';
                addComment.text.cancel.addEventListener('click', addComment.cancel);
                addComment.text.cancel.setAttribute('style','width:30px;height:30px;margin-left:4%;border-radius:50%;background-color:red;color:white;border:0;font-size:16px; box-shadow: 0px 6px 10px 1px rgba(60, 60, 60, .2);')
                addComment.text.parent[addComment.id].appendChild(addComment.text.cancel);
                addComment.trigger[addComment.id].style.backgroundColor = 'blue';
                addComment.trigger[addComment.id].style.color = 'white';
                addComment.trigger[addComment.id].innerHTML = 'Send';
                addComment.trigger[addComment.id].setAttribute('task','send');
            }
        },
        cancel: (e) => { 
            console.log('cancel');
            e.target.remove();
            addComment.trigger[addComment.id].style.width = '90%';
            addComment.trigger[addComment.id].style.marginLeft = '2%';
            addComment.trigger[addComment.id].style.backgroundColor = '#D9D9D9';
            addComment.trigger[addComment.id].style.color = 'black';
            addComment.trigger[addComment.id].innerHTML = 'Add Comment';
            addComment.trigger[addComment.id].setAttribute('active', 'false');
            addComment.text.parent[addComment.id].style.width = '8%';
            addComment.commentBox[addComment.id].style.marginLeft = "70%";
            addComment.trigger[addComment.id].setAttribute('task','write');
            addComment.text.el.value = '';
            addComment.id = null;
            addComment.text.el.remove();
        },
        showComments(e){
            console.log('Hello, Comments!');
            console.log(e.target);
            addComment.text.delete = document.querySelectorAll('.forum-comment-delete');
            addComment.post = document.querySelectorAll('.forum-comment-box-post');

            let dspl = '';
            if(addComment.sts == true){
                dspl = 'block';
                addComment.sts = false;
            }else{
                dspl = 'none'; 
                addComment.sts = true;
            }
            for(let i=1; i<addComment.commentBox[e.target.id].children.length; i++){
                addComment.commentBox[e.target.id].children[i].style.display = dspl; 
            }  
            for(let i=0; i<addComment.text.delete.length; i++){
                addComment.text.delete[i].addEventListener('click', addComment.deleteComment);
            }       
        },
        deleteComment(e){
            let delID = e.target.name.split('/');
            addComment.fetchTask(JSON.stringify([delID[0],delID[1], delID[2]]),delID[3]);
            console.log(addComment.post[e.target.id]);
            console.log(addComment.text.delete[e.target.id]);
            addComment.post[e.target.id].remove();
            addComment.text.delete[e.target.id].remove();
        },
        fetchTask(id,element){
            fetch(`./fetchOverview.php?deleteComment=${id}`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                addComment.updateData = response;
                addComment.updateBox(element);
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
        },
        updateBox(el){
            addComment.commentBox = document.querySelectorAll('.forum-comment-box');
            console.log(addComment.commentBox[el].children[0].innerHTML);
            addComment.commentBox[el].children[0].innerHTML = `Anzahl der Kommentare: ${addComment.updateData.length}`;
            for(let key in addComment.updateData){
                console.log(key, addComment.updateData);
            }
        }
    }
    addComment.assignEvent();


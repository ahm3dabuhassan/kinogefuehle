
let par = 0;
let inc = 0; 
let cache = ['slide_01.jpg', 'slide_02.jpg', 'slide_07.jpeg', 'slide_05.png','slide_10.jpg', 'slide_09.jpeg','slide_08.jpeg', 'slide_11.jpg' ,'slide_06.jpg'];	
function indexUp () {	
	if (inc >= cache.length) {
		inc = 0;
	} else {
		document.querySelector('#foto > img').src = './img/start/'+cache[inc];
		inc++;
	}	
}

setInterval(indexUp, 2100);
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
			finder.data = response;
			console.log(response);
			})
		.catch(err => {
			console.log(err);
		})
		return this.outz;
	}
}
let nAW = { 
	trigger: document.querySelector('#newAccount'),
	backgroundElements: document.querySelectorAll('body > *'),
	components: {
		parent: document.createElement('div'),
		elements: ['Username', 'Password', 'Firstname', 'Lastname', 'Email'],
		storage: []
	},
	build: () => {
		nAW.components.parent.setAttribute('style', 'width:100%;height:100vh;display:flex;align-items:center;position:fixed;z-index:1;top:0;left:0;background:rgba(128, 128, 128, 0.8);font-family:futura;');
		nAW.components.parent.id = 'newAccountWindow';
		nAW.components.storage[0] = document.createElement('form');
		nAW.components.storage[0].action = './willkommen.php'; 
		nAW.components.storage[0].method = 'get';
		nAW.components.storage[0].id = 'newUser';
		if(MQController.mediaTest() == 'desktop'){ 
			nAW.components.storage[0].setAttribute('style', 'display:grid;width:40%;height:40vh;margin:0 auto;padding:5%;background-color:gray;border-radius:50px;border:4px solid white;');
		}else{
			nAW.components.storage[0].setAttribute('style', 'display:grid;width:60%;height:45vh;margin:0 auto;padding:5%;background-color:gray;border-radius:50px;border:4px solid white;');
		}
		nAW.components.storage[0].setAttribute('onsubmit', 'return nAW.validation.stopForm();');
		nAW.components.storage[1] = document.createElement('button');
		nAW.components.storage[1].name = 'sended';
		nAW.components.storage[1].innerHTML = 'Senden';
		nAW.components.storage[1].setAttribute('style','grid-column:1/2;grid-row:8/9;width:62px;height:62px;border:0;border-radius:50%;background-color:blue;color:white;margin-top:8%;font-weight:bold;');
		nAW.components.storage[2] = document.createElement('button');
		nAW.components.storage[2].id = 'cancel';
		nAW.components.storage[2].innerHTML = 'X';
		nAW.components.storage[2].addEventListener('click', () => {
			document.querySelector('#newAccountWindow > *').remove();
			document.querySelector('#newAccountWindow').remove();
			document.querySelector('nav').setAttribute('style','z-index:1;');
			if(MQController.mediaTest() == 'mobile') {
				document.querySelector('main').setAttribute('style', 'display:block;padding:0');
			}
		});
		for(let i=0; i<nAW.backgroundElements.length; i++) {
			nAW.backgroundElements[i].setAttribute('style', 'position: relative; z-index: 0;');
		}
		if(MQController.mediaTest() == 'mobile') {
			document.querySelector('main').setAttribute('style','display:block;');
		}
		for(let c=0; c<nAW.components.elements.length; c++) {
			nAW.components.storage[c+3] = document.createElement('label');
			nAW.components.storage[c+3].htmlFor = nAW.components.elements[c];
			nAW.components.storage[c+3].innerHTML = nAW.components.elements[c]+':';
			nAW.components.storage[c+3+nAW.components.elements.length] = document.createElement('input');
			nAW.components.storage[c+3+nAW.components.elements.length].style.alignSelf = 'baseline';
			nAW.components.storage[c+3+nAW.components.elements.length].required = true;
			nAW.components.storage[c+3+nAW.components.elements.length].id = nAW.components.elements[c]; 
			nAW.components.storage[c+3+nAW.components.elements.length].name = nAW.components.elements[c]; 
			if(nAW.components.elements[c] == 'Password'){
				nAW.components.storage[c+3+nAW.components.elements.length].type = 'password';
			}
			nAW.components.storage[c+3+nAW.components.elements.length].setAttribute('data-column', c+3);
			nAW.components.storage[c+3+nAW.components.elements.length].addEventListener('keydown',nAW.validation.test);
			nAW.components.storage[c+3+nAW.components.elements.length].addEventListener('keyup',nAW.validation.test);
			nAW.components.storage[0].appendChild(nAW.components.storage[c+3]);
			nAW.components.storage[0].appendChild(nAW.components.storage[c+3+nAW.components.elements.length]);
		}
		nAW.components.storage[0].appendChild(nAW.components.storage[1]);
		let p = document.createElement('p');
		p.innerHTML = 'Fühlen <span style="color:blue;">Sie</span> die folgende Felder, um Ihr <span style="color:blue;">Konto</span> bei uns zu <span style="color:blue;">erstellen</span>:';
		p.setAttribute('style','grid-column:1/3;grid-row:2/3;font-size:16px;width:70%;');
		nAW.components.storage[0].appendChild(p);
		nAW.components.storage[0].appendChild(nAW.components.storage[2]);
		nAW.components.parent.appendChild(nAW.components.storage[0]);
		document.body.appendChild(nAW.components.parent);
		console.log(nAW.components.storage);

		nAW.setTitle();
	},
	linkEvent: () => {
		nAW.trigger.addEventListener('click', nAW.build);
	},
	validation: { 
		test: (e) => {
			if(nAW.validation.pattern[e.target.name].test(e.target.value)){
				if(document.querySelector(`#sign-correct${e.target.getAttribute('data-column')}`) == undefined){
					nAW.validation.sign = document.createElement('div');
					nAW.validation.sign.id = `sign-correct${e.target.getAttribute('data-column')}`;
					nAW.validation.sign.className = 'sign-correct';
					nAW.validation.sign.setAttribute('style',`width:19px;height:19px;background-color:#ADFF2F;color:black;border-radius:50%;grid-column:1/2;grid-row:${e.target.getAttribute('data-column')}/${(e.target.getAttribute('data-column')*1+1)};justify-self:end;font-size:9px;margin-right:3%;display:flex;align-items:center;justify-content:center;`);
					nAW.validation.sign.innerHTML = 'OK';
					nAW.components.storage[0].appendChild(nAW.validation.sign);
					nAW.validation.counter++;
				}
			}else{
				document.querySelector(`#sign-correct${e.target.getAttribute('data-column')}`).remove();
			}
		},
		pattern: {
			'Username': /^[a-zA-Z0-9\.\#\@\-]{4,15}$/,
			'Password': /^[a-zA-Z0-9\.\#\@\-]{8,15}$/,
			'Firstname': /^[a-zA-ZäÄüÜß]{2,10}$/,
			'Lastname': /^[a-zA-ZäÄüÜß\-\s]{2,10}$/,
			'Email': /^[a-zA-Z\-\_0-13]{3,10}@[a-zA-Z]{3,10}.[a-zA-Z]{2,5}$/
		},
		sign: null,
		counter: 0,
		stopForm: () => {
			if(document.querySelectorAll('.sign-correct').length == 5) {
				return(true);
			} else {
				return(false);
			}
		}
	},
	setTitle: () => {
		console.log(nAW.components.storage);
		for(let i=0; i<nAW.components.storage.length; i++){
			if(nAW.components.storage[i].nodeName == 'INPUT'){
				switch(nAW.components.storage[i].id){
					case 'Username':
						nAW.components.storage[i].setAttribute('title','Kleine und große Buchstaben, die Zahlen sind erlaubt. Länge von 4-15');
					break;
					case 'Password':
						nAW.components.storage[i].setAttribute('title','Kleine und große Buchstaben, die Zahlen sind erlaubt und Sonderzeichen wie: -, #, @. Länge von 8-15');
					break;
					case 'Firstname':
						nAW.components.storage[i].setAttribute('title','Kleine und große Buchstaben, Sonderzeichen wie: -. Länge von 2-10');
					break;
					case 'Lastname':
						nAW.components.storage[i].setAttribute('title','Kleine und große Buchstaben, Sonderzeichen wie: -. Länge von 2-10');
					break;
					case 'Email':
						nAW.components.storage[i].setAttribute('title','user@web.de, user-01@web.de, user@web-host.de');
					break;
				}
			}
		}
	}
}
	nAW.linkEvent();
	
	document.querySelector('main').addEventListener('click', () => {
		let menu = document.getElementById('menu-input');
		menu.checked = false; 
	});

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
			this.connection =  new FetchTask('finder', 'film', './fetchOverview.php?');
			finder.element.addEventListener('click',() => {console.log('input');});
		}
    }
	
	let findEvent = document.querySelector('#finder > input');
	let finderInit = document.querySelector('#finder > input');
	finderInit.addEventListener('click', finder.init);
	findEvent.addEventListener('keyup',() => {finder.funk();});

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
		parent: document.querySelector('main'), 
		img: {
			cnt: document.querySelector('#foto > img'),
			parent: document.querySelector('#foto')
		},
		header: document.querySelector('#main-header'),
		login: document.querySelector('#log-panel'),
		footer: document.querySelector('footer'),
		footerCircle: document.querySelectorAll('.footer-circle')
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
				MQController.main.parent.style.display = 'grid';
				MQController.main.parent.style.padding = '10px';
				MQController.main.img.cnt.style.width = '1100px';
				MQController.main.img.cnt.style.height = '640px';
				MQController.main.img.parent.style.marginBottom = 0;
				MQController.main.header.setAttribute('style','width:88%;padding:2%;');
				MQController.main.login.setAttribute('style','width:50%;margin:90px;');
				MQController.nav.logo.child[0].style.fontSize = '30px';
				MQController.nav.logo.child[1].style.fontSize = '33px';
				MQController.nav.logo.parent.style.marginTop = 0;
				MQController.nav.logo.parent.style.marginLeft = '5px';
				console.log(MQController.nav.a.length, MQController.nav.target.children.length);
				console.log(MQController.nav.target);
				console.log(MQController.nav.a.length, MQController.nav.target.length);
				for(let i=0; i<MQController.nav.a.length; i++){
					MQController.nav.a[i].style.fontSize = '17px';
					if(MQController.nav.parent.children.length < 10) {
						MQController.nav.finder.source[0].style.width = '65%';
						MQController.nav.finder.source[0].children[0].style.width = '85%';
						MQController.nav.parent.appendChild(MQController.nav.a[i]);
						MQController.nav.finder.parent.appendChild(MQController.nav.finder.source[0]);
		    			MQController.nav.finder.parent.appendChild(MQController.nav.finder.source[1]);
						MQController.nav.target.children[(MQController.nav.target.children.length-3)+i].remove();
						MQController.main.footer.style.display = 'grid';
						MQController.nav.finder.source[1].setAttribute('style','display:none;position:absolute;top:16%;left:28%;border-radius:10px;padding:1%;z-index:111;background-color:rgba(128,128,128, 0.8);width:20%;');
					}
				}
				for(let i=0; i<MQController.main.footerCircle.length; i++){
					MQController.main.footerCircle[i].style.display = 'block';
				}
				MQController.nav.parent.style.display = 'grid';	
				MQController.nav.target.setAttribute('style','width:170px;height:fit-content;margin-top:32px;right:9%;position:absolute;top:13.5%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
				nAW.components.storage[0].setAttribute('style', 'display:grid;width:40%;height:40vh;margin:0 auto;padding:5%;background-color:gray;border-radius:50px;border:4px solid white;');
			break;
			case MQController.mobile.matches == true:
			console.log('MOBILE-MOBILE');
			finder.parent.innerHTML = '';
			document.querySelector('body').style.padding = 0;
			MQController.main.parent.setAttribute('style','display:block;padding:0');
			MQController.main.img.cnt.style.width = '100%';
			MQController.main.img.cnt.style.height = '52vh';
			MQController.main.img.parent.style.marginBottom = '5%';
			MQController.main.header.setAttribute('style','width:100%;margin-bottom:20px;padding:0;');
			MQController.main.login.setAttribute('style','width:90%;margin:0 auto;margin-bottom:5%;');
			MQController.main.footer.setAttribute('style','display:flex;justify-items:space-between');
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
			console.log(MQController.nav.logo.parentElement);
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
				for(let i=0; i<MQController.main.footerCircle.length; i++){
					MQController.main.footerCircle[i].style.display = 'none';
				}
				MQController.nav.parent.style.display = 'none';	
				MQController.nav.target.setAttribute('style','width:87%;height:fit-content;margin:0;position:absolute;left:5%;top:10.4%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
				nAW.components.storage[0].setAttribute('style', 'display:grid;width:60%;height:46vh;margin:0 auto;padding:5%;background-color:gray;border-radius:50px;border:4px solid white;');	
			break;
		}
	}
}

MQController.evnt();
document.body.addEventListener('onload',MQController.cntr());



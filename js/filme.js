console.log('filme.js ist da!');
let buildInfo = {
    target: document.querySelector('#info'),
    start: -23,
    moveInterval: null,
    blueElement:[document.querySelectorAll('#info > p:nth-of-type(2) > span'),document.querySelector('#info > p:nth-of-type(1)'),
    document.querySelector('#info > p:last-of-type')],
    move: () => {
        buildInfo.moveInterval = window.setInterval(buildInfo.event01, 100);
    },
    event01:() => {
        if(MQController.mediaTest() != 'mobile'){
            buildInfo.target.style.display = 'block';
            buildInfo.event02();
        }
    },
    
    event02: () => {
        if(buildInfo.start < 4.5) {
            if(MQController.mediaTest() == 'mobile'){
                buildInfo.target.setAttribute('style','background-color:white;top:14%;width:40%;');
            }
            buildInfo.start++
            buildInfo.target.style.right = `${buildInfo.start}%`;
        }else{
           window.clearInterval(buildInfo.moveInterval);
           buildInfo.blueElement[1].style.color = 'blue';
           buildInfo.blueElement[0][0].style.color = 'blue';
           buildInfo.blueElement[0][1].style.color = 'blue';
           window.setTimeout(() => {buildInfo.blueElement[2].style.display = 'block';}, 700); 
        }
    }
}
buildInfo.move();

document.querySelector('body > div:nth-of-type(1)').addEventListener('click', () => {
    let menu = document.getElementById('menu-input');
    menu.checked = false; 
    document.querySelector('#filter').style.top = '20%';
    document.querySelector('#info').style.top = '46%';
    filter.mn.sts = true

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

let filter = {
    source: document.querySelectorAll('.parent'),
    trigger: document.querySelectorAll('.filter-button'),
    p: document.querySelectorAll('.genre'),
    sts: true,
    menu: document.querySelector('#menu-show'),
    mn: {
        trigger: document.querySelectorAll('#menu > div > label'),
        sts: true,
        ev01: () => { 
            document.querySelector('#info').style.display = 'none';
            for(let i=0;i<filter.mn.trigger.length;i++){
                filter.mn.trigger[i].addEventListener('click',() => {
                    if(filter.mn.sts == true){
                        document.querySelector('#filter').style.top = '50%';
                        document.querySelector('#info').style.top = '65%';
                        filter.mn.sts = false;
                    } else {
                        document.querySelector('#filter').style.top = '20%';
                        document.querySelector('#info').style.top = '46%';
                        filter.mn.sts = true
                    }
                });
            }
        }
    },
    assignEvents: () => {
        for(let i=0;i<filter.trigger.length;i++){
            filter.trigger[i].addEventListener('click', filter.evnt);
        }
        filter.mn.ev01();
    },
    evnt: (e) => {
     if(document.querySelector('#menu-input').checked == true){
         document.querySelector('#menu-input').checked = false;
         filter.mn.sts = true;
     }
        document.querySelector('#filter').style.top = '20%';
        for(let i=0; i<filter.trigger.length; i++){
            if(filter.trigger[i].getAttribute('find') && filter.trigger[i].id != e.target.id){
                filter.trigger[i].removeAttribute('find');
                filter.trigger[i].innerHTML = filter.trigger[i].id;
                for(let i=0;i<filter.source.length;i++){
                        filter.p[i].setAttribute('style','display:block');
                        filter.source[i].setAttribute('style','display:block');
                }
                filter.sts = true;
            }
        }
        e.target.setAttribute('find', 'true');
        switch(e.target.id){
            case "Drama":
                filter.hide(e.target.id,e.target);
            break;
            case "Sci-Fi":
                filter.hide(e.target.id,e.target);
            break;
            case "Komödie":
                filter.hide(e.target.id,e.target);
            break;
            case "Drama-Horror":
                filter.hide(e.target.id,e.target);
            break;
            case "Aktion":
                filter.hide(e.target.id,e.target);
            break;
        }
    },
    hide: (par,el) => {
        console.log('HIDE:.');
        if(filter.sts == true) {
            el.innerHTML = 'Cancel';
            for(let i=0;i<filter.source.length;i++){
                if(filter.source[i].id != par) {
                    filter.p[i].setAttribute('style','display:none');
                    filter.source[i].setAttribute('style','display:none');
                }
            }
            filter.sts = false;
        } else {
            el.innerHTML = par;
            for(let i=0;i<filter.source.length;i++){  
                    filter.p[i].setAttribute('style','display:block');
                    filter.source[i].setAttribute('style','display:block');
            }
            for(let z=0; z<filter.trigger.length;z++){
                if(filter.trigger[z].id == par) {
                    filter.trigger[z].innerHTML = par;
                }
            }
            el.removeAttribute('find');
            filter.sts = true;
        }
    }
}
filter.assignEvents();

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
        evnt: null,
        func: (par) => {
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
        parent: document.querySelector('body > div:first-of-type'),
        filmBox: document.querySelector('#filme-main'),
        filmChild: {
            a: document.querySelectorAll('.parent > a'), 
            p: document.querySelectorAll('.parent > a > p'),
        },
        filter: document.querySelector('#filter'),
        info: document.querySelector('#info')
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
				finder.parent.innerHTML = '';
                document.querySelector('body').style.padding = '2%';
                MQController.nav.finder.parent.style.padding = '1%';
                MQController.nav.finder.parent.style.width = '95%';
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
                MQController.nav.logo.child[0].style.fontSize = '30px';
				MQController.nav.logo.child[1].style.fontSize = '33px';
				MQController.nav.logo.parent.style.marginTop = 0;
				MQController.nav.logo.parent.style.marginLeft = '5px';
				MQController.nav.parent.style.display = 'grid';	
				MQController.nav.target.setAttribute('style','width:170px;height:fit-content;margin-top:32px;right:9%;position:absolute;top:13.5%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
				let testS = document.querySelectorAll('#menu-show > li > .menuAnimA');
				console.log(testS);
                MQController.main.filmBox.style.width = '60%';
                MQController.main.filmBox.style.marginBottom = '2%';
                for(let i=0; i<MQController.main.filmChild.a.length; i++){
                    MQController.main.filmChild.a[i].setAttribute('style','width:100%;height:25vh;');
                    MQController.main.filmChild.p[i].setAttribute('style','font-size:40px;');
                }
                MQController.main.filter.setAttribute('style','position:fixed;width:20%;right:4%;margin-left:0;');
                MQController.main.info.setAttribute('style','display:block;right:4.5%;');
	
			break;
			case MQController.mobile.matches == true:
			finder.parent.innerHTML = '';
			console.log('MOBILE-MOBILE');
            document.querySelector('body').style.padding = 0;
			MQController.nav.finder.el.id = 'mobile-finder';
			MQController.nav.finder.el.setAttribute('style','height:fit-content');
            MQController.nav.finder.parent.style.width = '100%';
            MQController.nav.finder.parent.style.padding = 0;
			MQController.nav.finder.source[0].style.width = '100%';
			MQController.nav.finder.source[0].children[0].style.width = '95%';
            MQController.nav.finder.source[1].setAttribute('style','display:block;position:relative;top:0;left:0;margin-left:2%;padding:2%;margin-top:2%;border-radius:10px;');
            MQController.main.filmBox.style.width = '100%'; 
            MQController.main.filmBox.style.marginBottom = '5%';
            MQController.nav.finder.el.appendChild(MQController.nav.finder.source[0]);
		    MQController.nav.finder.el.appendChild(MQController.nav.finder.source[1]);
			MQController.nav.target.insertBefore(MQController.nav.finder.el, document.querySelectorAll('.menuAnimL')[0]);
			document.querySelector('#mobile-finder').setAttribute('style','	width:96%;margin-bottom:3%;margin-top:1%;padding:0;border-radius:0;');
				for(let i=0; i<MQController.nav.a.length; i++){ 
					if(MQController.nav.target.children.length < 10) {
						MQController.nav.li[i] = document.createElement('li');
						MQController.nav.li[i].setAttribute('style','border:1px solid #BFBEBB;width:98%;height:6vh;border-radius:0 0 0 10px;align-items:center;margin-bottom:3%;display:flex;jusitfy-content:center;align-content:center;');
						MQController.nav.li[i].appendChild(MQController.nav.a[i]);
						MQController.nav.target.appendChild(MQController.nav.li[i]);
					}
				}
                MQController.nav.logo.child[0].style.fontSize = '24px';
                MQController.nav.logo.child[1].style.fontSize = '27px';
                MQController.nav.logo.parent.style.marginTop = '6%';
                MQController.nav.logo.parent.style.marginLeft = '10%';
                MQController.main.info.setAttribute('style','display:none;');
                MQController.main.filter.setAttribute('style','position:relative;width:50%;margin-left:6%;margin-top:3%;margin-bottom:3%');
                for(let i=0; i<MQController.main.filmChild.a.length; i++){
                    MQController.main.filmChild.a[i].setAttribute('style','width:93%;height:17vh;');
                    MQController.main.filmChild.p[i].setAttribute('style','font-size:26px;');
                }
                console.log(MQController.main.filmBox, MQController.main.filmChild);
				MQController.nav.parent.style.display = 'none';	
				MQController.nav.target.setAttribute('style','width:100%;height:fit-content;margin:0;position:absolute;left:0;top:14%;padding:1%;border-radius:4px;list-style:none;border:1px solid #BFBEBB;background-color:white;');
			break;
		}
	}
}

MQController.evnt();
document.body.addEventListener('onload',MQController.cntr());

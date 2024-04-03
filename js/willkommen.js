console.log('Willkommen JS ist da..');
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
        footer: document.querySelector('footer'),
        parent: document.querySelector('#willkommen-main')
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
                MQController.main.parent.setAttribute('style','width:50%;');
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
            MQController.main.parent.setAttribute('style','width:100%;margin-left:0;margin-right:33%;');
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
	//		console.log(response);
			})
		.catch(err => {
			console.log(err);
		})
		return this.outz;
	}
}
      let anim = {
            source: null,
            sizeValue: 110,
            counter: 0,
            interval: null,
            init: () => {
                anim.source = document.querySelectorAll('.willkommen-dar');
                anim.interval = setInterval(anim.go, 30);
            },
            go: () => {
                if(anim.counter < anim.sizeValue){
                    anim.counter++;
                    for(let i=0; i<anim.source.length; i++){
                        anim.source[i].style.width = `${anim.counter}px`;
                        anim.source[i].style.height = `${anim.counter}px`;
                    }
                }else{
                    clearInterval(anim.interval);
                }
            }
        }

        anim.init();

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
            this.connection =  new FetchTask('finder', 'film', './fetchOverview.php?');
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
                    this.parent.innerHTML += `<div style='height:9vh;border:2px solid white;padding:2%;font-family:monospace;margin-bottom:3px;border-radius:5px;'><span style='clear:both'></span><img src='./poster/${this.out[key01]['Poster']}' width='45' style='float:left;margin-right:2%;'><p style='vertical-align:top;margin-top:0px;width:200px;color:white;line-height:1vh;aline-height:top;'>Titel: ${this.out[key01]['Titel']}<span style="color:blue;font-size:36px;">.</span></p>
                    <a href='./filmpages/${this.out[key01]['Titel'].replaceAll(' ','')}.php'>Website von "${this.out[key01]['Titel']}"</a></div>`; 
					if(this.out[key01]['Titel'].length < 20){
						let finderTitel = document.querySelectorAll('.finder-titel');
						finderTitel[finderTitel.length-1].style.height = '4vh'; 
					}
				}
            }else{
                this.parent.innerHTML = "Sorry, wir haben das nicht :(";
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
	let anim01 = document.querySelector('#menu > div');
	anim01.addEventListener('click', menuAnimation.fun);
	MQController.evnt();
	document.body.addEventListener('onload',MQController.cntr());
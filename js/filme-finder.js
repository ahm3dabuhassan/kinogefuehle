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
            this.connection =  new FetchFinder('finder', 'film', '../fetchOverview.php?');
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
        finder.cancelButton.el.addEventListener('click', (e) => {
            finder.parent.style.display = 'none';
            finder.element.value = '';
            e.target.remove();
        });
            this.parent.innerHTML = '';
            if(finder.element.value != '') {
                this.parent.style.display = 'block';
                finder.cancelButton.el.innerHTML = 'X';
                finder.cancelButton.el.setAttribute('style','display:flex;align-items:center;justify-content:center;position:relative;right:0px;top:0px;width:18px;height:18px;padding:1px;border-radius:50%;background-color:#252525;color:white;font-weigth:bold;float:right;margin-left:4%;margin-right:3%;');
                finder.cancelButton.target.appendChild(finder.cancelButton.el);
            } else {
                this.parent.style.display = 'none';
                finder.cancelButton.el.remove();
            }
            if(Object.keys(finder.out).length != 0){
                for(let key01 in this.out) {
                    this.parent.innerHTML += `<div style='height:9vh;border:2px solid white;padding:2%;font-family:monospace;margin-bottom:3px;border-radius:5px;'><span style='clear:both'></span><img src='../poster/${this.out[key01]['Poster']}' width='45' style='float:left;margin-right:2%;'><p style='vertical-align:top;margin-top:0px;width:200px;color:white;line-height:1vh;aline-height:top;'>Titel: ${this.out[key01]['Titel']}<span style="color:blue;font-size:36px;">.</span></p>
                    <a href='../filmpages/${this.out[key01]['Titel'].replaceAll(' ','')}.php'>Website von "${this.out[key01]['Titel']}"</a></div>`; 
                }
            }else{
                this.parent.innerHTML = "Sorry, wir haben das nicht :(";
            }
    }
}

let findEvent = document.querySelector('#finder > input');
findEvent.addEventListener('keyup',() => {finder.funk();});
findEvent.addEventListener('keydown',() => {finder.funk();});

let repearStyle = {
    target: [document.querySelectorAll('#selection > a'),
    document.querySelector('#finder'),
    document.querySelector('#finder > input'),
    document.querySelector('#outOfFinder'),
    document.querySelectorAll('#menu-show > li'),
    document.querySelectorAll('#menu-show > li > a')],
    style: ['padding:1%;border:1px solid #BFBEBB;border-radius:10px;width:65%;height:3vh;grid-column:2/3;grid-row:1/3;align-self:center;justify-self:center;display:flex;align-items:center;',
    'width:85%;margin-left:2%;', 
    'background:rgba(128, 128, 128, 0.8);display:none;position:absolute;top:16%;left:28%;border-radius:10px;padding:1%;z-index:111;width:20%'],
    assign:() => {
        for(let i=0; i<repearStyle.target[0].length;i++){
            repearStyle.target[0][i].className = 'mq-element';
        }
        for(let i=0; i<repearStyle.target[4].length-1;i++){
            repearStyle.target[4][i].className = 'menuAnimL';
            repearStyle.target[5][i].className = 'menuAnimA';
        }
        repearStyle.target[1].setAttribute('style',repearStyle.style[0]);
        repearStyle.target[2].setAttribute('style',repearStyle.style[1]);
        repearStyle.target[3].setAttribute('style',repearStyle.style[2]);
        repearStyle.target[2].placeholder = 'Filme, Gefühle...';
        console.log(repearStyle.target[4],repearStyle.target[5]);
    }
}
repearStyle.assign();

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

document.querySelector('body > div:nth-of-type(1)').addEventListener('click', () => {
    let menu = document.getElementById('menu-input');
    menu.checked = false; 
    document.querySelector('#filter').style.top = '20%';
    filter.mn.sts = true

});
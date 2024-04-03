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
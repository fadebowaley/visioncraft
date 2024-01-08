const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');





function store(value){
    localStorage.setItem('darkmode', value);
}



function load(){
    const darkmode = localStorage.getItem('darkmode');
    const body = document.querySelector('body');

    if(!darkmode){
        store(false);
    }
    else if (darkmode == 'true'){
        body.classList.add('darkmode');
    }
}
load();
btn.addEventListener('click', () => {
    body.classList.toggle('darkmode');
    icon.classList.add('animated')

store(body.classList.contains('darkmode'))

if(body.classList.contains('darkmode')){
    icon.classList.remove('//the icon name like the one for material  the sun');
    icon.classList.add('//the icon name like the one for material the moon');
}
else{
    icon.classList.remove('//moon')
    icon.classList.add('//sun')
}

setTimeout( () => {
    
 icon.classList.remove('animated');
}, 500)
})

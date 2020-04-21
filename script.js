var buttons = document.querySelectorAll('.btn');
var screen = document.querySelector('#screen');
var equal = document.querySelector('#equals');
var clear = document.querySelector('#clear');
var posNeg = document.querySelector('#pos-neg');

//Flag
var lastIsOp = false;
var addDec = true;

var currNum = '';
var currOp = '';
var components = [];

document.getElementById('calculator').addEventListener('click', function(event) {
    // if anything but a button is pressed, end function
    if (!event.target.matches('.btn')) {
      return;
    } else if (event.target.matches('.num')) {        
        handleNumber(event.target.innerText);
    } else if (event.target.matches('.op')) {
        handleOperator(event.target.innerText);
    } else if (event.target.id === 'dec') {
        handleDec();
    }else if (event.target.id === 'equals'){
        handleEqual();
    }else if (event.target.id === 'clear'){
        handleClear();
    }else if (event.target.id === 'pos-neg'){
        handlePosNeg();
    }

    console.log(components);
    console.log('CurrNum',currNum)
});

function handleClear(){
    setScreen(0);
    lastIsOp = false;
    lastIsNum = false;
    addDec = true;
    currNum = 0;
    currOp = '';
    components = [];
}

function setScreen(input){
    screen.innerText = input;
}

function addToScreen(input){  
    screen.innerText += input;
}

function handleNumber(num) {
    // if currNumber exists
    if(currNum){
        currNum += num;
    }else if(currOp){
        currNum += num;
        components.push(currOp);
        currOp = '';
    }

    if(screen.innerText === '0'){
        currNum = num;
        setScreen(num);
    }else {
        
        addToScreen(num);
    }

    //update Flags
    lastIsOp = false;
}

function handleOperator(op) {
    if(currOp){
        var newScreenText = screen.innerText.slice(0,-1) + op;
        setScreen(newScreenText);    
    }else{
        addToScreen(op);
        components.push(currNum);
        //set currNum to null
        currNum = '';
    }
    //
    currOp = op;
    //update flags
    lastIsOp = true;
    addDec= true;
}

function handleDec() {
    if(addDec){
        addToScreen('.');
        if(currOp){
            components.push(currOp);
            currOp = '';
        }
        currNum += '.';
    }    
    addDec = false;
}

function handleEqual(){   
    if(currNum){
        components.push(currNum);
        currNum = '';
    }else {
        currOp = '';
    }

    //add () if there are negative number
    for (var i = 0; i < components.length; i++){
        if(components[i].startsWith('-') && components[i].length != 1){
            components[i] = '(' + components[i] + ')';
        }
    }
    
    //add 0 if user didnt enter 0 before dec
    for (var i = 0; i < components.length; i++){
        if(components[i].startsWith('.')){
            components[i] = '0' + components[i];
        }
    }

    console.log(components);

    var answer = eval(components.join(''));    
    //if answer has decimal, set the addDec to false;
    if(answer % 1){
        addDec = false;
    }else{
        addDec = true;
    }

    currNum = answer.toString();

    //reset the array
    components = [];
    setScreen(answer);   
    lastIsOp = false
}

function handlePosNeg(){
    if(currNum && currNum.startsWith('-')){
    
        currNum = currNum.slice(1);
    
    }else if(currNum){
        currNum = '-' + currNum;
    }else 
    {
        currNum = '-';
        components.push(currOp);
        currOp = ''
    }    
    var newScreenText = components.join('') + currNum;
    setScreen(newScreenText);
}

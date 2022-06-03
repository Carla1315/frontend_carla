let screen = document.getElementById("screenMessage");
let btn = {
    One : document.getElementById("btnOne"),
    Two : document.getElementById("btnTwo"),
    Three : document.getElementById("btnThree"),
    Four : document.getElementById("btnFour"),
    Five : document.getElementById("btnFive"),
    Six : document.getElementById("btnSix"),
    Seven : document.getElementById("btnSeven"),
    Eight : document.getElementById("btnEight"),
    Nine : document.getElementById("btnNine"),
    Zero : document.getElementById("btnZero"),
    Up : document.getElementById("btnUp"),
    Down : document.getElementById("btnDown"),
    Start : document.getElementById("btnStart")
}

let primaryMenu =  `<p>
                        <input type="radio" name="optionPrimary" id="depositOption" value="deposit" checked> Depositar 
                    </p>
                    <p>
                        <input type="radio" name="optionPrimary" id="withdrawOption" value="withdraw"> Retirar 
                    </p>`
let depositMenu =  `<p>
                        <input type="radio" name="optionDeposit" id="tenOption" value="10" checked> 10
                    </p>
                    <p>
                        <input type="radio" name="optionDeposit" id="twentyOption" value="20"> 20
                    </p>
                    <p>
                        <input type="radio" name="optionDeposit" id="fifthyOption" value="50"> 50
                    </p>
                    <p>
                        <input type="radio" name="optionDeposit" id="oneHundredOption" value="100"> 100 
                    </p>
                    <p>
                        <input type="radio" name="optionDeposit" id="twoHundredOption" value="200"> 200
                    </p>`
let withdrawMenu =  ``
let finishMenu =  `<p>
                        Thank you, press start to return
                    </p>`
let errorMenu =  `<p>
                        Error
                    </p>`
let radioOption = document.getElementsByName("optionPrimary");

let totalMoney = 570;
let moneyTowithdraw = "";
withdraw = (moneyOut) => {
    return totalMoney >= moneyOut ? totalMoney -= moneyOut : -1;
}
deposit = (moneyIn) => {
    return moneyIn == 10 || moneyIn == 20 || moneyIn == 50 || moneyIn == 100 || moneyIn == 200 ? 
            totalMoney += moneyIn : -1;
}
let isRadioExist = true;
let isNumber = false;
function btnStart(){
    if(isRadioExist && radioOption[0].checked && radioOption[0].id == "depositOption"){
        screen.innerHTML = depositMenu;
        radioOption = document.getElementsByName("optionDeposit");
        return
    }
    if(isRadioExist && radioOption[1].checked && radioOption[1].id == "withdrawOption"){
        screen.innerHTML = withdrawMenu;
        blockNumbers (false);
        isRadioExist = false;
        isNumber = true;
        radioOption = undefined;
        return
    }
    if(isRadioExist && radioOption[0].id == "tenOption"){
        let isSuccess = -1;
        for (let indexRadioOption = 0; indexRadioOption < radioOption.length; indexRadioOption++ == true) {
            const element = radioOption[indexRadioOption];
            if( element.checked == true )  {
                isSuccess = deposit(parseInt(element.value));
            }
        }
        console.log(totalMoney);
        screen.innerHTML = finishMenu + isSuccess;
        isRadioExist = false;
        radioOption = undefined;
        radioOption = document.getElementsByName("optionDeposit");
        return
    }
    if(isNumber){
        let isSuccess = withdraw(parseInt(moneyTowithdraw));
        moneyTowithdraw = "";
        if(isSuccess != -1){
            screen.innerHTML = finishMenu + isSuccess;
        }
        else {
            screen.innerHTML = errorMenu;
        }
        blockNumbers (true);
        isRadioExist = false;
        isNumber = false;
        return
    }
    isRadioExist = true
    main();
}
function changeChecked(direction){
    for (let indexRadioOption = 0; indexRadioOption < radioOption.length; indexRadioOption++ == true) {
        const element = radioOption[indexRadioOption];
        if( element.checked == true )  {
            const idOptionNext = radioOption[indexRadioOption + direction].id;
            const optionNext = document.getElementById(idOptionNext);
            optionNext.checked = true;
            return
        }
    }
}
function btnUp(){
    if(!radioOption[0].checked == true){
        changeChecked(-1)
    }
}
function btnDown(){
    if(!radioOption[radioOption.length - 1].checked){
        changeChecked(1)
    }
}
function btnOne(){
    let number = "1";
    moneyTowithdraw = screen.innerHTML += number;
}
function btnTwo(){
    let number = "2";
    moneyTowithdraw = screen.innerHTML += number
}
function btnThree(){
    let number = "3";
    moneyTowithdraw = screen.innerHTML += number
}
function btnFour(){
    let number = "4";
    moneyTowithdraw = screen.innerHTML += number
}
function btnFive(){
    let number = "5";
    moneyTowithdraw = screen.innerHTML += number
}
function btnSix(){
    let number = "6";
    moneyTowithdraw = screen.innerHTML += number
}
function btnSeven(){
    let number = "7";
    moneyTowithdraw = screen.innerHTML += number
}
function btnEight(){
    let number = "8";
    moneyTowithdraw = screen.innerHTML += number
}
function btnNine(){
    let number = "9";
    moneyTowithdraw = screen.innerHTML += number
}
function btnZero(){
    let number = "0";
    moneyTowithdraw = screen.innerHTML += number
}
function blockNumbers (value) {
    btn.One.disabled = value;
    btn.Two.disabled = value;
    btn.Three.disabled = value;
    btn.Four.disabled = value;
    btn.Five.disabled = value;
    btn.Six.disabled = value;
    btn.Seven.disabled = value;
    btn.Eight.disabled = value;
    btn.Nine.disabled = value;
    btn.Zero.disabled = value;
}
function blockArows (value) {
    btn.Up.disabled = value;
    btn.Down.disabled = value;
}
function blockStart (value) {
    btn.Start.disabled = value;
}
function menu() {
    blockNumbers (true);
    screen.innerHTML = primaryMenu;
    radioOption = document.getElementsByName("optionPrimary");
}
function main() {
    menu();
}
main();
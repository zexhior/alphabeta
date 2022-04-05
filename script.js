var tds = document.querySelectorAll('td');
var result = document.querySelector('p');
var symbole1 = "X";
var symbole2 = "O";
var winner1 = false;
var winner2 = false;
var joueur = true;
var iteration = 0;

const testWinners = (tds,symbole)=>{
    if(tds[0] === symbole && tds[1] === symbole && tds[2] === symbole){
        return true;
    }
    if(tds[0] === symbole && tds[3] === symbole && tds[6] === symbole){
        return true;
    }
    if(tds[0] === symbole && tds[4] === symbole && tds[8] === symbole){
        return true;
    }
    if(tds[1] === symbole && tds[4] === symbole && tds[7] === symbole){
        return true;
    }
    if(tds[2] === symbole && tds[5] === symbole && tds[8] === symbole){
        return true;
    }
    if(tds[2] === symbole && tds[4] === symbole && tds[6] === symbole){
        return true;
    }
    if(tds[3] === symbole && tds[4] === symbole && tds[5] === symbole){
        return true;
    }
    if(tds[6] === symbole && tds[7] === symbole && tds[8] === symbole){
        return true;
    }
    return false;
}

function caluclpoint(games,symbole,symboleopnt){
    let point = 0;
    if(games[0]==symbole&&games[1]==symbole){
        point++;
    }
    if(games[0]==symbole&&games[3]==symbole){
        point++;
    }
    if(games[0]==symbole&&games[4]==symbole){
        point++;
    }
    if(games[1]==symbole&&games[2]==symbole){
        point++;
    }
    if(games[1]==symbole&&games[4]==symbole){
        point++;
    }
    if(games[2]==symbole&&games[4]==symbole){
        point++;
    }
    if(games[2]==symbole&&games[5]==symbole){
        point++;
    }
    if(games[3]==symbole&&games[4]==symbole){
        point++;
    }
    if(games[3]==symbole&&games[6]==symbole){
        point++;
    }
    if(games[4]==symbole&&games[5]==symbole){
        point++;
    }
    if(games[4]==symbole&&games[6]==symbole){
        point++;
    }
    if(games[4]==symbole&&games[7]==symbole){
        point++;
    }
    if(games[4]==symbole&&games[8]==symbole){
        point++;
    }
    if(games[5]==symbole&&games[8]==symbole){
        point++;
    }
    if(games[6]==symbole&&games[7]==symbole){
        point++;
    }
    if(games[7]==symbole&&games[8]==symbole){
        point++;
    }
    return point;
}

function h(games,symbole1,symbole2,winner_player1,winner_player2,depth){
    if(winner_player1){
        //console.log(games);
        console.log("winner 1");
        return -6;
    }
    if(winner_player2){
        //console.log(games);
        console.log("winner 2");
        return 6;
    }
    let point_player1 = caluclpoint(games,symbole1,symbole2);
    let point_player2 = caluclpoint(games,symbole2,symbole1);
    console.log(point_player1,point_player2);
    return point_player2 - point_player1;
}

function alphabeta(iter,games,winner_player1,winner_player2,symbole1,symbole2,alpha,beta,max,d,height){
    let free_places = [];
    games.forEach((element,key)=>{if(element===""){free_places.push(key)}});
    let i = free_places[0];
    if(d==0||winner_player1===true||winner_player2===true||free_places.length===0){
        //console.log(iter,alpha,beta);
        let value = h(games,symbole1,symbole2,winner_player1,winner_player2,d);
        console.log(value,iter);
        return {value,iter}
    }
    else{
        if(max){
            let alpha = Number.NEGATIVE_INFINITY;
            free_places.forEach(element => {
                let sub_tab = [];
                games.forEach(data=>{
                    sub_tab.push(data);
                })
                sub_tab[element] = symbole2;
                console.log(sub_tab,d);
                winner_player2 = testWinners(sub_tab,symbole2);
                let {value,iter} = alphabeta(element,sub_tab,winner_player1,winner_player2,symbole1,symbole2,alpha,beta,!max,d-1,height)
                if(alpha<value){
                    i = element;
                }
                console.log({value,i,iter,a:"alpha",depth:d});
                //console.log(value," ",iter);
                //console.log("alpha ",value,alpha,beta);
                alpha = Math.max(alpha,value);
                if(alpha >= beta){
                    //console.log("stop alpha");
                    return {value: alpha,iter: i};
                }
            });
            return {value: alpha,iter: i};
        }else{
            let v = Number.POSITIVE_INFINITY;
            free_places.forEach(element => {
                let sub_tab = [];
                games.forEach(data=>{
                    sub_tab.push(data);
                })
                sub_tab[element] = symbole1;
                console.log(sub_tab,d);
                winner_player1 = testWinners(sub_tab,symbole1);
                let {value,iter} = alphabeta(element,sub_tab,winner_player1,winner_player2,symbole1,symbole2,alpha,beta,!max,d-1,height)
                //console.log(value," ",iter);
                //console.log("beta ",value,alpha,beta);
                if(beta>value){
                    i = element;
                }
                console.log({value,i,iter,b:"beta",depth:d});
                beta = Math.min(beta,value);
                if(alpha>=beta){
                    //console.log("stop beta");
                    return {value: beta,iter: i};
                }
            })
            return {value: beta,iter: i};
        }
    }
}

//let tab = [12,10,3,5,5,8,10,13,2,Number.POSITIVE_INFINITY,11];
/*let tab = [13,8,24,-5,23,15,14,-20,15];
let alpha = Number.NEGATIVE_INFINITY;
let beta = Number.POSITIVE_INFINITY;

alert(alphabeta(0,tab,tableau,winner1,winner2,symbole1,symbole2,alpha,beta,true,3));*/

tds.forEach((element,key)=>{
    element.addEventListener('click',()=>{
        if(element.textContent != symbole1 && element.textContent != symbole2 && !winner1 && !winner2 && iteration<8){
            element.textContent = symbole1;
            element.style.backgroundColor = "blue";

            let tableau = [];
            tds.forEach(element=>{tableau.push(element.textContent)});
            tableau[key] = symbole1;
            winner1 = testWinners(tableau,symbole1);
            iteration++;
            if(winner1){
                result.textContent = 'Player 1 wins!';
            }
            else{
                let alpha = Number.NEGATIVE_INFINITY;
                let beta = Number.POSITIVE_INFINITY;
                let {iter} = alphabeta(0,tableau,false,false,symbole1,symbole2,alpha,beta,true,4);
                console.log("////////////////////////////////////","////////////////////////////////////")
                console.log("resultat ",iter);
                tds[iter].textContent = symbole2;
                tds[iter].style.backgroundColor = "red";
                tableau[iter] = symbole2;
                iteration++;
                //console.log(tableau);
                winner2 = testWinners(tableau,symbole2);
                if(winner2){
                    result.textContent = 'Player 2 wins!';
                }
                if(iteration>7){
                    result.textContent = 'Draw!';
                }
            }
        }
    });
});
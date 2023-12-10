let gameEls = document.querySelectorAll(".gameEl")
let op = '';
const socket = io();
let el =0;
let yourMove =true;
let arr = [0,0,0,0,0,0,0,0,0]
gameEls.forEach(el => {
    el.onclick = function(e){
        // socket.on("socket.broadcast",  {el:el.getAttribute("name")});
        console.log(el.getAttribute("name"));
           
            arr[Number(el.getAttribute("name")-1)]=1
            socket.emit("socket.broadcast", {el:el.getAttribute("name"), id:socket.id, move:arr})
            yourMove=false
            if(yourMove==false){
                for(let i =0; i<gameEls.length;i++){
                 gameEls[i].style.pointerEvents = 'none';
                }
             }
             else{
                 for(let i =0; i<gameEls.length;i++){
                     gameEls[i].style.pointerEvents = 'true';
                    }
             }
        el.style.backgroundColor ="black";
        if((arr[0]==1 && arr[1]==1 && arr[2]==1) || (arr[3]==1 && arr[4]==1 && arr[5]==1) || (arr[6]==1 && arr[7]==1 && arr[8]==1) || (arr[0]==1 && arr[3]==1 && arr[6]==1) || (arr[1]==1 && arr[4]==1 && arr[7]==1)|| (arr[2]==1 && arr[5]==1 && arr[8]==1)|| (arr[0]==1 && arr[4]==1 && arr[8]==1)|| (arr[2]==1 && arr[4]==1 && arr[6]==1)){
            console.log(1);
            socket.emit("socket.broadcast", {win:true})
            alert("Вы победили!")
          }
     
    }
 
});

socket.on("socket.broadcast",(text)=>{
    yourMove=true
    if(yourMove==true){
        for(let i =0; i<gameEls.length;i++){
            gameEls[i].style.pointerEvents = 'auto';
           }
     }
     if(text.win===false){
        alert("Вы проиграли!")
     }
     if(text.win){
        socket.emit("socket.broadcast", {win:false})
       
     }else{
        console.log(text);
        gameEls[text.el-1].style.backgroundColor = "red"
        gameEls[text.el-1].style.pointerEvents='none';
     }
         
     
   
    
  })
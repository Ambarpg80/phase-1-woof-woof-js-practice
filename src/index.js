document.addEventListener('DOMContentLoaded', ()=>{
fetch('http://localhost:3000/pups')
.then(res=>res.json())
.then(pups=>showDogNames(pups))
   
/*========== SHOW DOG NAMES ======================*/

function showDogNames(pups){
    const dogBarDiv = document.querySelector('#dog-bar');
    const ul = document.createElement('ul');
    for(let pup of pups){
    let li = document.createElement('li');
    let span = document.createElement('span')
    span.innerText = `${pup.name}`;
    li.style.float = 'left';
    li.style.display = 'block';
    li.style.margin = '10px';
    span.style.padding = '15px';
    li.append(span);
    ul.append(li);
    dogBarDiv.append(ul);

    li.addEventListener('click',()=>clickAPup(pup))
    }
}


//*======== CLICK ON DOG NAME AND SEE INDIVIDUAL DOG ========== */
function clickAPup(pup){
    //console.log("pup", pup)
    const infoDiv = document.getElementById('dog-info');
    let img = document.createElement('img');
    let h2 = document.createElement('h2');
    let btn = document.createElement('button');
    btn.id = "good-bad"
    infoDiv.innerHTML=''
    img.src = pup.image; 
    h2.innerText = pup.name;
    btn.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";

    infoDiv.append(img,h2,btn)

    /* ===== TOGGLE GOOD DOG BAD DOG=========== */
    btn.addEventListener('click', (pups)=>{
           //console.log(toggle(pup)); 
           console.log(`${pup.isGoodDog}`);
            
            fetch(`http://localhost:3000/pups/${pup.id}`,{
                    method : "PATCH",
                    headers:{
                    "Content-Type" : "application/json"
                    //"Accept" : "application/json"
                    },
                    body: JSON.stringify({
                 isGoodDog: !pup.isGoodDog
                 })
                })
                .then(res => res.json())
                .then(puppy => clickAPup(puppy))
        })
} 

/* ============= BONUS: FILTER TO SHOW GOOD DOGS ================ */
let filterBtn = document.getElementById('good-dog-filter')
document.getElementById('good-dog-filter').addEventListener('click', ()=>{
    let message = true
    filterBtn.innerText = message ? "Filter good dogs: ON"  : "Filter good dogs: OFF"
    fetch('http://localhost:3000/pups')
    .then(res=>res.json())
    .then(puppies => {
        const dogBarDiv = document.querySelector('#dog-bar');
        const ul = document.createElement('ul');
        for(let puppy of puppies){
               // console.log(puppy.isGoodDog)
            if(puppy.isGoodDog === true){
            dogBarDiv.innerHTML = "";
            let li = document.createElement('li');
            let span = document.createElement('span')
            span.innerText = `${puppy.name}`;
            li.style.float = 'left';
            li.style.display = 'block';
            li.style.margin = '10px';
            span.style.padding = '15px';
            li.append(span);
            ul.append(li);
            dogBarDiv.append(ul);
            li.addEventListener('click',()=>clickAPup(puppy))
            }
        
        }
    })
})

})


 
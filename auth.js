const content = document.querySelector(".content");
const userContent = document.querySelectorAll('.userContent');
const managerContent = document.querySelectorAll('.managerContent');

//listening for changes
auth.onAuthStateChanged(user=>{
    if(user){
        console.log("logged in ");
        db.collection('users').get().then(snapshot=>{
           
            const content = document.querySelector(".content");
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            console.log(email,password);
            snapshot.forEach(element => {
                const user = element.data();
                if(user['email']==email){
                    console.log(user['email']);
                    console.log(user['Role']);
                    content.innerHTML = `<h2 class="content"> you are now logged in as ${user['email']}  and have a role of ${user['Role']}</h2>`;
                    if(user['Role']=='manager'){
                        managerContent.forEach(item => {item.style.display='block'});
                        userContent.forEach(item => {item.style.display='block'});
                    }else{
                        userContent.forEach(item => {item.style.display='block'});
                    }

                }
        
            });
            



        
        }); 

    }else{
        console.log("not logged in");
        content.innerHTML = '<h2 class="content"> Login to check </h2>'
        managerContent.forEach(item => {item.style.display='none'});
        userContent.forEach(item => {item.style.display='none'});
        

    }

});

//logging in 
const loginForm = document.querySelector("#login-form");
console.log(loginForm);

loginForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email,password);
    
    
    }
)

const logout = document.querySelector("#logout");
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then( ()=> {
        console.log("logged out ");

    })
})


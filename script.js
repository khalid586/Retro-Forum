let count = 0;
const Loader = document.getElementById('loader');
const POSTS = document.getElementById('posts');
let readId = [];

const addLoader = () => {
    POSTS.innerHTML = ``;
    POSTS.innerHTML = `
            <div id="loader" class="flex items-center justify-center mt-4">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <p class="pl-2 text-green-500 text-xl font-bold">Loading Data</p>
                <span class="sr-only">Loading...</span>
            </div>
    `
}

function FETCH(URL = 'https://openapi.programming-hero.com/api/retro-forum/posts',load = 1){

    addLoader();

    setTimeout(() =>{
        fetch(URL)
        .then(response => response.json())
        .then(data => showAllData(data))
        .catch(error => {
            console.log(error)
            showAllData(1);
        })
    },2000)
}

FETCH();

fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
.then(res=> res.json())
.then(data => showLatest(data))
.catch(err => console.log(err));


function showLatest(data){
   data.forEach(detum =>{
       console.log(detum);
       const newPostDiv = document.getElementById('latestPosts');
       const newPost = document.createElement('div');
       newPost.innerHTML =  `
           <div class="m-2 xl:max-w-sm bg-white border rounded-lg shadow-lg border-l-4 border-l-red-500  border-b-8 border-b-red-500">
               <div class = "">
                   <img class="" src="${detum.cover_image}" alt="" />
               </div>
               <div class="p-5">
                   <p class="mb-3 text-gray-400 font-medium text-sm flex gap-2"> <img src = "assets/calendar-regular.svg" width = "15px"> ${detum.author.posted_date== undefined?'No publish date':detum.author.posted_date}</p>
                   <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900">${detum.title}</h5>
                   <p class="mb-3 text-gray-400 dark:text-gray-400 font-semibold">${detum.description}</p>
                   <div class="flex gap-4 items-center">
                       <img src="${detum.profile_image}" alt="" class="border h-[30px] w[30px] rounded-full">
                       <div id = "name_designation">
                           <p class="pb-1 font-bold text-md">${detum.author.name}</p>
                           <p class="text-gray-500 font-semibold">${detum.author.designation == undefined?'unknown':detum.author.designation}</p>
                       </div>
                   </div>
               </div>
           </div>
       `
       newPostDiv.appendChild(newPost);
   })
}


 function showAllData(data){
    document.getElementById('posts').innerHTML = ``;

    if(typeof data === 'object'){
         console.log(Object.keys(data.posts[0]) , Object.values(data.posts[0]))
        data.posts.forEach(detum => {
            const Data = document.createElement('p');
            const Title = detum.title;
            const color = detum.isActive?"bg-green-500":"bg-red-500";

            // console.log(detum.id);
            
            if(readId.find(item => item == detum.id)){
                btn = "<button class = 'flex items-center  gap-2 text-red-500 font-bold text-xl rounded-xl'>Marked as read</button>"
            }
            else{
                btn = `<button id='btn-${detum.id}' onclick='addPost(${detum.id},${detum.view_count})' class='show-btn flex items-center gap-2 text-green-500 font-bold text-xl rounded-xl'><img class='w-[40px] h-[30px] bg-green-500 rounded-full p-2' src='assets/envelope-open-regular.svg' alt=''>Mark as read</button>`;
            }

            Data.innerHTML = `
                <div class="xl:flex px-2  w-full my-4 rounded-xl shadow-md border-b-green-500 border-b-4 border-l-2 border-l-green-400">
            
                    <div class="relative inline-block">
                        <div class="absolute top-0 left-20 mt-6 w-4 h-4 ${color} rounded-full"></div>
                        <img src="${detum.image}" alt="hello" class="mt-8 ml-4  bg-red-300 w-[80px] h-[60px] rounded-lg">
                    </div>
                    
                    <div id = "right" class="m-4 p-4 rounded-xl w-full" >
                        <p class="text-md font-semibold text-gray-600"># ${detum.category} <span class = "xl:ml-8 ml-4 text-sm text-gray-400"> Author: ${detum.author.name} </span></p>
                        <p id="title-${detum.id}" class="text-2xl font-bold py-2">${Title}</p>
                        <p class="text-gray-400 pr-8 py-2">${detum.description}</p>
                        <div class="xl:flex py-4 justify-start gap-4 items-center">
                            <div class = "flex gap-4">                             
                                <p class="pr-2 flex gap-1 mb-4 xl:mb-1 items-center"><img width = "30px" src = "assets/message-regular.svg">${detum.comment_count}</p>
                                <p class="pr-2 flex gap-1 mb-4 xl:mb-1 items-center"><img width = "30px" src = "assets/eye-regular.svg">${detum.view_count}</p>
                                <p class="pr-4 flex gap-1 mb-4 xl:mb-1 items-center"><img width = "30px" src = "assets/clock-regular.svg">${detum.posted_time}</p>
                            </div>
                            
                            <div class = "flex items-center justify-start mt-4 xl:mt-0 p-4 rounded-xl">
                                ${btn}
                            </div>
                        </div>
                    </div>
                </div>
            
            `
            Data.setAttribute('id', `${detum.id}`);
            const post = document.getElementById('posts');
            post.appendChild(Data);

        } )
        
        buttonClickInitializer();
        console.log(data.posts[0])
    }
    else{
        document.getElementById('posts').innerHTML = `
        <p class = "font-extrabold text-4xl"> No matches found </p>
        `
    }
    Loader.classList.toggle('hidden',true);
    Loader.classList.toggle('flex',false);
    
}

function buttonClickInitializer(){
    const buttons = document.querySelectorAll('.show-btn');
    // console.log(buttons)

    buttons.forEach(button =>{
        button.addEventListener('click',()=>{
            console.log('clicked')
            const Btn = document.getElementById(`${button.id}`)
            Btn.innerHTML = "Marked as read";
            Btn.classList.toggle('text-green-500',false)
            Btn.classList.toggle('text-red-500',true)
        })
    })
}


function addPost(id,views){

    const buttonId = `btn-${id}`;
    const Btn = document.getElementById(buttonId);

    if(Btn.classList.contains('text-green-500')){
        const post = document.getElementById(`title-${id}`);
        postTitle = post.innerText;
        ++count;
        const readPost = document.createElement('div');
        readId.push(id);
    
        const currCount = document.getElementById('Count');
        currCount.innerText = count;
    
        readPost.innerHTML = `
            <div class = "xl:flex justify-between bg-white p-4 my-4 rounded-lg shadow-md border-b-green-500 border-b-4 border-l-2 border-l-green-400">
                <p class = "xl:w-1/2 text-lg black font-semibold mt-2">${postTitle}</p>
                <p class = "flex gap-1 text-gray-500 items-center"><img width = "30px" src = "assets/eye-regular.svg">${views}</p>
            </div>
        `;
    
        const readPosts = document.getElementById('readPosts');
        readPosts.appendChild(readPost);
    }

}

let categoryName = '';

document.getElementById('input').addEventListener('input', (event)=>{
    categoryName = event.target.value;
})
document.getElementById('input').addEventListener('keyup', (event)=>{
    if(event.key == "Enter"){
        src_category(); 
    }
})

function src_category(){
    const URL = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
    console.log(URL);

    
    FETCH(URL,0);
}

// showAllData()
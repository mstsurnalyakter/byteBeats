const findElementById = id =>{
    return document.getElementById(id);
}

const loadAllPostData = async () =>{
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts`
    );
    const data = await res.json();
    const posts = data.posts;
    displayPostData(posts)
}

const displayPostData = posts =>{
    posts.forEach(post => {
        const div = document.createElement('div');
        div.classList =
          "card grid grid-cols-1 lg:grid-cols-3 bg-base-100 shadow-xl";
                div.innerHTML = `
        <figure class="relative">
        ${
          post.isActive
            ? `<div class="badge bg-green-600 badge-lg right-0 top-0  absolute"></div>`
            : `<div class="badge bg-red-600 badge-lg right-0 top-0  absolute"></div>`
        }

              <img
                src="${post.image}"
                alt="image"
              />
            </figure>
            <div class="card-body lg:col-span-2">
        <div>
        <div class="inter mb-4 font-medium text-[14px] flex gap-2 text-[#12192DCC]">
            <span># ${post.category}</span>
            <span>Author : ${post.author.name}</span>
        </div>
        <div class="mb-10">
            <h2 class="text-[#12132D] mb-4 text-xl font-bold">${post.title}</h2>
            <p class="inter text-[#12192D99]">${post.description}</p>
        </div>
        <div class="flex justify-between items-center">
            <div class="flex gap-10 items-center">
            <p class="flex items-center justify-center gap-2"><img src="./images/message.png" alt=""><span>${
              post.comment_count
            }</span></p>
            <p class="flex items-center justify-center gap-2"><img src="./images/eye.png" alt=""><span>${
              post.view_count
            }</span></p>
            <p class="flex items-center justify-center gap-2"><img src="./images/time.png" alt=""><span>${
              post.posted_time
            } min</span></p>
            </div>
             <div><img onclick="handleReadInfo('${post.title}','${
                  post.view_count
                }')" src="./images/email.png" alt=""></div>
        </div>
    </div>
            </div>
        `;
        findElementById("all-post-container").appendChild(div);


    });
}

const handleReadInfo = async (title, viewCount) => {
let readNum = findElementById("read-num").innerText;
readNum++;
findElementById("read-num").innerText = readNum;
console.log(readNum);
  const div = document.createElement('div');
  div.classList = "bg-white rounded-2xl flex items-center px-1 gap-2 md:px-5 mb-3";
  div.innerHTML = `
        <h2 class="text-[#12132D]">${title}</h2>
        <p class="flex items-center justify-center"><img src="./images/eye.png" alt="">${viewCount}</p>
  `;
  findElementById("read-info-container").appendChild(div);
};

loadAllPostData();
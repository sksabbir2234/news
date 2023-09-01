// const handleCategory = async () => {

//     const response = await fetch("https://openapi.programming-hero.com/api/news/categories")
//     const data = await response.json();
//     const tabContainer = document.getElementById('tab-container');
//     data.data.news_category.slice(0, 3).forEach((category) => {
//         const div = document.createElement('div');
//         div.innerHTML = `
//       <a onclick="handleLoadNews('${category.category_id}')" class="tab tab-bordered">${category.category_name}</a> 
      
//       `;
//         tabContainer.appendChild(div);
//     });



// };

// const handleLoadNews = async (categoryId) => {
//     const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);

//     const data = await response.json();
//     console.log(data.data);

//     // Assuming "cardContainer" is the container where you want to display the cards
//     const cardContainer = document.getElementById("cardContainer");
//     cardContainer.innerHTML = '';

//     data.data.forEach((news) => {
//         const div = document.createElement("div");
//         div.className = "w-1/4 p-4"; // Divide the container into 4 equal columns
//         div.innerHTML = `
//     <div class="max-w-md rounded overflow-hidden shadow-lg">
//       <img class="w-full h-64 object-cover" src="${news?.image_url}" alt="Card Image">
//       <div class="px-6 py-4">
//         <div class="font-bold text-xl mb-2">${news?.title}</div>
//         <p class="text-gray-700 text-base">${news?.details.substring(0, 100)}</p>
//         <div class="mt-2">
//           <button class="text-blue-500 hover:underline" onclick="showFullDetails(this)">Read More</button>
//         </div>
//       </div>
//       <div class="px-6 py-4">
//         <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${news?.category_id}</span>
//         <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${news?.rating.badge}</span>
//       </div>
//     </div>
//   `;
//         cardContainer.appendChild(div);
//     });

//     function showFullDetails(button) {
//         const card = button.closest(".max-w-md");
//         const details = card.querySelector(".text-gray-700");
//         details.textContent = data.data.find((news) => news?.title === card.querySelector(".font-bold")?.textContent)?.details;
//         button.remove();
//       }
// }
// handleCategory();

// Function to create a card
function createNewsCard(news) {
    const card = document.createElement("div");
    
    card.className = "w-1/4 p-4";
    card.innerHTML = `
      <div class="max-w-md rounded overflow-hidden shadow-lg">
        <img class="w-full h-64 object-cover" src="${news?.image_url}" alt="Card Image">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${news?.title}</div>
          <p class="text-gray-700 text-base">${news?.details.substring(0, 100)}</p>
          <div class="mt-2">
            <button class="text-blue-500 hover:underline" onclick="showFullDetails(this)" id='read-more-button'>Read More</button>
          </div>
        </div>
        <div class="px-6 py-4">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${news?.category_id}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${news?.rating.badge}</span>
        </div>
      </div>
    `;
    return card;
}

// Function to show full details
function showFullDetails(button, data) {
    const card = button.closest(".max-w-md");
    const details = card.querySelector(".text-gray-700");
    details.textContent = data.find(news => news?.title === card.querySelector(".font-bold")?.textContent)?.details;
    button.remove();
}

// Function to handle loading news by category
async function handleLoadNews(categoryId) {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    console.log(data.data);

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = '';
    data.data.forEach(news => {
        const card = createNewsCard(news);
        cardContainer.appendChild(card);
    });
 // Attach event listener to "Read More" buttons
 document.querySelectorAll(".read-more-button").forEach(button => {
    button.addEventListener("click", () => openNewsModal(button, data.data));
});
}

function openNewsModal(button, newsData) {
const card = button.closest(".max-w-md");
const news = newsData.find(news => news?.title === card.querySelector(".font-bold")?.textContent);

const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

modalTitle.textContent = news.title;
modalContent.innerHTML = `
    <img class="w-full h-64 object-cover" src="${news.image_url}" alt="Card Image">
    <p class="text-gray-700">${news.details}</p>
`;

const newsModal = document.getElementById("newsModal");
newsModal.showModal();
}

function closeNewsModal() {
const newsModal = document.getElementById("newsModal");
newsModal.close();
}
// Function to handle categories
async function handleCategory() {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');

    data.data.news_category.slice(0, 3).forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')" class="tab tab-bordered">${category.category_name}</a> 
        `;
        tabContainer.appendChild(div);
    });
}

// Initial function call
handleCategory();

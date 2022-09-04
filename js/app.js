const loadNewsData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatList(data.data.news_category))
        .catch(error => console.log(error));
}
const displayCatList = category_lists => {
    // console.log(category_lists)
    const categoryLists = document.getElementById('category-name-list');
    category_lists.forEach(cat_list => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0', 'p-4', 'fs-5', 'ms-3')
        li.innerHTML = `
        <a onclick ="loadCategoryDetails('${cat_list.category_id}')" href="#" class="text-decoration-none text-secondary ">${cat_list.category_name}</a>
        `
        categoryLists.appendChild(li);
    });

}
const loadCategoryDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
        .catch(error => console.log(error));
}

const displayCategoryDetails = category_details => {
    console.log(category_details)
    category_details.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    const categoryDetails = document.getElementById('category-details');
    categoryDetails.textContent = "";
    category_details.forEach(view => {
        // console.log(view.title, view.total_view)
        const { thumbnail_url, details, author, total_view, title } = view;
        console.log(thumbnail_url, details, author, total_view, title)
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-3', 'mx-auto', 'p-3');
        cardDiv.innerHTML = `
            <div class="row g-0">
    <div class="col-md-4">
      <img src="${thumbnail_url?thumbnail_url:'No Image Available'}" class="img-fluid rounded-start w-100" style="max-height:300px; "alt="...">
    </div>
    <div class="col-md-8 ps-4  d-flex align-items-center ">
      <div class="card-body">
        <h4 class="card-title pb-3 fw-bolder">${title?title:'Not Available'}</h4>
        <p class="card-text ">${details?details.slice(0,200)+'...':'Not Available'}</p>
        <div class="row row-cols-3  justify-content-between align-items-center pt-4">
        <div class="d-flex align-items-center">
        <img src="${author.img?author.img:'No Image Available'}" class="rounded-circle me-4" style="max-height:60px;width:80px">
        
        <h6>${author.name?author.name:'Not Available'}</h6>
        </div>

       <p class="fs-4 fw-semibold text-dark"><i class="fa-solid fa-eye me-3"></i>${total_view?total_view:'No views'}</p>
      <button type="button" class="btn btn-primary py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">See More</button>
      </div>
    </div>
  </div>
            `;
        categoryDetails.appendChild(cardDiv)
    })

}
loadNewsData()
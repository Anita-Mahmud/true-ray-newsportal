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
const loadCategoryDetails = id => {
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
    category_details.forEach(view => {
        // console.log(view.title, view.total_view)
        const { thumbnail_url, details, author, total_view } = view;
        // console.log(thumbnail_url, details, author, total_view)
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-3');
        cardDiv.innerHTML = `
            <div class="row g-0 ">
                        <div class="col-md-4 p-2">
                            <img src="${thumbnail_url ?thumbnail_url:'No Image Available' }" class="img-fluid rounded-start " alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
            `;
        categoryDetails.appendChild(cardDiv)
    })

}
loadNewsData()
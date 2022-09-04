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
    category_details.forEach(view => {

    })

}
loadNewsData()
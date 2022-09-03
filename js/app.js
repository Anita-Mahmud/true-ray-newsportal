const loadNewsData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatList(data.data.news_category))
}
const displayCatList = category_lists => {
    console.log(category_lists)
    const categoryLists = document.getElementById('category-name-list');
    category_lists.forEach(cat_list => {
        const li = document.createElement('li');
        li.classList.add('p-4')
        li.innerHTML = `
        <a onclick>${cat_list.category_name}</a>
        `
        categoryLists.appendChild(li);
    })

}
loadNewsData()
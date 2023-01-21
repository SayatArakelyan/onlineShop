async function getData() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

async function main() {
    const postsData = await getData();
    let currentPage = 1;
    let rows = 6;

    function displayList(arrData, rowPerPage, page) {
        const postsEl = document.querySelector('.gallery');
        postsEl.innerHTML = "";
        page--;

        const start = rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach((el) => {
            const postEl = document.createElement("div");
            postEl.classList.add("gallery__block");
            postEl.innerHTML = `<figure><img src="${el.image}" class="product" alt="#">
</figure>
<h3 class="product__title">${el.title}</h3>
<h3 class="price">${el.price}$</h3>`;
            postsEl.appendChild(postEl);
        })
    }

    function displayPagination(arrData, rowPerPage) {
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rowPerPage);
        const ulEl = document.createElement("ul");
        ulEl.classList.add('pagination__list');

        for (let i = 0; i < pagesCount; i++) {
            const liEl = displayPaginationBtn(i + 1);
            ulEl.appendChild(liEl)
        }
        paginationEl.appendChild(ulEl)
    }

    function displayPaginationBtn(page) {
        const liEl = document.createElement("li");
        liEl.classList.add('pagination__item')
        liEl.innerText = page

        if (currentPage == page) liEl.classList.add('pagination__item--active');

        liEl.addEventListener('click', () => {
            currentPage = page
            displayList(postsData, rows, currentPage)

            let currentItemLi = document.querySelector('li.pagination__item--active');
            currentItemLi.classList.remove('pagination__item--active');

            liEl.classList.add('pagination__item--active');
        })

        return liEl;
    }

    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows);
}


main();


const categorySort = document.getElementById("category__sort")


fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => new Set(json.map(item => item.category))
        .forEach(item => categorySort.innerHTML += `<li class="category__content" id="${item.replace(/\s/g, '')}">${item}</li>`)
    )


const featured = document.getElementById("featured")

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => json.splice(17, 20))
    .then(json => json.forEach(item => featured.innerHTML += `<div class="featured__block">
<figure class="featured__block"><img src="${item.image}" class="featured__img" alt="#">
</figure>
<h3 class="featured__title">${item.price}$</h3>

</div>`))

const search = document.querySelector("#search")


search.oninput = function () {
    let val = this.value.toLowerCase().trim()
    let searchItem = document.querySelectorAll(".gallery .gallery__block")
    if (val !== "") {
        searchItem.forEach(function (item) {
            if (item.innerText.search(val) === -1) {
                item.classList.add("hide")
            } else {
                item.classList.remove("hide")
            }
        });
    } else {
        searchItem.forEach(function (item) {
            item.classList.remove("hide")
        })
    }
}




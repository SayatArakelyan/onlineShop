// fetch('https://fakestoreapi.com/products')
//     .then(res => res.json())
//     .then(json => json.map(element => console.log(element)))


const categorySort = document.getElementById("category__sort")


fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => new Set(json.map(item => item.category))
        .forEach(item => categorySort.innerHTML += `<li class="category__content">${item}</li>`)
    )

const gallery = document.getElementById("gallery")

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => json.forEach(item => gallery.innerHTML += `
<div class="gallery__block">
<figure><img src="${item.image}" class="product" alt="#">
</figure>
<h3 class="product__title">${item.title}</h3>
<h3 class="price">${item.price}$</h3>
</div>
`))

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
console.log(search)

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
    }
else {searchItem.forEach(function (item){
    item.classList.remove("hide")
    })}
}







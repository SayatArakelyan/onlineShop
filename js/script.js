// fetch('https://fakestoreapi.com/products')
//     .then(res=>res.json())
//     .then(json=> json.map(element => console.log(element.category)))


const categorySort = document.getElementById("category__sort")


    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => new Set(json.map(item => item.category))
            .forEach(item => categorySort.innerHTML += `<li class="category__content">${item}</li>`)

        )






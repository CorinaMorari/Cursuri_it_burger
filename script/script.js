const order = [
    {
        "id": 0,
        "name": "brioche bun",
        "price": 8,
        "grams": 60
    }
];
let indexNr = 0;
//Delete Sign count
let countMeat = 0;
let countBSouce = 0;
let countTSouce = 0;
let countCheese = 0;
let countToppings = 0;

let images = document.querySelectorAll(".burger_image");
let files_images = document.querySelectorAll('img')
// buttons for add selects
const add_meat_btn = document.querySelector(".btn_meat");
const add_bSauce_btn = document.querySelector(".btn_bSauce");
const add_tSauce_btn = document.querySelector(".btn_tSauce");
const add_cheese_btn = document.querySelector(".btn_cheese");
const add_toppings_btn = document.querySelector(".btn_toppings");
//divs for drop-downs
const meat_div = document.querySelector(".burger_item_meat");
const topSauce_div = document.querySelector(".div_topSauce");
const bottomSauce_div = document.querySelector(".div_bottomSauce");
const cheese_div = document.querySelector(".div_cheese");
const toppings_div = document.querySelector(".div_toppings");
//divs for images parts
const meat_box = document.querySelector(".meat_box");
const bottomSauce_box = document.querySelector(".bottom_sauce_box");
const cheese_box = document.querySelector(".cheese_box");
const top_sauce_box = document.querySelector(".top_sauce_box");
const toppings_box = document.querySelector(".toppings_box");
//arrays
let select_meat_arr = document.querySelectorAll(".burger_item_meat select");
let select_arr = document.querySelectorAll("select");
let spans = document.querySelectorAll(".burger_image span");
const check = document.querySelector('.check_text')
const restart = document.querySelector('.restart_btn')
const burger_input = document.querySelector('.burger_item input')
let total_lei = 0;


const resetAnimation = () => {
    setTimeout(()=>{
        const animation = document.querySelectorAll('.animation')
        animation.forEach((item) =>{
            item.classList.remove('animation')
        })
    },800)
}

const fetch1 = (category,value = 1,new_name,i,index) => {
    const cat = category;
    fetch("./script/package.json")
        .then((response) => response.json())
        .then((data) => {
            if(value === 1){
                createSelect(data, cat);}
            else if(value === 2){
                changeImage(data,cat,new_name,i,index);
            }else if(value === 3){
                createImage(data,cat,new_name,i,index)
            }
        });
};

add_meat_btn.addEventListener("click", () => {
    fetch1("meat");
});
add_bSauce_btn.addEventListener("click", () => {
    fetch1("bottom_sauce");

});
add_tSauce_btn.addEventListener("click", () => {
    fetch1("top_sauce");
});
add_cheese_btn.addEventListener("click", () => {
    fetch1("cheese");
});
add_toppings_btn.addEventListener("click", () => {
    fetch1("toppings");
});

const createSelect = (data, category) => {
    const cat = data[category];
    indexNr++
    const divParent = document.createElement("div");
    divParent.setAttribute('index',indexNr)
    divParent.classList.add("divParent");
    const select = document.createElement("select");
    select.className = category;
    divParent.append(select);

    if (category === "meat") {
        meat_div.append(divParent);
        countMeat++;
        if (countMeat > 1) {
            deleteSign(divParent);
        }
    } else if (category === "bottom_sauce") {
        bottomSauce_div.append(divParent);
        countBSouce++;
        if (countBSouce > 1) {
            deleteSign(divParent);
        }
    } else if (category === "top_sauce") {
        topSauce_div.append(divParent);
        countTSouce++;
        if (countTSouce > 1) {
            deleteSign(divParent);
        }
    } else if (category === "cheese") {
        cheese_div.append(divParent);
        countCheese++;
        if (countCheese > 1) {
            deleteSign(divParent);
        }
    } else if (category === "toppings") {
        toppings_div.append(divParent);
        countToppings++;
        if (countToppings > 1) {
            deleteSign(divParent);
        }
    }

    cat.forEach((element) => {
        const option = document.createElement("option");
        if (element.price !== undefined) {
            if(element.name === 'sriracha'){
                option.textContent = `${element.name.toUpperCase()}(spicy) (${
                    element.price} lei)`;}
            else {
                option.textContent = `${element.name.toUpperCase()} (${
                    element.price } lei)`;
            }
        }else {
            option.textContent = "-";
        }
        select.append(option);
    });


    if (category === "meat") {
        order.push({
            index: indexNr,
            name: cat[0].name,
            price: cat[0].price,
            grams: cat[0].grams
        })

        check.textContent = ''
        showCheck(order);
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.classList.add('animation')
        div.setAttribute('index',indexNr)
        div.classList.add("burger_image");
        meat_box.append(div);


        div.append(img);
        img.src = cat[0].url;

        const span = document.createElement("span");
        span.textContent = cat[0].name;
        div.append(span);

        images = document.querySelectorAll(".burger_image");
        spans = document.querySelectorAll(".burger_image span");

        resetAnimation();
        add_arrow(images, spans);
    }
};

const add_arrow = (arrArrow, arrSpan) => {
    arrArrow.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add("burger_image_before");
            item.classList.remove("burger_image_after");
        } else {
            item.classList.add("burger_image_after");
            item.classList.remove("burger_image_before");
        }
    });

    arrSpan.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add("left_description");
            item.classList.remove("right_description");
        } else {
            item.classList.add("right_description");
            item.classList.remove("left_description");
        }
    });
};

const changeImage = (data,category,new_name,i,index) => {

    data[category].forEach(item =>{
        const item_name = item.name.trim();
        const changed_name = new_name.trim();
        if(item_name === changed_name){
            files_images[i].src = item.url
            images[i].children[0].classList.add('animation')
            order.forEach(i =>{
                if(i.index == index){
                    i.name = item.name
                    i.price = item.price
                    i.grams = item.grams
                    check.textContent = ''
                    showCheck(order)
                }

            })
        }
        resetAnimation()

    })

}

const createImage = (data,category,new_name,i,indx) => {

    const div = document.createElement('div')
    const img = document.createElement('img')
    const span = document.createElement('span')
    div.classList.add('burger_image')
    div.setAttribute('index',indx)
    div.append(img)
    div.append(span)
    img.classList.add('animation')

    data[category].forEach(item =>{
        if(item.name.trim() === new_name.trim().toLowerCase()){
            img.setAttribute('src',item.url)
            span.textContent = item.name
            order.push({
                index: indx,
                name: item.name,
                price: item.price,
                grams: item.grams
            })
            check.textContent = '';
            showCheck(order)
        }
    })

    switch (category){

        case 'bottom_sauce': bottomSauce_box.append(div);
            images = document.querySelectorAll(".burger_image");
            spans = document.querySelectorAll(".burger_image span");

            add_arrow(images, spans);
            break;
        case 'top_sauce': top_sauce_box.append(div);
            images = document.querySelectorAll(".burger_image");
            spans = document.querySelectorAll(".burger_image span");

            add_arrow(images, spans);
            break;
        case 'cheese': cheese_box.append(div);
            images = document.querySelectorAll(".burger_image");
            spans = document.querySelectorAll(".burger_image span");

            add_arrow(images, spans);
            break;
        case 'toppings': toppings_box.append(div);
            images = document.querySelectorAll(".burger_image");
            spans = document.querySelectorAll(".burger_image span");

            add_arrow(images, spans);
            break;
    }

}


const deleteSign = (parent) => {
    const deleteSelect = document.createElement("div");
    deleteSelect.setAttribute("class", "deleteSelect");
    parent.append(deleteSelect);
    deleteSelect.addEventListener("click", () => {
        images.forEach(item =>{
            if(item.getAttribute('index') === parent.getAttribute('index')){
                item.remove()

                images = document.querySelectorAll('.burger_image')
                spans = document.querySelectorAll('span')
                add_arrow(images,spans)
            }
        })
        parent.remove();
        order.forEach((item,i) =>{
            console.log("Elemente order:",item)
            console.log(item.index)
            console.log(parent.getAttribute('index'))
            if(item.index == parent.getAttribute('index')){
                console.log(order.splice(i, 1));
                check.textContent = '';
                showCheck(order)
                console.log("Changed",order)
            }

        })

    });
};





window.addEventListener('change',(e)=>{

    if(e.target.tagName === 'SELECT'){
        const category = e.target.getAttribute('class')
        const index_value = e.target.value.indexOf('(');
        let span_new = e.target.value.slice(0,index_value);
        const select_index = e.target.parentElement.getAttribute('index');
        let countImageExistance = 0;
        images = document.querySelectorAll('.burger_image');
        spans = document.querySelectorAll('span')
        files_images = document.querySelectorAll('img')


        for (let i = 0; i < images.length; i++) {
            if(images[i].getAttribute('index') === select_index){
                spans[i].textContent = span_new;
                if(span_new === ''){
                    files_images[i].parentElement.remove()

                    images = document.querySelectorAll('.burger_image')
                    spans = document.querySelectorAll('span')
                    add_arrow(images,spans)
                }
            }
        }
        order.forEach((item,i) =>{
            if(item.index === select_index && span_new === ''){
                order.splice(i,1);
                check.textContent = '';
                showCheck(order)
            }
        })
        for (let i = 0; i < files_images.length; i++) {
            if(files_images[i].parentElement.getAttribute('index') === select_index && span_new !== ''){
                span_new = span_new.toLowerCase()
                fetch1(category,2,span_new,i,files_images[i].parentElement.getAttribute('index'))
            }else if(select_index !== files_images[i].parentElement.getAttribute('index')){

                if(countImageExistance === files_images.length-1){
                    fetch1(category,3,span_new,i,select_index)
                }
                countImageExistance++;
            }

        }

    }
})

window.addEventListener("load", () => {
    fetch1("meat");
    fetch1("bottom_sauce");
    fetch1("top_sauce");
    fetch1("cheese");
    fetch1("toppings");
});

const showCheck = (arr) => {
    const span_total_name = document.createElement('div')
    const span_total_price = document.createElement('div')
    const span_total_grams = document.createElement('div')
    span_total_name.classList.add('span_name')
    span_total_price.classList.add('span_price')
    span_total_grams.classList.add('span_grams')
    let total_lei = 0;
    let total_grame = 0;
    arr.forEach(item =>{
        total_lei += item.price;
        total_grame += item.grams;
        const p = document.createElement('p')
        const span_name = document.createElement('div')
        const span_price = document.createElement('div')
        const span_grams = document.createElement('div')
        p.setAttribute('index',item.index)
        span_name.classList.add('span_name')
        span_price.classList.add('span_price')
        span_grams.classList.add('span_grams')

        span_name.textContent = item.name.toUpperCase() + ' : '
        span_price.textContent = item.price + 'LEI'
        span_grams.textContent = '(' + item.grams + 'gr )'
        p.append(span_name,span_price,span_grams)
        check.append(p)

    })
    const total = document.createElement('p')
    total.classList.add('total_text')
    span_total_name.textContent = "TOTAL : ";
    span_total_price.textContent = total_lei + " LEI "
    span_total_grams.textContent = '(' + total_grame + 'gr )'
    total.append(span_total_name,span_total_price,span_total_grams)
    check.append(total)

}

restart.addEventListener('click',()=>{
    window.location.reload()
})

let individual_burger_name = ''
burger_input.addEventListener('input',(e)=>{
    individual_burger_name = e.target.value
})
const submit = document.querySelector('.add_card')
submit.addEventListener('click',()=>{
    const order_check = {};
    const products = [];
    let total_price = 0;
    order.forEach(item =>{

        products.push({
            name: item.name,
            price: item.price,
            grams: item.grams
        })
        total_price += item.price
    })
    order_check.products = products;
    order_check.total = `${total_price} lei`;
    order_check.burgerName = individual_burger_name;


    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order_check),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert("Comanda acceptata!")
            window.location.reload()

        })
        .catch((error) => {
            alert("Problema de retea!!")
            console.error('Error:', error);
        });
})
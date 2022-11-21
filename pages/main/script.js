
let myBody = {
    pageHead: "sdsds",
    pageBody: document.querySelector('body'),
    jsonDataPath: './books.json',
}

let totalPrice = 0;

craeteMyPage(myBody);

function craeteMyPage(pageBody){

    let divCart;
    let cartHeader;
    let main;
    let divGrid;
    let cart;
    let divCard;
    let buttonOrder;


    createPageFrame(pageBody.pageBody);
    fillFrame(myBody.jsonDataPath);
}

function createPageFrame(pageBody){

    const fragment = document.createDocumentFragment();
    const header = document.createElement('HEADER');
    header.innerHTML = "<p>Best Books Shop (BBS-Group Inc)</p>";
    fragment.appendChild(header);
    pageBody.appendChild(fragment);

    main = document.createElement('MAIN');
    header.after(main);

    divGrid = document.createElement('DIV');
    divGrid.classList.add('grid_container');
    main.appendChild(divGrid);

    cart = document.createElement("DIV");
    cart.id = "cart";
    divGrid.after(cart);

    cartHeader= document.createElement("H2");
    cartHeader.id = "cart_header";
    cartHeader.innerHTML = "Your order: "
    cart.appendChild(cartHeader);

    divCart = document.createElement('DIV');
    divCart.classList.add('cart_div');
    cartHeader.after(divCart);

    divCard = document.createElement('DIV');
    divCard.classList.add('cart_div');
    cartHeader.after(divCard);

    buttonOrder = document.createElement("BUTTON");
    buttonOrder.id = "button_order";
    buttonOrder.classList = "button_order";
    buttonOrder.innerText = "Press to confirm";
    buttonOrder.addEventListener('click', confirmOrder);
    divCard.after(buttonOrder);
}

function fillBooks(book){
    const divBooks = document.createElement('DIV');
            divBooks.classList = "book_card";
            divBooks.setAttribute("draggable","true");
            divGrid.appendChild(divBooks);

            const author = document.createElement('H2');
            const heading = document.createElement('H3');
            const picture = document.createElement('IMG');
            const costs = document.createElement('P');
            const description = document.createElement('P');
            const addToCardButton = document.createElement('BUTTON');
            const showDescriptionButton = document.createElement('BUTTON');

            author.classList = "book_author";
            heading.classList = "book_heading";
            picture.classList = "book_picture";
            costs.classList = "book_price";
            description.classList = "book_description";
            addToCardButton.classList ="button_add_to_cart";
            showDescriptionButton.classList = "button_description";

            divBooks.appendChild(author);
            author.after(heading);
            heading.after(picture);
            picture.after(costs);
            costs.after(addToCardButton);
            addToCardButton.before(showDescriptionButton);

            let price = book.price;
            picture.src = book.imageLink;
            author.innerHTML = book.author;
            heading.innerHTML = book.title;
            costs.innerHTML = `Price: $` + book.price;
            showDescriptionButton.innerHTML = "Show More";
            addToCardButton.innerHTML = "Add to Cart";

            addToCardButton.addEventListener("click",addToCart);

            showDescriptionButton.addEventListener("click",showInfo);

            cart.addEventListener("dragover",allowDrop);
            cart.addEventListener("drop",drop);

            function allowDrop(ev) {
                ev.preventDefault();
            }

            function drop(ev) {
                divBooks.addEventListener("dragend",addToCart)
            }

            function addToCart() {
                const cartBook = document.createElement('DIV');
                cartBook.classList = "book_cart";
                const cartPicture = picture.cloneNode(true);
                const cartHeading = heading.cloneNode(true);
                const cartAuthor = author.cloneNode(true);
                const cartCosts = costs.cloneNode(true);

                const deleteButton = document.createElement('BUTTON');
                deleteButton.classList = "button_delete";
                deleteButton.innerHTML = "Delete from cart";
                cartBook.appendChild(deleteButton);
                deleteButton.onclick = () => {
                    cartBook.remove();
                    totalPrice -= price;
                    updateTotalPrice();
                }

                divCart.appendChild(cartBook);
                cartBook.appendChild(cartPicture);
                cartPicture.after(cartAuthor);
                cartAuthor.after(cartHeading);
                cartHeading.after(cartCosts);

                totalPrice += price;
                updateTotalPrice()
            }

            function showInfo(){

                alert(book.description);
            }
}

function confirmOrder(){
    if(confirm("confirm order of " + totalPrice + "$")){
        console.log("clear");
    } else {
    };
}

function fillFrame(jsonDataPath){
    fetch(jsonDataPath)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let books = data;

        let id = 0;

        let totalPrice = 0;
        let total = document.createElement("H4");
        total.id = "total";
        total.innerHTML = `Total Price: $ ${totalPrice}`;

        books.map((book) => {
            fillBooks(book);
        })
    });
}

function updateTotalPrice(){
    cartHeader.innerHTML = "Your order: " + totalPrice;
}

function loadForm(){
    window.location.href = '../form.html';
}



import { Details } from "./details.js";
import { Contact } from "./contact.js";
let details= new Details();
let info = new Contact();
$(document).ready(function () {
$(".group-of-icons").on("click", function () {
    if ($(".side-nav").css("left") == "0px") {
        let navMenuWidth = $('.nav-menu').innerWidth();
        $(".side-nav").animate({ left: `-${navMenuWidth}` }, 500);
        $(".links ul").addClass("animate__animated animate__fadeOutDown");
        $(".open-btn").removeClass("d-none").addClass("d-block");
        $(".close-btn").removeClass("d-block").addClass("d-none");
    } else {
        $(".side-nav").animate({ left: "0px" }, 500);
        $(".links ul").removeClass("animate__animated animate__fadeOutDown").addClass("animate__animated animate__fadeInUp");
        $(".open-btn").addClass("d-none");
        $(".close-btn").removeClass("d-none").addClass("d-block");
    }
});


    async function getApi() {
        $(".loading").removeClass("d-none").addClass("d-flex");
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        let res = await api.json();
        return res.meals;

    }

    async function displayRandomData(meals, id) {
        let cartona = '';
        for (let i = 0; i < meals.length; i++) {
            cartona += `<div class="col-md-3">
                            <div data-id=${meals[i].idMeal} class="meal rounded-2 position-relative">
                                <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                                <div class="meal-layer position-absolute d-flex align-items-center">
                                    <h3 class="text-black">${meals[i].strMeal}</h3>
                                </div>
                            </div>
                        </div>`;
        }
        document.getElementById(id).innerHTML = cartona;
    }
    function handleMealClick() {
        $("#Data").removeClass("d-none");
        $("#searchContainer").addClass("d-none");
        $(".meal").on("click", async function() {
            let identifier = $(this).data("id");
            console.log(identifier);
            $(".loading").removeClass("d-none").addClass("d-flex");
            let res = await details.getDetails(identifier);
            console.log(res);
            details.displayDetails(res.meals, "Data");
            $(".loading").addClass("d-none").removeClass("d-flex");
        });
    }
    
    (async function () {
        $(".loading").removeClass("d-none").addClass("d-flex");
        let meals = await getApi();
        console.log(meals);
        displayRandomData(meals, 'Data');
       
        handleMealClick();
        $(".loading").addClass("d-none").removeClass("d-flex");
    })();
    
    

//  Search

    $("#search").on("click", function () {
        $("#Data").addClass("d-none");
        $("#searchContainer").removeClass("d-none").addClass("d-block");
    })
    async function SearchByName(name) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name} `);
        let res = await api.json();
        return res.meals;
    }
    async function SearchByLetter(term) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
        let res = await api.json();
        return res.meals;
    }
    $("#SearchByName").on("keyup", async function () {
        $(".inner-loading-screen").removeClass("d-none").addClass("d-flex");
        let searchTerm = await SearchByName(this.value);
        displayRandomData(searchTerm, "meals");
        $(".inner-loading-screen").addClass("d-none");
        handleMealClick(); 
    });
    
    $("#SearchByFirstLetter").on("keyup", async function () {
        let input = this.value;
        if (input.length > 1) {
            input = input.charAt(0);
            $(this).val(input);
        }
        $(".inner-loading-screen").removeClass("d-none").addClass("d-flex");
        let firstLetter = await SearchByLetter(input);
        displayRandomData(firstLetter, "meals");
        $(".inner-loading-screen").addClass("d-none");
        handleMealClick(); 
    });
    // Categories
    async function displayCategories(data) {
        let container = '';
        for (let i = 0; i < data.length; i++) {
            container += `<div class="col-md-3">
                            <div class="meal rounded-2 position-relative ">
                                <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                                <div class="meal-layer position-absolute text-center p-2">
                                    <h3 class="text-black">${data[i].strCategory}</h3>
                                    <p class="text-black">${data[i].strCategoryDescription}</p>
                                </div>
                            </div>
                        </div>`;
        }
        document.getElementById("Data").innerHTML = container;
    }
    
    async function categoriesApi() {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let res = await api.json();
        return res.categories;
    }
    
    $("#Categories").on("click", async function () {
        $("#Data").removeClass("d-none");
        $("#searchContainer").addClass("d-none");
    
        $(".loading").removeClass("d-none").addClass("d-flex");
        let data = await categoriesApi();
        displayCategories(data);
        $(".meal").on("click", function() {
            let data = $(this).find("h3").text();
            console.log(data);
            (async function(){
                $("#Data").removeClass("d-none");
                $("#searchContainer").addClass("d-none");
                $(".loading").removeClass("d-none").addClass("d-flex");
                let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`);
                let res = await api.json();
                if(res.meals.length>20){
                    res.meals = res.meals.slice(0, 20);
                }
                $(".loading").removeClass("d-flex").addClass("d-none");
                console.log(res.meals);
                displayRandomData(res.meals, "Data")
                handleMealClick();

            })();
        });
        
        $(".loading").removeClass("d-flex").addClass("d-none");
    });
    

    // AREA
    async function areaApi() {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let res = await api.json();
        return res.meals;
    }
     function displayAreas(data) {
        let container = '';
        for (let i = 0; i < data.length; i++) {
            container += `<div class="col-md-3">
                            <div class="meal rounded-2 text-center ">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3 class="text-white">${data[i].strArea}</h3>
                            </div>
                        </div>`;
        }
        document.getElementById("Data").innerHTML = container;
       
    }
    $("#Area").on("click", async function () {
        $("#Data").removeClass("d-none");
        $("#searchContainer").addClass("d-none");
    
        $(".loading").removeClass("d-none").addClass("d-flex");
        let areas = await areaApi();
        console.log(areas);
        displayAreas(areas);
      
    
        $(".meal").on("click", function() {
            let area = $(this).find("h3").text();
            console.log(area);
            (async function(){
                $("#Data").removeClass("d-none");
                $("#searchContainer").addClass("d-none");
                $(".loading").removeClass("d-none").addClass("d-flex");
                let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
                let res = await api.json();
                if(res.meals.length>20){
                    res.meals = res.meals.slice(0, 20);
                }
                $(".loading").removeClass("d-flex").addClass("d-none");
                console.log(res.meals);
                displayRandomData(res.meals, "Data");
                handleMealClick();

            })();
        });
        
    
        $(".loading").removeClass("d-flex").addClass("d-none");
    });
    

 
    // INGREDIENTS
    async function ingredientsApi() {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let res = await api.json();
        if(res.meals.length>20){
            res.meals = res.meals.slice(0, 20);
        }
        return res.meals;
    }
    function displayIngredients(data) {
        let container = '';
        for (let i = 0; i < data.length; i++) {
            let words = data[i].strDescription.split(' ');
            let truncatedDescription = words.slice(0, 20).join(' ');
            container += `<div class="col-md-3">
                            <div class="meal rounded-2 text-center overflow-hidden">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3 class="text-white">${data[i].strIngredient}</h3>
                            <p>${truncatedDescription}</p>
                            </div>
                        </div>`;
        }
        document.getElementById("Data").innerHTML = container;
    }
    $("#Ingredients").on("click", async function () {
        $("#Data").removeClass("d-none");
        $("#searchContainer").addClass("d-none");
    
        $(".loading").removeClass("d-none").addClass("d-flex");
        let ingredients = await ingredientsApi();
        displayIngredients(ingredients);
        $(".meal").on("click", function() {
            let data = $(this).find("h3").text();
            console.log(data);
            (async function(){
                $("#Data").removeClass("d-none");
                $("#searchContainer").addClass("d-none");
                $(".loading").removeClass("d-none").addClass("d-flex");
                let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`);
                let res = await api.json();
                if(res.meals.length>20){
                    res.meals = res.meals.slice(0, 20);
                }
                $(".loading").removeClass("d-flex").addClass("d-none");
                console.log(res.meals);
                displayRandomData(res.meals, "Data");
                handleMealClick();

            })();
        });
        
        $(".loading").removeClass("d-flex").addClass("d-none");
    });
    
    // contact us
    $("#Contact").on("click", function() {
        $("#Data").removeClass("d-none");
        info.contactInfo();    
        
});


})




export class Details {
    async getDetails(id) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let res = await api.json();
        return res
    }
    displayDetails(data,id) {
        let cartona = ``;
        for (let i = 0; i < data.length; i++) {
            cartona += `<div class="col-md-4">
            <img class="w-100 rounded-3" src="${data[i].strMealThumb }" alt="" >
            <h2>${data[i].strMeal}</h2>
            </div>
            <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${data[i].strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${data[i].strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${data[i].strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure1} ${data[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">3 ${data[i].strMeasure2} ${data[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">3 ${data[i].strMeasure3} ${data[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">2 ${data[i].strMeasure4} ${data[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure5} ${data[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">1 ${data[i].strMeasure6} ${data[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">2${data[i].strMeasure7} ${data[i].strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure8} ${data[i].strIngredient8}</li>
                   
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${data[i].strTags}</li>
                </ul>
                <a target="_blank" href=${data[i].strSource} class="btn btn-success">Source</a>
                <a target="_blank" href=${data[i].strYoutube} class="btn btn-danger">Youtube</a>
            
            </div>`;

        }
        document.getElementById(id).innerHTML = cartona;
    }
}



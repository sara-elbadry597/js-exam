export class Details {
    async getDetails(id) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let res = await api.json();
        return res
    }
     displayDetails(data, id) {
        let cartona = ``;
        for (let i = 0; i < data.length; i++) {
            cartona += `<div class="col-md-4">
                <img class="w-100 rounded-3" src="${data[i].strMealThumb}" alt="">
                <h2>${data[i].strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data[i].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">`;
    
            // Loop through ingredients and measurements
            for (let j = 1; j <= 20; j++) {
                let measure = data[i][`strMeasure${j}`];
                let ingredient = data[i][`strIngredient${j}`];
                if (measure && ingredient) {
                    cartona += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
                }
            }
    
            cartona += `</ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-danger m-2 p-1">${data[i].strTags}</li>
                </ul>
                <a target="_blank" href="${data[i].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;
        }
    
        // Append the generated HTML to the DOM
        $(`#${id}`).html(cartona);
    }
    
}



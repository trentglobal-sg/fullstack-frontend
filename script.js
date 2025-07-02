const BASE_API_URL = "https://vigilant-goldfish-q7rwjv54g6vfxr9r-3000.app.github.dev/api";

document.addEventListener("DOMContentLoaded", async function () {

    getRecipes();

    async function getRecipes() {
        const response = await axios.get(BASE_API_URL + "/recipes");
        const recipes = response.data.recipes;

        const recipeTable = document.querySelector("#recipes");
        console.log(recipeTable);
        recipes.forEach(recipe => {
            const row = document.createElement('tr');

            // const nameColumn = document.createElement('td');
            // nameColumn.innerHTML = recipe.name;
            // row.appendChild(nameColumn)

            // const descColumn = document.createElement('td');
            // descColumn.innerHTML = recipe.description;
            // row.appendChild(descColumn);

            // const cookingTimeColumn = document.createElement('td');
            // cookingTimeColumn.innerHTML = recipe.cooking_time;
            // row.appendChild(cookingTimeColumn);

            row.innerHTML = `
            <td>${recipe.name}</td>
            <td>${recipe.description}</td>
            <td>${recipe.cooking_time}</td>
        `

            recipeTable.appendChild(row);
        })
    }

    async function showCreateForm() {
        const tagResponse = axios.get(BASE_API_URL + '/tags');
        const categoryResponse = axios.get(BASE_API_URL + '/categories');
        const cuisineResponse = axios.get(BASE_API_URL + '/cuisines');

        const tags = (await tagResponse).data;
        const categories = (await categoryResponse).data;

        const cuisines = (await cuisineResponse).data;

        categories.forEach(category => {
            const optionEl = document.createElement('option');
            optionEl.innerHTML = category.name;
            optionEl.value = category.category_id
            document.querySelector("[name=category_id]").appendChild(optionEl);
        });

        const cuisineSelect = document.querySelector("[name=cuisine_id]");
        cuisines.forEach(cuisine => {
            cuisineSelect.innerHTML += `<option value="${cuisine.cuisine_id}">${cuisine.name}</option>`
        });

        const tagSelect = document.querySelector("[name='tags[]']");
        tags.forEach(tag => {
            tagSelect.innerHTML += `<option value="${tag.tag_id}">${tag.name}</option>`
        })

    }
    showCreateForm();

    document.querySelector("#create-recipe")
        .addEventListener("submit", async function (event) {
            event.preventDefault(); // prevent the default behavior of the event, which in this case,
            // will stop the browser from submitting the form

            const newRecipe = {
                name: document.querySelector("[name=name]").value,
                description: document.querySelector("[name=description]").value,
                cooking_time: document.querySelector("[name=cooking_time]").value,
                ingredients: document.querySelector("[name=ingredients]").value,
                steps: document.querySelector("[name=steps]").value,
                category_id: document.querySelector("[name=category_id] option:checked").value,
                cuisine_id: document.querySelector("[name=cuisine_id] option:checked").value,
                tags: Array.from(document.querySelectorAll("[name='tags[]'] option:checked")).map(option => { return option.value})
            }
            const response = await axios.post(BASE_API_URL + "/recipes", newRecipe);
            const formDiv = document.querySelector("#create-recipe");
            formDiv.style.display = "none";
            alert("New recipe added with id =" + response.data.recipeId);


    })

    document.querySelector("#showAddRecipeForm")
            .addEventListener("click", function(){
                const formDiv = document.querySelector("#create-recipe");
                if (formDiv.style.display == "none") {
                       formDiv.style.display="block"
                } else {
                    formDiv.style.display = "none";
                }
             ;
            })
})


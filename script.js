document.addEventListener("DOMContentLoaded", async function () {
    const response = await axios.get("https://vigilant-goldfish-q7rwjv54g6vfxr9r-3000.app.github.dev/api/recipes");
    const recipes = response.data.recipes;

    const recipeTable = document.querySelector("#recipes");
    console.log(recipeTable);
    recipes.forEach(recipe => {
        const row = document.createElement('tr');

        const nameColumn = document.createElement('td');
        nameColumn.innerHTML = recipe.name;
        row.appendChild(nameColumn)

        const descColumn = document.createElement('td');
        descColumn.innerHTML = recipe.description;
        row.appendChild(descColumn);

        const cookingTimeColumn = document.createElement('td');
        cookingTimeColumn.innerHTML = recipe.cooking_time;
        row.appendChild(cookingTimeColumn);

        recipeTable.appendChild(row);

    })
})


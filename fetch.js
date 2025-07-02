
function oldMethod() {
    const recipes = fetch("https://vigilant-goldfish-q7rwjv54g6vfxr9r-3000.app.github.dev/api/recipes");
    recipes.then(function (response) {
        // when the recipes promise finished, then call the function pass to the then function
        // the response parameter is the return value of the promise
        return response.json();
    }).then(function (data) {
        console.log(data);
    })
    // fetch will take a long time to finish
    console.log("recipes = ", recipes);
}

async function fetchData() {
    // await is paired with a promise (await <promise>)
    const response = await fetch("https://vigilant-goldfish-q7rwjv54g6vfxr9r-3000.app.github.dev/api/recipes");
    const data = await response.json();
    console.log(data);
}
fetchData();
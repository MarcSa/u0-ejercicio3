import {
    Recipes,
    Recipe,
} from "./interfaces/recipe.interface";

const getData =
    async (): Promise<Recipes> => {
        const res =
            await fetch(
                "https://dummyjson.com/recipes",
            );
        if (
            !res.ok
        ) {
            throw new Error(
                `HTTP ${res.status}: ${res.statusText}`,
            );
        }
        const data =
            (await res.json()) as Recipes;
        return data;
    };

const getRecipes =
    async (
        rating: number,
    ) => {
        try {
            const data =
                await getData();
            const filteredRecipes: Recipe[] =
                data.recipes.filter(
                    (
                        recipe,
                    ) =>
                        recipe.rating >=
                        rating,
                );
            return filteredRecipes;
        } catch (e) {
            console.error(
                `Error en el GET: ${(e as Error).message}`,
            );
            return [];
        }
    };

const getNames =
    async (): Promise<
        string[]
    > => {
        const desiredRecipes =
            await getRecipes(
                4.6,
            );

        return desiredRecipes.map(
            (
                recipe,
            ) =>
                recipe.name,
        );
    };

const desiredNames =
    async () => {
        const recipeNames =
            await getNames();
        console.log(
            recipeNames,
        );
    };

desiredNames();

import recipeView from "./views/recipeView.js";
import * as model from "./model.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookMarksView from "./views/bookMarksView.js";
import addRecipeView from "./views/addRecipeView.js";

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookMarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(model.state.recipe);
    //render Recipe
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return resultsView.renderError();
    await model.loadSearchResult(query);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (er) {
    console.log(err);
  }
};
const controlPagination = function (goto) {
  resultsView.render(model.getSearchResultsPage(goto));
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  //update recipe state
  model.updateServings(newServings);
  //update recipe view
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookMarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookMarksView.render(model.state.bookmarks);
};
const controlBookMarks = function () {
  bookMarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    addRecipeView.renderSuccess();
    recipeView.render(model.state.recipe);
    bookMarksView.render(model.state.bookmarks);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    setTimeout(() => {
      addRecipeView._toggleWindow();
    }, 800);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError("💣💣" + err);
  }
};
const init = function () {
  bookMarksView.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerRecipe(controlAddRecipe);
};
init();

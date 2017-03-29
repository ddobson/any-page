import range from 'lodash/range';

class ValidationService {
  validateCookbook(data) {
    // Start page must be less than end page
    const start = parseInt(data.cookbook.start_page, 10);
    const end = parseInt(data.cookbook.end_page, 10);

    if (start > end) {
      return false;
    }

    return true;
  }

  validateRecipe(data, availPages) {
    const start = parseInt(data.recipe.start_page, 10);
    const end = parseInt(data.recipe.end_page, 10);
    const isNotValidRange = this.checkIsNotValidRange(start, end, availPages);

    if (start > end) {
      return [false, 'The start page cannot preceed the end page. Try again.'];
    } else if (start < availPages[0]) {
      return [false, 'The recipe start page cannot preceed the cookbook start page. Try again.'];
    } else if (end > availPages[availPages.length - 1]) {
      return [false, 'The recipe end page cannot exceed the cookbook end page.'];
    } else if (isNotValidRange) {
      return [false, 'This recipe\'s pages fall between the range of another recipe. Try again.'];
    }

    return [true, 'Valid Recipe'];
  }

  checkIsNotValidRange(start, end, availPages) {
    const recipeRange = range(start + 1, end);
    const invalidRange = recipeRange.some((e) => availPages.indexOf(e) === -1);
    const startNotAvail = availPages.indexOf(start) === -1;
    const endNotAvail = availPages.indexOf(end) === -1;

    if (startNotAvail && endNotAvail) {
      return true;
    } else if (invalidRange) {
      return true;
    }

    return false;
  }
}

export default ValidationService;

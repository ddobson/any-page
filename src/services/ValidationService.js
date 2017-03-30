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

  validateRecipe(data, availPages, action, cookbook, ogPages) {
    const start = parseInt(data.recipe.start_page, 10);
    const end = parseInt(data.recipe.end_page, 10);
    let isNotValidRange = false;

    switch (action) {
      case 'new':
        isNotValidRange = this.checkIsNotValidRangeNew(start, end, availPages);
        break;
      case 'edit':
        isNotValidRange = this.checkIsNotValidRangeEdit(start, end, availPages, ogPages);
        break;
      default:
        throw new Error(`${action} is not a valid action for validateRecipe().`)
    }

    if (start > end) {
      return [false, 'The start page cannot preceed the end page. Try again.'];
    } else if (start < cookbook.start_page) {
      return [false, 'The recipe start page cannot preceed the cookbook start page. Try again.'];
    } else if (end > cookbook.end_page) {
      return [false, 'The recipe end page cannot exceed the cookbook end page.'];
    } else if (isNotValidRange) {
      return [false, 'This recipe\'s pages fall between the range of another recipe. Try again.'];
    }

    return [true, 'Valid Recipe'];
  }

  // For editing form merge recipeRange back into availPages
  checkIsNotValidRangeNew(start, end, availPages) {
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

  // Push original start & end back in. Not start and end from edit. Bad Logic here.
  checkIsNotValidRangeEdit(start, end, availPages, ogPages) {
    // Get original start and end pages
    const ogStart = parseInt(ogPages.start_page, 10);
    const ogEnd = parseInt(ogPages.end_page, 10);
    // Mage a range from OG pages and push it into availPages
    let ogRange = [];

    if (ogStart === ogEnd) {
      ogRange.push(ogStart)
    } else {
      ogRange = range(ogStart, ogEnd + 1);
    }

    availPages = availPages.concat(ogRange).sort();

    const recipeRange = range(start + 1, end);
    const invalidRange = recipeRange.some((e) => availPages.indexOf(e) === -1);
    const startNotAvail = availPages.indexOf(start) === -1;
    const endNotAvail = availPages.indexOf(end) === -1;

    // if start page === end page this conditional doesn't make sense.
    if (start === end && availPages.indexOf(start) > 0) {
      return false
    } else if (startNotAvail && endNotAvail) {
      return true;
    } else if (invalidRange) {
      return true;
    }

    return false;
  }
}

export default ValidationService;

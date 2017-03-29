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
}

export default ValidationService;

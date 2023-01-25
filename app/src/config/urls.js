const urls = {
  getAllCategories: () => ('http://localhost:3000/categories'),
  getLocation: (search) => (`http://localhost:3000/autocomplete/city/${search}`),
};

export default urls;

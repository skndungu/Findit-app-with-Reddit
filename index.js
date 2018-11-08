const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    //Get search term
    const searchTerm = searchInput.value;
    // console.log(searchTerm);
    const sortBy = document.querySelector('input[name="sortBy"]:checked').value;
    console.log(sortBy);
    
    e.preventDefault();
})
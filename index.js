import reddit from './redditapi'

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


//Form event listener
searchForm.addEventListener('submit', e => {
    //Get search term
    const searchTerm = searchInput.value;
    // console.log(searchTerm);
    const sortBy = document.querySelector('input[name="sortBy"]:checked').value;
    // console.log(sortBy);
    //Get Limit
    const searchLimit = document.getElementById('limit').value;
    console.log(searchLimit);

    if(searchTerm == ''){
        //Show message
        showMessage('please add a search term', 'alert-danger');
    }

    //Clear search
    searchInput.value = '';

    //Search Reddit
      
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        console.log(results);
        let output = '<div class="card-columns>';
        
        //Loop through the posts
        results.forEach(post => {
            const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.vox-cdn.com/thumbor/OyJuiYH-nf6CdodLdrNC687SuvM=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/46682528/reddit_logo_640.0.jpg'

            output += `
            <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                    <hr>
                    <span class = "badge badge-secondary">Subreddit: ${post.subreddit}</span>
                    <span class = "badge badge-dark">score: ${post.score}</span>

                </div>
            </div>
            `
            output += '</div>'

            document.getElementById('results').innerHTML = output;
        })
    })


    e.preventDefault();
});


function showMessage(message, className) {
    // Create div 
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const searchContainer = document.getElementById('search-container');
    //Get search 
    const search = document.getElementById('search');
    //Insert message
    searchContainer.insertBefore(div, search);
    //Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

//Truncate text
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened)
}
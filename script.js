const quoteContainer = document.getElementById ('quote-container');
const quoteText = document.getElementById ('quote');
const quoteAuthor = document.getElementById ('author');
const twitterBtn = document.getElementById ('twitter');
const newQuoteBtn = document.getElementById ('new-quote');
const loader = document.getElementById("loader");

var counter = 0;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//Get quote from API
async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = 'https://safe-escarpment-78460.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        quoteText.innerText = data.quoteText;
       
        if (!data.quoteAuthor) {
            quoteAuthor.innerText = 'Unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        //Reduce font size for long quotes
        if (data.quoteText.lenght > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();

    } catch (error) {
        if (counter <9){
            getQuote();
            counter = counter + 1;
        }
        else{
            alert("Something is wrong with this page. Please refresh your browser.")
        }
        
} 
}
function tweetQuote() {

const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
window.open(twitterUrl, '_blank');
}
//Event listners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuote();
window.addEventListener('DOMContentLoaded', event => {
    //find all the type buttons
    const typeFilterButton = document.querySelectorAll('li')

    //for each button listen for a click on each
    for (let i = 0; i < typeFilterButton.length; i++) {
        const button = typeFilterButton[i];

        button.addEventListener('click', e => {
            //find the all result cards from the search
            const allPotionCards = document.getElementsByClassName('result-card')
            //pull each card from the HTML Collection of all cards
            for (let j = 0; j < allPotionCards.length; j++) {
                const card = allPotionCards[j];
                //reset hidden attribute if a type is clicked after one has already been selected
                card.removeAttribute('hidden');
                //set cards not matching the requested type of be hidden
                if (card.id !== button.id) {
                    card.setAttribute('hidden', 'true');
                }
            }
        })
    }
});

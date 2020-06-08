function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(const state of states){
              ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        });
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option vlaue>Selecione a cidade</option>";
    citySelect.disabled = true;


    fetch(url)
        .then( res => res.json())
        .then( cities => {
           
            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false
        });


}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Itens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li");

const colectedItens = document.querySelector("input[name=itens]");

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem);
}

let selectedItens = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    
    //add or remove w/ the js class
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    

    //check if there's some itens selected
    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    })

    //if it's already selected u must desselected
    if(alreadySelected >= 0){
        const filteredItens = selectedItens.filter( item => {
            const itemIsDiferent = item != itemId; 
            
            return itemIsDiferent;
        })

        selectedItens = filteredItens;
    }
    else{
        selectedItens.push(itemId);
    }

    colectedItens.value = selectedItens;
    //console.log(selectedItens);
}






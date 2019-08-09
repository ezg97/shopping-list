//@Elijah Guerrero.
//Shopping list.

//Create a list that will hold the values of the items on the list 
let listCurrent = $('li').children('span.shopping-item').map(function() {
    return $(this).text();
}).get();
 
function updateList(obj){
    //create list of the elements displayed on screen
    let listView = $('li').children('span.shopping-item').map(function() {
        return $(this).text();
    }).get();

    //sort both list alphabetically
    listCurrent = listCurrent.sort();
    listView = listView.sort();

    //compare lists to find if they match
    if(listCurrent.toString() !== listView.toString()){
        addItem(listCurrent.filter(e => !listView.includes(e)));
        removeItem(obj, listView.filter(e => !listCurrent.includes(e)));
    }
}

function addItem(array){
    //exit if no array was passed. 
    if(array == undefined || array.length == 0){
        return;
    }
    for(let i=0;i<array.length; i++){
        $(".shopping-list").append(
            '<li>'+
            `<span class="shopping-item">${array[i]}</span>`+
            '<div class="shopping-item-controls">'+
            '<button class="shopping-item-toggle">'+
                '<span class="button-label">check</span>'+
            '</button>'+
            '<button class="shopping-item-delete">'+
                '<span class="button-label">delete</span>'+
            '</button>'+'</div>'+'</li>'
        );
    }
}

function removeItem(obj, array){
    if(array === undefined || array.length === 0){
        return;
    }
    //remove the list element
    $(obj).parents('li').remove();
}

$(function() {
    $("#js-shopping-list-form").submit(event => {
        event.preventDefault();
        //get the value entered and store into userInput
        const userInput = $("#shopping-list-entry");
        //verify it doesn't exist in the list already
        if(listCurrent.includes($(userInput).val())){
            alert('Item has already been added to the list')
        }
        else if(($(userInput).val() && !$(userInput).val().trim()) || $(userInput).val()===""){
            alert('Invald entry.');
        }
        else{
            listCurrent.push($(userInput).val());
            updateList(null);        
        }
        userInput.val('');
    });  

    //------------- Remove -------------
    $("ul").on('click','.shopping-item-delete', function(event){
        //find the value of the item that's being deleted and store in "delItem"
        let delItem = $(this).parents('li').children('span.shopping-item').map(function() {
            return $(this).text();
        }).get();

        //delete the item from the list. Convert to string, get index, then delete.
        delete listCurrent[ listCurrent.indexOf(delItem.toString()) ];
       //now that the list has been edited call the updateList function
        updateList(this);
    });

    //----------------- check --------------
    $("ul").on('click','.shopping-item-toggle', function(event){
        $(this).parents('li').children('span.shopping-item').toggleClass('shopping-item__checked');
    });
});
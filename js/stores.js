var searchTimer = null;
var stores = {};
var structuredStoresArray = [];
var selectedState = [];

$(function () {
    structureJson();
    //Toggling active class for sort icons upon click
    $(".sortIcon").click(function () {
        if ($(".sortIcon").hasClass('active')) {
            $(".sortIcon").removeClass('active')
        }
        var buttonClicked = $(this).attr('id');
        if (buttonClicked == "ascSort") {
            sortAsc();
            $("#ascSort").addClass("active");
        } else {
            sortDesc();
            $("#descSort").addClass("active");
        }
    });
});


$('body').on('click', '.button_season', function () {
    // adding active class to determine which state been selected from the Group Buttons (for Multiple Filtering)
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
    }
    // adding a timer to minimize the quries for the API until all the filters been selected (in case of a real project)
    clearTimeout(searchTimer);
    selectedState = []; //Array of All Selected State Buttons
    searchTimer = setTimeout(function () {
        $('label ', '#buttonFilters').each(function (e, v) {
            if ($(this).hasClass('active')) {
                selectedState.push($(this).html());
            }
        });
        showAllStores();
    }, 1000);
})

function structureJson() {
    //Restructuring the JSON to a structured hierarchy
    $.getJSON('stores.json', function (existingJson) {
        existingJson.forEach(function (store) {
            var temp = {};
            structuredStoresArray.push(store);
            Object.keys(store).forEach(function (key) {
                if (key === 'state') {
                    if (stores[store[key]] == null) {
                        stores[store[key]] = [];
                    }
                    stores[store[key]].push(temp);
                    return;
                }
                temp[key] = store[key];
            });
        });
        // looping through the avaliable states and adding the Button Filters
        for (var states in stores) {
            if (stores.hasOwnProperty(states)) {
                var stateButton = '<label class="btn btn-default button_season">' + states + '</label>';
                $('#buttonFilters').append(stateButton);
            }
        }
        // Display All the Existing Sotres which their status is true 
        showAllStores();
    });
}

//Ascending Sorting for the Structured Array 
function sortAsc() {
    structuredStoresArray.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    showAllStores();
}

//Descending Sorting for the Structured Array 
function sortDesc() {
    structuredStoresArray.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    showAllStores();
}

//Displaying the store Cards once page loaded or Upon Filtering
function showAllStores() {
    $('#storeCards').html('');
    $.each(structuredStoresArray, function (index, tmpStore) {
        //display all the stores in the selected States or display all the stores in all the states which their status is true
        if ((selectedState.length <= 0 && tmpStore.status) || (selectedState.indexOf(tmpStore.state) >= 0)) {
            var storeImage = "'" + tmpStore.image + "'";
            var storeCard = '<div class="storeCard ' + tmpStore.state + '"><span class="storeImage" style="background-image:url(' + storeImage + ');"></span><div class="storeInfo"><b>' + tmpStore.name + '</b><span class="storeAddress subText">' + tmpStore.address + '</span><span class="storeOperatingHours"><b>Operating Hours</b><span class="subText">' + tmpStore.operation_hours + '</span></span></div><div class="storeContactInfo"><span class="telephone"><b>Telephone</b><span class="subText">' + tmpStore.phone + '</span></span></div><button type="button" class="getDirectionButton">Get Directions</button></div>';
            $('#storeCards').append(storeCard);
        }
    });
}

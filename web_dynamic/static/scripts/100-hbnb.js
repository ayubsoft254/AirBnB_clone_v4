const ready = () => {
  // When document is ready run these functions
  checkboxList();
  checkboxLocations();
  statusOK();
  displayPlaces();
  searchButtonClicked();
};

const displayPlaces = (postData = {}) => {
  // Requesting an api, which retrieves a list of places
  // Create a listing for each place
  let placesSearchUrl = 'http://0.0.0.0:5001/api/v1/places_search';
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: placesSearchUrl,
    data: JSON.stringify(postData),
    error: (e) => { console.log(e); },
    dataType: 'json',
    success: function (data, textStatus, jQxhr) {
      let placesList = jQxhr.responseJSON;
      $('section.places').html('');
      for (let place of placesList) {
        $('section.places').append(
          `<article>
          <div class='title'>
          <h2>${place.name}</h2>
          <div class='price_by_night'>
          $${place.price_by_night}
          </div>
          </div>
          <div class='information'>
          <div class = 'max_guest'>
          <i class='fa fa-users fa-3x' aria-hidden='true'></i>
          <br />
          ${place.max_guest} Guests 
          </div> 
          <div class='number_rooms'> 
          <i class='fa fa-bed fa-3x' aria-hidden='true'></i> 
          <br /> 
          ${place.number_rooms} Bedrooms 
          </div>
          <div class='number_bathrooms'>
          <i class='fa fa-bath fa-3x' aria-hidden='true'></i>
          <br />
          ${place.number_bathrooms} Bathroom
          </div>
          </div>
          <div class='description'>
          ${place.description}
          </div> 
          </article>`);
      }
    }
  });
};

const statusOK = () => {
  // if status is "OK", adds class 'available', otherwise remove that class
  let url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
};

const checkboxList = () => {
  // When the checkbox is changed, creates a new list of all the checked boxes
  // and displays it
  $('.amenities .popover input:checkbox').change(function () {
    let amenitiesList = [];
    let amenitiesH4 = $('div.amenities h4');
    amenitiesH4.html('&nbsp;');
    $.each($('.amenities .popover input:checked'), function () {
      amenitiesList.push($(this).attr('data-name'));
    });
    amenitiesH4.html(amenitiesList.join(', '));
  });
};

const checkboxLocations = () => {
// checkbox next to every state/city, when checked they show up in States filter box
  $('.locations .popover input:checkbox').change(function () {
    let locationsList = [];
    let locationsH4 = $('div.locations h4');
    locationsH4.html('&nbsp;');
    $.each($('.locations .popover h2 input:checked'), function () {
      locationsList.push($(this).attr('data-name'));
    });
    locationsH4.html(locationsList.join(', '));
  });
};

const removeCities = () => {
  // If a State is unchecked remove all cities associated with it
  console.log($('.locations .popover ul').attr('data-state'));
};

const searchButtonClicked = () => {
  // When the search Button is clicked, it takes all the checked amenities and
  // displays places with only those amenities.
  //removeCities();

  $('section.filters button').click(function () {
    let amenitiesList = [];
    let citiesList = [];
    let statesList = [];
    $.each($('.amenities .popover input:checked'), function () {
      amenitiesList.push($(this).attr('data-id'));
    });
    $.each($('.locations .popover h2 input:checked'), function () {
      $.each($('.locations .popover ul li input:checked'), function () {
        citiesList.push($(this).attr('data-id'));
        statesList.push($(this).attr('state_id'));
      });
      statesList.push($(this).attr('data-id'));
    });
    displayPlaces({ 'amenities': amenitiesList, 'states': statesList, 'cities': citiesList });
  });
  // The way the api works - We send a list of id's under 'amenities',
  // the api grabs all the amenities in the storage and creates a set out of
  // all the amenities we request.
  // Then the api creates a list of places_amenities which then returns the set
  // of places with the amenities that match the amenities we checked
};

// Function called when the document is ready
document.addEventListener('DOMContentLoaded', ready);

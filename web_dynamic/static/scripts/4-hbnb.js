const ready = () => {
  // When document is ready run these functions
  checkboxList();
  statusOK();
  displayPlaces();
  searchButtonClicked();
};

const displayPlaces = (postData = {}) => {
  // Requesting an api, which retrieves a list of places
  // Creating a listing for each place
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
  $('input:checkbox').change(function () {
    let amenitiesList = [];
    let amenitiesH4 = $('div.amenities h4');
    amenitiesH4.html('&nbsp;');
    $.each($('input:checked'), function () {
      amenitiesList.push($(this).attr('data-name'));
    });
    amenitiesH4.html(amenitiesList.join(', '));
  });
};

const searchButtonClicked = () => {
  // When the search Button is clicked, it takes all the checked amenities and
  // displays places with only those amenities.
  $('section.filters button').click(function () {
    let amenitiesList = [];
    $.each($('input:checked'), function () {
      amenitiesList.push($(this).attr('data-id'));
    });
    displayPlaces({ 'amenities': amenitiesList });
  });
  // The way the api works - We send a list of id's under 'amenities',
  // the api grabs all the amenities in the storage and creates a set out of
  // all the amenities we request.
  // Then the api creates a list of places_amenities which then returns the set
  // of places with the amenities that match the amenities we checked
};

// Function called when the document is ready
document.addEventListener('DOMContentLoaded', ready);

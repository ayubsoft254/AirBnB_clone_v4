// Function called when tthe  the document is ready
const ready = () => {
  // When the checkbox is changed, creates a new list of all the checked boxes
  // and displays it
  $('input:checkbox').change(function () {
    let amenitiesList = [];
    let amenitiesH4 = $('div.amenities h4');
    amenitiesH4.html('');
    $.each($('input:checked'), function () {
      amenitiesList.push($(this).attr('data-name'));
    });
    amenitiesH4.html(amenitiesList.join(', '));
  });
};
document.addEventListener('DOMContentLoaded', ready);

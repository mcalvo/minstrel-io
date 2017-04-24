var segListData = [];

// DOM Ready ============
$(document).ready(function(){
    populateSegmentTable();
    $('#segList table tbody').on('click', 'td a.linkshowsegment', showSegment);
    $('#btnAddSegment').on('click', addSegment);
});

// Functions ============

// Ajax calls for our Psycho name segment list
function populateSegmentTable(){
    var tableContent = '';

    // jQuery AJAX call for json
    $.getJSON('/psychos/segments', function(data){
        segListData = data;
        // Add row for each item in data
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.text + '</td>'; // Segment
            tableContent += '<td>' + this.segmentType + '</td>'; // Type
            tableContent += '<td><a href="#" class="linkshowsegment" rel="' + this._id + '">Show</a></td>'; // Edit
            tableContent += '<td><a href="#" class="linkdeletesegment" rel="' + this._id + '">Delete</a></td>'; // Delete
            tableContent += '</tr>';
        });

        //Inject into HTML table
        $('#segList table tbody').html(tableContent);
    });
};

// Display Segments
function showSegment(event) {
    event.preventDefault();
    var thisSegmentText = $(this).attr('rel');
    var arrayPosition = segListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisSegmentText);

    // Get Segment
    var thisSegmentObject = segListData[arrayPosition];

    // Populate Segment Info
    $('#segmentSegmentType').text(thisSegmentObject.segmentType);
    $('#segmentText').text(thisSegmentObject.text);
}

// Add Segment through Ajax
function addSegment(event) {
    event.preventDefault();

    alert($('#segAdd fieldset input#inputSegmentType').text());
    alert($('#segAdd fieldset input#inputSegmentText').val());

    //If no errors, compile into object

}






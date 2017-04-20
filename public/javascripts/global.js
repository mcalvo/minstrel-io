var segListData = [];

// DOM Ready ============
$(document).ready(function(){
    populateSegmentTable();
    $('#segList table tbody').on('click', 'td a.linkshowsegment', showSegment);
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
    var arrayPosition = segListData.map(function(arrayItem) { return arrayItem.text; }).indexOf(thisSegmentText);

    var thisSegmentObject = segListData[arrayPosition];
    $('#segmentSegmentType').text(thisSegmentObject.segmentType);
    $('#segmentText').text(thisSegmentObject.text);
}

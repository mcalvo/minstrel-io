var segListData = [];
var segTypesData = [];

// DOM Ready ============
$(document).ready(function(){
    /*
    populateSegmentTable();
    $('#segList table tbody').on('click', 'td a.linkshowsegment', showSegment);
    */
    populatePagination();
    $('#segPage div table tbody').on('click', 'td a.linkshowsegment', showSegment);

    populateSegmentDropdown();
    $('#btnAddSegment').on('click', addSegment);

});

// Functions ============

// Ajax calls for our Psycho name segment list
function populateSegmentTable(){
    var tableContent = '';

    // jQuery AJAX call for json
    $.getJSON('/psychos/segments', function(data){
        segListData = data.data;
        // Add row for each item in data
        $.each(data.data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.text + '</td>'; // Segment
            tableContent += '<td>' + this.segmentType + '</td>'; // Type
            tableContent += '<td><a href="#" class="linkshowsegment" rel="' + this._id + '">Show</a></td>'; // Edit
            tableContent += '<td><a href="#" class="linkdeletesegment" rel="' + this._id + '">Delete</a></td>'; // Delete
            tableContent += '</tr>';
        });
        //Inject into HTML table
        $('#segList table tbody').html(tableContent);
    }).done(function(){
        $('#segList table').DataTable();
    });
};

function populatePagination(){
    $('#segPage table').dataTable({
        'destroy': true,
        'ajax': {
            'url': '/psychos/segments',
            'type': 'GET'
        },
        'columns' : [
            {'data': 'text'},
            {'data': 'segmentType'},
            {
                'data': '_id',
                'render': function(data, type, full, meta) {
                    return '<a href="#" class="linkshowsegment" rel="' + data + '">Show</a>'
                }
            },
            {
                'data': '_id',
                'render': function(data, type, full, meta) {
                    return '<a href="#" class="linkdeletesegment" rel="' + data + '">Delete</a>'
                }
            }
        ]
    });
}

// Ajax calls for our segment dropdown
function populateSegmentDropdown(){
    var listContent = '';

    // jQuery AJAX call for json
    $.getJSON('/psychos/segmentTypes', function(data){
        segTypesData = data;
        // Add row for each item in data
        $.each(data, function(){
            listContent += '<option value="' + this + '">' + this + '</option>'; // Segment
        });

        //Inject into HTML table
        $('#segAdd fieldset select#inputSegmentType').html(listContent);
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

    // Need some validation
    //If no errors, compile into object
    var newSeg = {
        'segmentType': $('#segAdd fieldset select#inputSegmentType').val(),
        'text': $('#segAdd fieldset input#inputSegmentText').val()
    }

    $.ajax({
        type: 'POST',
        data: newSeg,
        url: '/psychos/addsegment',
        dataType: 'JSON'
    }).done(function(response) {
        if (response.msg === ''){
            // Empty text field
            $('#segAdd fieldset input').val('');

            // Reset dropdown
            populateSegmentDropdown();

            // Update table
            //populateSegmentTable();

            populatePagination();
        } else {
            alert('Error: ' + response.msg);
        }
    });
}


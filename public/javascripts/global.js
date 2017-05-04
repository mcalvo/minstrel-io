var segListData = [];
var segTypesData = [];

// DOM Ready ============
$(document).ready(function(){
    populatePagination();
    $('#segPage div table tbody').on('click', 'td a.linkshowsegment', showSegment);
    $('#segPage div table tbody').on('click', 'td a.linkdeletesegment', deleteSegment);

    populateSegmentDropdown();
    $('#btnAddSegment').on('click', addSegment);

    $('#btnNameGen').on('click', generateName);

});

// Functions ============

// Ajax calls for our Psycho name segment list
function populatePagination(){
    $('#segPage table').dataTable({
        'initComplete': function(settings, json){
            // Populate global variable for everyone's sakes
            segListData = json.data;
            // Build type filter
            this.api().columns('.select-filter').every(function(){
                var column = this;
                var select = $('<select><option value="">Types</option></select>')
                    .appendTo($(column.header()).empty())
                    .on('change', function(){
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^'+val+'$' : '' , true, false)
                            .draw();
                    });
                column.data().unique().sort().each(function(d, j){
                    select.append('<option value="'+d+'">'+d+'</option>');
                });
            });
        },
        'destroy': true,
        'ajax': {
            'url': '/psychos/segments',
            'type': 'GET'
        },
        'columns' : [
            {'data': 'text'},
            {
                'data': 'segmentType.text',
                'className': 'select-filter'
            },
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
        segTypesData = data.data;
        // Add row for each item in data
        $.each(data.data, function(){
            listContent += '<option value="' + this._id + '">' + this.text + '</option>'; // Segment
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
    $('#segmentText').text(thisSegmentObject.text);
    $('#segmentTypeText').text(thisSegmentObject.segmentType.text);
    $('#segmentTypePriority').text(thisSegmentObject.segmentType.priority);
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

            // Rebuild table
            populatePagination();
        } else {
            alert('Error: ' + response.msg);
        }
    });
}

// Delete Segment through Ajax
function deleteSegment(event) {
    event.preventDefault();

    // Need some validation
    // Confirmation dialog
    var confirmation = confirm('Are you sure you want to delete?');

    if( confirmation === true){
        $.ajax({
            type: 'DELETE',
            url: '/psychos/deletesegment/'+ $(this).attr('rel'),
        }).done(function(response) {
            if (response.msg === ''){
            } else {
                alert('Error: ' + response.msg);
            }
            // Reset dropdown
            populateSegmentDropdown();

            // Rebuild table
            populatePagination();
        });
    } else {
        return false;
    }
}

function generateName(event){
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/psychos/name',
        dataType: 'JSON'
    }).done(function(response){
        var nameOutput = ''
        $.each(response, function() {
            nameOutput += this.text + ' ';
        });
        //Inject into HTML table
        $('#nameGen p #nameResult').html(nameOutput);

    });


}

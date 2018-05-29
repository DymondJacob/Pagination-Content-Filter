// using strict code
"use strict";

//creating the code for Globals
var studentItems = $('.student-item');
var studentSearch ='<div class="student-search"><input id="search" placeholder="Student Search..."><button>Search</button></div>';
var pagination ='<div class="pagination"><ul></ul></div>';
var studentList = pages(studentItems)

//creating the code for append
$('.page-header.cf').append(studentSearch);

//creating the array code for each page, limiting each page to the max of 10 students
function pages(list) {
	var oldList = list.slice();
	var pagesArray = [];
	while (oldList.length) {
		pagesArray.push(oldList.splice(0,10));
	}
	return pagesArray;
}
// this code is going to display the first page of 10 students, and hide the rest of pages for students
function showPages(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
}
// this code is going to append the buttons we created to the pages
function appendButtons(pageList) {
	$('.page').append(pagination);
	var numPages = pageList.length;
	for (var i = 1; i <= numPages; i++) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');

  // creating the click listeners for pagination
  $(".pagination ul li a").on("click", function(e) {
    var pageSelection = parseInt($(this)[0].text) - 1;
    showPages(pageSelection, pageList);
    $(".pagination ul li a").removeClass();
    $(this).addClass("active");
    e.preventDefault();
  });
}

// this function will be for the search, and it will find both the name and email
function searchList() {
    var searchTerm = $('#search').val().toLowerCase().trim();

        var filteredStudents = studentItems.filter(function(i) {
        	var studentEmail = $(this).find('.email').text();
            var studentNames = $(this).find('h3').text();
            if (studentNames.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
                return true;
            }
            return false;
        });
        if (filteredStudents.length === 0 ) {
        	$('.page-header h2').text('No Results');
        } else {
        	$('.page-header h2').text('STUDENTS');
        }
        var paginated_students = pages(filteredStudents);
        $('.pagination').remove();
        if (filteredStudents.length >= 10) {
          appendButtons(paginated_students);
        }
        showPages(0, paginated_students);
}

appendButtons(studentList);
showPages(0, studentList);

// Lastly, the event Handlers
$('.student-search').find('button').on('click', searchList);
$('.student-search').find('input').keyup(searchList);

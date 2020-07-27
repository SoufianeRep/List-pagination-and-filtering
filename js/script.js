const studentUl = document.querySelector(".student-list");
const studentList = studentUl.children;
const page = document.querySelector(".page");
//sets the number of items we wish to display per page
const itemsPerPage = 10;
const headerDiv = document.querySelector(".page-header");
const namesDiv = document.querySelectorAll(".student-details");

//following code creats input field and a search button nests them into a div element and appends the div to the header of the page
const studentSearchDiv = document.createElement("DIV");
studentSearchDiv.className = "student-search";
const searchInput = document.createElement("INPUT");
searchInput.type = "text";
searchInput.id = "search-input";
searchInput.placeholder = "Search for students...";
const searchBtn = document.createElement("BUTTON");
searchBtn.textContent = "Search";
headerDiv.appendChild(studentSearchDiv);
studentSearchDiv.appendChild(searchInput);
studentSearchDiv.appendChild(searchBtn);

//function to delete the pagination links to be used every time a search is started or event is fired
const deletePaginationLinks = () => {
  let paginationLinks = document.querySelector(".pagination");
  if (paginationLinks) {
    paginationLinks.remove();
  }
};

// creates no result message
const noResult = document.createElement("P");
noResult.textContent = "No Results ...";
noResult.style.display = "none";
page.appendChild(noResult);

//search function takes two parameters searchinput and the array in which to apply the search
const nameSearch = (searchInput, list) => {
  //creats list to hold the items that meet the search criteria
  let searchList = [];
  //loops through list, then targets the second element(h3) of each individual student's div to extract the name of the student.
  for (let i = 0; i < list.length; i++) {
    let namesDiv = list[i].firstElementChild;
    let name = namesDiv.children[1];
    //compares the search input to the name of the student in the loop (or part of the name) the either diplays the student or hides
    if (
      searchInput.value.length !== 0 &&
      name.textContent.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      list[i].style.display = "block";
      searchList.push(list[i]);
    } else {
      list[i].style.display = "none";
    }
  }
  //handles the no result message in case there are no matches
  if (searchList.length === 0) {
    noResult.style.display = "";
  } else {
    noResult.style.display = "none";
  }
  //shows the first 10 items as the first result page
  showPage(searchList, 1);
  //generates pagination buttons to the new list that meets the search criteria (check the function)
  appendPageLinks(searchList);
};

searchBtn.addEventListener("click", (e) => {
  deletePaginationLinks();
  nameSearch(searchInput, studentList);
});

searchInput.addEventListener("keyup", (e) => {
  deletePaginationLinks();
  nameSearch(searchInput, studentList);
});

// showPage Function; loops through all the items in the list
//then shows all the items between the first and last item of the parameter list(per index) and displays them
//according to the page number() and how many items we chose to display per page (global variable itemsPerPage)
const showPage = (list, pageNumber) => {
  let startIndex = pageNumber * itemsPerPage - itemsPerPage;
  let endIndex = pageNumber * itemsPerPage;
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
  }
};

// appendPageLinks function; creats pagination links according to the number of items in the list and gives them functionality
const appendPageLinks = (list) => {
  //crates a div element that hold the future UL of the pagination links(buttons)
  let paginationDiv = document.createElement("DIV");
  paginationDiv.className = "pagination";
  let paginationUl = document.createElement("UL");
  //sets the number of pages / buttons according to the number of elements in the list
  let numberOfPages = Math.ceil(list.length / itemsPerPage);
  //dynamically creats the pagination links and appends them accordingly starting from number 1 (why i = 1 in the loop, see line 89)
  for (let i = 1; i <= numberOfPages; i++) {
    let paginationLi = document.createElement("LI");
    let pageButtons = document.createElement("A");
    pageButtons.textContent = i;
    pageButtons.href = "#";

    paginationLi.appendChild(pageButtons);
    paginationUl.appendChild(paginationLi);
    paginationDiv.appendChild(paginationUl);
    page.appendChild(paginationDiv);

    if (pageButtons.textContent == 1) {
      pageButtons.className = "active";
    }
  }
  // dynamically adds functionality to each pagination link through an event
  // each time a link is clicked sets its class name to active and displays the number of items affected to it
  // using the showPage function rules (check above)
  let links = paginationDiv.querySelectorAll("a");
  for (let i = 0; i < numberOfPages; i++) {
    let pageButtons = links[i];
    pageButtons.addEventListener("click", (e) => {
      for (let i = 0; i < numberOfPages; i++) {
        links[i].className = "";
      }
      e.target.className = "active";
      showPage(list, pageButtons.textContent);
    });
  }
};

// calls the functions and starts the page with the first page items
showPage(studentList, 1);
appendPageLinks(studentList);

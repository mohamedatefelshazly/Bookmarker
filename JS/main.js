var bookmarks = [
  {
    websitename: "Google",
    siteurl: "https://www.google.com.eg/",
  },
  {
    websitename: "Youtube",
    siteurl: "https://www.youtube.com/",
  },
];
var valid = false;

if (localStorage.getItem("bookmark") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmark"));
}
displayBookmarks();
function saveBookmark() {
  if (
    valid &&
    document.getElementById("websiteID").value != "" &&
    document.getElementById("urlID").value != ""
  ) {
    var bookmark = {
      websitename: document.getElementById("websiteID").value,
      siteurl: document.getElementById("urlID").value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    displayBookmarks();
    clearinput();
  } else {
    Swal.fire({
      title: `
      <div class="d-flex d-inline ms-0 border-0">
        <i class="fa fa-circle text-danger"></i>
        <i class="fa fa-circle mx-2 text-warning"></i>
        <i class="fa fa-circle text-success"></i>
        <i class="fa fa-x text-body ms-auto btn" onclick="close1()" ></i>
      </div>
    <div class="text-black fs-6 border-0">
      <p class="fw-bold text-start">
        Site Name or Url is not valid, Please follow the rules below :</p>
      <p class="text-start fw-light w-100"><i class="fa fa-circle-arrow-right text-danger"></i> Site name must contain at least 3 characters</p>
      <p class="text-start fw-light w-100"><i class="fa fa-circle-arrow-right text-danger"></i> Site URL must be a valid one</p>
    </div>
      `,
      width: 500,
      padding: "0.5em",
      color: "rgb(0,0,0)",
      background: "#fff",
      backdrop: `
        rgba(0,0,0,0.5)
      `,
    });
  }
  valid = false;
}

function displayBookmarks() {
  var bag = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    bag += `<tr class="border-top">
                <td>${i + 1}</td>
                <td>${bookmarks[i].websitename}</td>
                <td><a href="${bookmarks[i].siteurl}" target="_blank"
      ><button type="button" class="btn text-white bg-success">
        <i class="fa-solid fa-eye"></i> Visit
      </button></a
    ></td>
                <td><button onclick="deletebookmark(${i})" class="btn text-white bg-danger">
      <i class="fa-solid fa-trash"></i> Delete
    </button></td>
              </tr>`;
  }
  document.getElementById("bookmarkListId").innerHTML = bag;
}
function clearinput() {
  document.getElementById("websiteID").value = "";
  document.getElementById("urlID").value = "";
}
function deletebookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  displayBookmarks();
}
var validateArry = {
  websiteID: /\w{3,}/,
  urlID:
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,
};
function allValidate(element, elementId) {
  if (validateArry[elementId].test(element.value) == true) {
    document.getElementById(elementId).classList.remove("is-invalid");
    document.getElementById(elementId).classList.add("is-valid");
    valid = true;
  } else {
    document.getElementById(elementId).classList.remove("is-valid");
    document.getElementById(elementId).classList.add("is-invalid");
    valid = false;
  }
}

// import Swal from 'sweetalert2'
function close1() {
  clearinput();
  alert("click OK buttons");
}

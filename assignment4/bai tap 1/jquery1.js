
let userIndex = 0;

function saveUserInfo() {
  const userName = $('#nameInput').val().trim();
  const userAddress = $('#addressInput').val().trim();

  if (userName === "" || userAddress === "") {
    alert("Vui lòng nhập đầy đủ tên và địa chỉ.");
    return;
  }

  const userInfoJSON = JSON.stringify({ name: userName, address: userAddress });
  addToTable(userName, userAddress, userInfoJSON);


  $('#nameInput, #addressInput').val('');
}


function addToTable(userName, userAddress, userInfoJSON) {
  userIndex++;


  const newRow = `<tr>
    <td>${userIndex}</td>
    <td>${userName}</td>
    <td>${userAddress}</td>
    <td>${userInfoJSON}</td>
    <td><input type="checkbox" class="deleteCheckbox"></td>
  </tr>`;

  $('#userTable tbody').append(newRow);
}

function deleteUser() {
  const $checkedBoxes = $('.deleteCheckbox:checked');

  if ($checkedBoxes.length > 0) {

    $checkedBoxes.closest('tr').remove();
  } else {
    const deleteIndex = parseInt($('#deleteIndex').val().trim(), 10);
    const totalRows = $('#userTable tbody tr').length;

    if (isNaN(deleteIndex) || deleteIndex <= 0 || deleteIndex > totalRows) {
      alert("Vui lòng nhập chỉ số hợp lệ.");
      return;
    }

    $('#userTable tbody tr').eq(deleteIndex - 1).remove();
  }

  updateRowIndexes();
  toggleDeleteInput();
  $('#deleteIndex').val(''); 
}


function updateRowIndexes() {
  const $rows = $('#userTable tbody tr');
  userIndex = $rows.length; 

  $rows.each(function(index) {
    $(this).find('td:first').text(index + 1);
  });
}


function toggleDeleteInput() {
 
  $('#deleteIndex').prop('disabled', $('.deleteCheckbox:checked').length > 0);
}


$(document).ready(function() {
  $('#saveButton').on('click', saveUserInfo);
  $('#deleteButton').on('click', deleteUser);
  
  $('#userTable').on('change', '.deleteCheckbox', toggleDeleteInput);

  $('#userForm').on('keydown', function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      saveUserInfo(); 
    }
  });
});
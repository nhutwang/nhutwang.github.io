function formatDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function calculateAverage() {
  let sum = 0;
  let count = 0;

  for (let i = 1; i <= 11; i++) {
    const $selected = $(`input[name="criteria${i}"]:checked`);
    
    if ($selected.length > 0) {
      sum += Number($selected.val());
      count++;
    }
  }

  if (count < 11) {
    $('#average-score').text("Chưa hoàn thành đánh giá");
    return null;
  }

  const avg = (sum / 11).toFixed(2);
  $('#average-score').text(avg);
  return avg;
}

$(document).ready(function() {
  $('#submitTime').text(formatDateTime());

  $('input[type="radio"]').on('change', calculateAverage);

  $('#submitBtn').on('click', function () {
    const currentTime = formatDateTime();
    $('#submitTime').text(currentTime);

    const avg = calculateAverage();
    const criteria = {};

    for (let i = 1; i <= 11; i++) {
      const $selected = $(`input[name="criteria${i}"]:checked`);
      criteria[`Tiêu chí ${i}`] = $selected.length > 0 ? $selected.val() : "";
    }

    const data = {
      courseName: $('#courseName').val().trim(),
      teacherName: $('#teacherName').val().trim(),
      studentName: $('#studentName').val().trim(),
      submitTime: currentTime,
      criteria: criteria,
      averageScore: avg !== null ? avg : "Chưa hoàn thành đánh giá"
    };

    $('#jsonOutput').text(JSON.stringify(data, null, 2));
  });
});
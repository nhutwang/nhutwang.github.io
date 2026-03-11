const submitTimeEl = document.getElementById("submitTime");
const averageScoreEl = document.getElementById("average-score");
const submitBtn = document.getElementById("submitBtn");
const jsonOutputEl = document.getElementById("jsonOutput");

const courseInput = document.getElementById("courseName");
const teacherInput = document.getElementById("teacherName");
const studentInput = document.getElementById("studentName");

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

submitTimeEl.textContent = formatDateTime();

function calculateAverage() {
  let sum = 0;
  let count = 0;

  for (let i = 1; i <= 11; i++) {
    const selected = document.querySelector(`input[name="criteria${i}"]:checked`);
    if (selected) {
      sum += Number(selected.value);
      count++;
    }
  }

  if (count < 11) {
    averageScoreEl.textContent = "Chưa hoàn thành đánh giá";
    return null;
  }

  const avg = (sum / 11).toFixed(2);
  averageScoreEl.textContent = avg;
  return avg;
}

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", calculateAverage);
});

submitBtn.addEventListener("click", function () {
  const currentTime = formatDateTime();
  submitTimeEl.textContent = currentTime;

  const avg = calculateAverage();

  const criteria = {};
  for (let i = 1; i <= 11; i++) {
    const selected = document.querySelector(`input[name="criteria${i}"]:checked`);
    criteria[`Tiêu chí ${i}`] = selected ? selected.value : "";
  }

  const data = {
    courseName: courseInput.value.trim(),
    teacherName: teacherInput.value.trim(),
    studentName: studentInput.value.trim(),
    submitTime: currentTime,
    criteria: criteria,
    averageScore: avg !== null ? avg : "Chưa hoàn thành đánh giá"
  };

  jsonOutputEl.textContent = JSON.stringify(data, null, 2);
});
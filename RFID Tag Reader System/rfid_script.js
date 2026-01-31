const tagHistory = {};
const historyTable = document.getElementById("tagHistoryBody");

function scanTag() {
  const input = document.getElementById("tagInput");
  const tagId = input.value.trim();
  const restriction = document.getElementById("restriction").value;

  if (!tagId) {
    alert("Please enter a valid RFID Tag ID.");
    return;
  }

  const now = new Date();

  if (tagHistory[tagId]) {
    const lastRead = new Date(tagHistory[tagId].lastRead);
    const diffSec = (now - lastRead) / 1000;

    if (restriction !== "none" && diffSec < parseInt(restriction)) {
      alert(`Please wait ${Math.ceil(parseInt(restriction) - diffSec)} more seconds to rescan.`);
      return;
    }

    tagHistory[tagId].count += 1;
    tagHistory[tagId].lastRead = now.toLocaleString();
  } else {
    tagHistory[tagId] = {
      count: 1,
      firstRead: now.toLocaleString(),
      lastRead: now.toLocaleString()
    };
  }

  input.value = "";
  updateTable();
}

function updateTable() {
  historyTable.innerHTML = "";

  for (const tagId in tagHistory) {
    const data = tagHistory[tagId];

   const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tagId}</td>
     <td><span class="badge rounded-pill bg-primary">${data.count}</span></td>
    <td>${data.firstRead}</td>
      <td>${data.lastRead}</td>
    `;
    historyTable.appendChild(row);
  }
}

const SHEET_ID = '1rR0O90hpWbM5qcM2Y8G30tg3CsX8PMygWh8sx1f4Ido';
let allData = [];
fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substring(47, data.length - 2));
        allData = json.table.rows;

        displayData(allData);
    })
    .catch(error => console.error(error));
function displayData(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = 'Không có dữ liệu';
        td.colSpan = 2;
        td.style.textAlign = 'center';
        tr.appendChild(td);
        tableBody.appendChild(tr);
    } else {
        data.forEach(row => {
            const tr = document.createElement('tr');
            row.c.forEach((cell, index) => {
                const td = document.createElement('td');
                const cellValue = cell?.v || '';
                const searchTerm = searchInput.value.toLowerCase();
                if (searchTerm && cellValue.toLowerCase().includes(searchTerm)) {
                    td.innerHTML = cellValue.replace(new RegExp(`(${searchTerm})`, 'gi'), '<span class="highlight">$1</span>');
                } else {
                    td.textContent = cellValue;
                }
                const copyBtn = document.createElement('button');
                copyBtn.classList.add('copy-btn');
                copyBtn.textContent = 'Copy';
                copyBtn.onclick = () => copyToClipboard(cellValue);
                td.appendChild(copyBtn);
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }
}
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = allData.filter(row => {
        return row.c.some(cell => {
            return (cell?.v || '').toLowerCase().includes(searchTerm);
        });
    });
    displayData(filteredData);
});
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showCopyNotification();
}
function showCopyNotification() {
    const notification = document.getElementById('copy-notification');
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}
let scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}
scrollToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
const selectMessage = document.getElementById('select-message');

function populateSelectMessage() {
    selectMessage.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'Tất cả';
    selectMessage.add(allOption);

    allData.forEach(row => {
        const option = document.createElement('option');
        option.value = row.c[0].v;
        option.textContent = row.c[0].v;
        selectMessage.add(option);
    });
}
selectMessage.addEventListener('change', () => {
    if (selectMessage.value === 'all') {
        displayData(allData);
    } else {
        const selectedMessage = allData.find(row => row.c[0].v === selectMessage.value);
        displayData([selectedMessage]);
    }
});
fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substring(47, data.length - 2));
        allData = json.table.rows;
        populateSelectMessage();
        displayData(allData);
    })
    .catch(error => console.error(error));
function showCopyNotification() {
    const notification = document.getElementById('copy-notification');
    notification.style.opacity = '1';
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}
function autoCompleteSearch() {
    const searchInput = document.getElementById('search-input');
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';
    if (searchInput.value.trim() === '') {
        return;
    }

    const filteredData = allData.filter(row => {
        const keyword = row.c[0].v.toLowerCase();
        const searchTerm = searchInput.value.toLowerCase();
        return keyword.includes(searchTerm);
    });

    if (filteredData.length > 0) {
        filteredData.forEach(row => {
            const li = document.createElement('li');
            li.textContent = row.c[0].v;
            li.addEventListener('click', () => {
                searchInput.value = row.c[0].v;
                autocompleteList.innerHTML = '';
                displayData([row]);
            });
            autocompleteList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Không có kết quả';
        autocompleteList.appendChild(li);
    }
}
const loadingSpinner = document.getElementById('loading-spinner');
function showLoadingSpinner() {
    loadingSpinner.style.opacity = 1;
    loadingSpinner.style.display = 'flex';
}
function hideLoadingSpinner() {
    loadingSpinner.style.opacity = 0;
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 300);
}
showLoadingSpinner();
window.addEventListener('load', hideLoadingSpinner);
// bm#
const sheetUrl = 'https://docs.google.com/spreadsheets/d/1rR0O90hpWbM5qcM2Y8G30tg3CsX8PMygWh8sx1f4Ido/gviz/tq?tqx=out:json&sheet=bieumau';

fetch(sheetUrl)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const tableData = json.table.rows;
        const select = document.getElementById('sheetData');
        tableData.forEach(row => {
            const option = document.createElement('option');
            row.c.forEach((cell, index) => {
                if (index === 0 && cell?.v) {
                    const fileName = cell.v.split('/').pop();
                    option.value = cell.v;
                    option.textContent = fileName;
                }
            });
            select.appendChild(option);
        });
        select.addEventListener('change', () => {
            const selectedOption = select.options[select.selectedIndex];
            navigator.clipboard.writeText(selectedOption.value);
            const notification = document.createElement('div');
            notification.textContent = 'Đường dẫn đã được sao chép vào clipboard!';
            notification.style.position = 'fixed';
            notification.style.top = '60px';
            notification.style.left = '70%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'navy';
            notification.style.color = '#fff';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '4px';
            notification.style.zIndex = '9999';
            document.body.appendChild(notification);
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        });
    })
    .catch(error => console.error('Error:', error));
document.getElementById("reloadBtn").addEventListener("click", function () {
    location.reload();
});
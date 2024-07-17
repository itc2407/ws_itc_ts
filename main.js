fetch('https://docs.google.com/spreadsheets/d/1rR0O90hpWbM5qcM2Y8G30tg3CsX8PMygWh8sx1f4Ido/gviz/tq?tqx=out:json&sheet=thongbao')
    .then(response => response.text())
    .then(data => {
        const jsonData = JSON.parse(data.substring(47, data.length - 2));
        const rows = jsonData.table.rows;
        const currentDate = new Date().toLocaleDateString();
        const tableBody = document.getElementById('tuition-table').getElementsByTagName('tbody')[0];
        rows.forEach(row => {
            const tr = document.createElement('tr');
            const nganhCell = document.createElement('td');
            nganhCell.textContent = row.c[0]?.v || '';
            tr.appendChild(nganhCell);
            const hocPhiCell = document.createElement('td');
            hocPhiCell.textContent = row.c[1]?.v || '';
            tr.appendChild(hocPhiCell);
            const luuYCell = document.createElement('td');
            luuYCell.textContent = row.c[2]?.v || '';
            tr.appendChild(luuYCell);

            const detaiCell = document.createElement('td');
            detaiCell.textContent = row.c[3]?.v || '';
            tr.appendChild(detaiCell);
            const postDate = new Date(row.c[2]?.v).toLocaleDateString();
            if (postDate === currentDate) {
                tr.style.backgroundColor = 'white';
                tr.style.color = "black";
                const newLabel = document.createElement('span');
                newLabel.textContent = 'New';
                newLabel.classList.add('New');
                luuYCell.appendChild(newLabel);
            }
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error:', error));
document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.querySelector('.loading-container');
    const content = document.querySelector('.content');
    setTimeout(() => {
        loadingContainer.style.display = 'none';
        content.style.display = 'block';
    }, 1000);
});
// tra cứu lịch trục
document.getElementById('tr-btn').addEventListener('click', () => {
    const input = document.getElementById('tr-input').value.trim();
    if (input === '') {
        alert('Vui lòng nhập tên hoặc ngày trực để tìm kiếm.');
        return;
    }
    const tableBody = document.getElementById('tr-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    fetch('https://docs.google.com/spreadsheets/d/1rR0O90hpWbM5qcM2Y8G30tg3CsX8PMygWh8sx1f4Ido/gviz/tq?tqx=out:json&sheet=lichtruc')
        .then(response => response.text())
        .then(data => {
            const jsonData = JSON.parse(data.substring(47, data.length - 2));
            const rows = jsonData.table.rows;

            if (rows.length === 0) {
                const tr = document.createElement('tr');
                const messageCell = document.createElement('td');
                messageCell.textContent = 'Không có dữ liệu.';
                messageCell.colSpan = 5;
                tr.appendChild(messageCell);
                tableBody.appendChild(tr);
            } else {
                rows.forEach(row => {
                    const name = row.c[0]?.v || '';
                    const date = row.c[1]?.v || '';
                    const tt = row.c[2]?.v || '';
                    const bt = row.c[3]?.v || '';
                    const doica = row.c[4]?.v || '';
                    if (date.includes(input) || name.includes(input)) {
                        const tr = document.createElement('tr');
                        const nameCell = document.createElement('td');
                        nameCell.textContent = name;
                        tr.appendChild(nameCell);
                        const dateCell = document.createElement('td');
                        dateCell.textContent = date;
                        tr.appendChild(dateCell);
                        const ttCell = document.createElement('td');
                        ttCell.textContent = tt;
                        tr.appendChild(ttCell);
                        const btCell = document.createElement('td');
                        btCell.textContent = bt;
                        tr.appendChild(btCell);
                        const doicaCell = document.createElement('td');
                        doicaCell.textContent = doica;
                        tr.appendChild(doicaCell);
                        tableBody.appendChild(tr);
                    }
                });
                if (tableBody.children.length === 0) {
                    const tr = document.createElement('tr');
                    const messageCell = document.createElement('td');
                    messageCell.textContent = 'Không có dữ liệu.';
                    messageCell.colSpan = 5;
                    tr.appendChild(messageCell);
                    tableBody.appendChild(tr);
                }
            }
        })
        .catch(error => console.error('Error:', error));
});
// TT
fetch('https://docs.google.com/spreadsheets/d/1rR0O90hpWbM5qcM2Y8G30tg3CsX8PMygWh8sx1f4Ido/gviz/tq?tqx=out:json&sheet=thongtin')
    .then(response => response.text())
    .then(data => {
        const jsonData = JSON.parse(data.substring(47, data.length - 2));
        const cardContainer = document.getElementById('cardContainer');

        jsonData.table.rows.forEach(row => {
            const card = document.createElement('div');
            card.classList.add('card');
            const cardInfo = document.createElement('div');
            cardInfo.classList.add('card-info');

            const cardImage = document.createElement('div');
            cardImage.classList.add('card-image');
            cardImage.style.backgroundImage = `url(./image/logo_itc.edu.png`;
            card.appendChild(cardImage);

            const title = document.createElement('div');
            title.classList.add('card-title');
            title.textContent = row.c[1].v;
            cardInfo.appendChild(title);

            const detail1 = document.createElement('div');
            detail1.classList.add('card-detail');
            detail1.textContent = `Mã nhân viên: ${row.c[0].v}`;
            cardInfo.appendChild(detail1);

            const detail2 = document.createElement('div');
            detail2.classList.add('card-detail1');
            detail2.textContent = `Chức vụ: ${row.c[2].v}`;
            cardInfo.appendChild(detail2);

            const detail3 = document.createElement('div');
            detail3.classList.add('card-detail');
            detail3.textContent = `Bằng cấp: ${row.c[3].v}`;
            cardInfo.appendChild(detail3);

            const detail4 = document.createElement('div');
            detail4.classList.add('card-detail');
            detail4.textContent = `Ngày sinh: ${row.c[4].v}`;
            cardInfo.appendChild(detail4);

            const detail5 = document.createElement('div');
            detail5.classList.add('card-detail');
            detail5.textContent = `Quê quán: ${row.c[5].v}`;
            cardInfo.appendChild(detail5);

            const detail6 = document.createElement('div');
            detail6.classList.add('card-detail');
            detail6.textContent = `Phòng ban: ${row.c[6].v}`;
            cardInfo.appendChild(detail6);

            const detail8 = document.createElement('div');
            detail8.classList.add('card-detail');
            detail8.textContent = `Công việc: ${row.c[8].v}`;
            cardInfo.appendChild(detail8);

            card.appendChild(cardInfo);
            cardContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error:', error));

const copyBtn = document.getElementById('copy-btn');
const tableBody = document.querySelector('#tr-table tbody');

copyBtn.addEventListener('click', () => {
    // Get the data from the table
    const data = Array.from(tableBody.rows).map(row => {
        return Array.from(row.cells).map(cell => cell.textContent);
    });

    // Add the header row
    data.unshift(['Tên nhân viên', 'Ngày trực', 'Thứ trực', 'Buổi trực', 'Đổi ca']);

    // Create the Excel workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bảng Trực');

    // Generate the Excel file and download it
    XLSX.writeFile(workbook, 'Bảng_Truc.xlsx');
});
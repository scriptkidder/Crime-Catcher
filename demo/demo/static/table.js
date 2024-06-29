// Download table as CSV (example function)
function downloadTable() {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    const rows = document.querySelectorAll("#complaints-table tbody tr");

    rows.forEach(row => {
        const rowData = Array.from(row.children)
            .map(td => td.textContent)
            .join(",");
        csvContent += rowData + "\n";
    });

    // Create a temporary link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "complaints.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Filter table rows based on input value
document.getElementById("filterInput").addEventListener("input", function() {
    const filterValue = this.value.toLowerCase();
    const rows = document.querySelectorAll("#complaints-table tbody tr");

    rows.forEach(row => {
        const name = row.children[0].textContent.toLowerCase();

        if (name.includes(filterValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

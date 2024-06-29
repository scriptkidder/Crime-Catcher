$(document).ready(function() {
    var reports = [
        { id: 1, title: 'Theft Incident', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', location: 'City Center', status: 'Resolved' },
        { id: 2, title: 'Assault Case', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', location: 'Suburb Area', status: 'In Progress' },
        { id: 3, title: 'Vandalism Report', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', location: 'Industrial Zone', status: 'Under Review' }
        // Add more dummy reports as needed
    ];

    var reportsList = $('#reports-list');

    // Function to generate HTML for each report
    function generateReportHTML(report) {
        var statusClass = '';
        if (report.status === 'Resolved') {
            statusClass = 'resolved';
        } else if (report.status === 'In Progress') {
            statusClass = 'in-progress';
        } else if (report.status === 'Under Review') {
            statusClass = 'under-review';
        }

        return `
            <div class="report">
                <h2>${report.title}</h2>
                <p><strong>Description:</strong> ${report.description}</p>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Status:</strong> <span class="${statusClass}">${report.status}</span></p>
            </div>
        `;
    }

    // Function to populate reports on the page
    function populateReports() {
        reports.forEach(function(report) {
            var reportHTML = generateReportHTML(report);
            reportsList.append(reportHTML);
        });
    }

    // Populate reports on page load
    populateReports();
});

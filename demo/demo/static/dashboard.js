// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data for crime reports
var crimeData = [
    { type: 'Theft', location: [51.505, -0.09], description: '50 thefts reported here' },
    { type: 'Assault', location: [51.51, -0.1], description: '30 assaults reported here' },
    { type: 'Robbery', location: [51.49, -0.08], description: '20 robberies reported here' },
    { type: 'Burglary', location: [51.507, -0.087], description: '40 burglaries reported here' },
    { type: 'Vandalism', location: [51.508, -0.095], description: '25 vandalism cases reported here' }
];

// Add markers to the map with popup descriptions
crimeData.forEach(function(crime) {
    L.marker(crime.location)
        .bindPopup(`<b>${crime.type}</b><br>${crime.description}`)
        .addTo(map);
});

// Sample data for crime analytics
var crimeAnalyticsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Number of Crimes',
        backgroundColor: 'rgba(106, 45, 173, 0.2)',
        borderColor: 'rgba(106, 45, 173, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(106, 45, 173, 0.4)',
        hoverBorderColor: 'rgba(106, 45, 173, 1)',
        data: [65, 59, 80, 81, 56, 55, 70, 75, 60, 90, 100, 110],
    }]
};

// Crime Analytics Chart
var ctx1 = document.getElementById('crime-analytics-chart').getContext('2d');
var crimeAnalyticsChart = new Chart(ctx1, {
    type: 'bar',
    data: crimeAnalyticsData,
    options: {
        responsive: true,
        animation: {
            duration: 1500,
            easing: 'easeInOutQuad'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Sample data for crime types analysis
var crimeTypesData = {
    labels: ['Theft', 'Assault', 'Robbery', 'Burglary', 'Vandalism', 'Fraud', 'Arson'],
    datasets: [{
        label: 'Number of Crimes',
        data: [300, 150, 100, 200, 150, 120, 90],
        backgroundColor: ['#6a0dad', '#8a2be2', '#ba55d3', '#dda0dd', '#e6e6fa', '#d8bfd8', '#e0b0ff'],
        hoverBackgroundColor: ['#5c0dac', '#7a2ad2', '#c55aed', '#bc85e6', '#cfa3e2', '#ceb3d6', '#dab0ff']
    }]
};

// Crime Types Chart
var ctx2 = document.getElementById('crime-types-chart').getContext('2d');
var crimeTypesChart = new Chart(ctx2, {
    type: 'doughnut',
    data: crimeTypesData,
    options: {
        responsive: true,
        animation: {
            duration: 1500,
            easing: 'easeInOutQuad'
        }
    }
});

// Sample data for monthly crime trends
var monthlyCrimeTrendsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Monthly Crime Trends',
        backgroundColor: 'rgba(106, 13, 173, 0.2)',
        borderColor: 'rgba(106, 13, 173, 1)',
        borderWidth: 1,
        data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
    }]
};

// Monthly Crime Trends Chart
var ctx3 = document.getElementById('monthly-crime-trends-chart').getContext('2d');
var monthlyCrimeTrendsChart = new Chart(ctx3, {
    type: 'line',
    data: monthlyCrimeTrendsData,
    options: {
        responsive: true,
        animation: {
            duration: 1500,
            easing: 'easeInOutQuad'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Sample data for area-wise crime distribution
var areaCrimeDistributionData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [{
        label: 'Area-wise Crime Distribution',
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(102, 153, 255, 0.2)',
            'rgba(102, 255, 153, 0.2)',
            'rgba(255, 102, 153, 0.2)',
            'rgba(255, 153, 102, 0.2)'
        ],
        borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(102, 153, 255, 1)',
            'rgba(102, 255, 153, 1)',
            'rgba(255, 102, 153, 1)',
            'rgba(255, 153, 102, 1)'
        ],
        borderWidth: 1
    }]
};

// Area-wise Crime Distribution Chart
var ctx4 = document.getElementById('area-crime-distribution-chart').getContext('2d');
var areaCrimeDistributionChart = new Chart(ctx4, {
    type: 'bar',
    data: areaCrimeDistributionData,
    options: {
        responsive: true,
        animation: {
            duration: 1500,
            easing: 'easeInOutQuad'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to download chart as image
function downloadChart(chartId) {
    var chartCanvas = document.getElementById(chartId);
    var url = chartCanvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = url;
    link.download = 'chart.png';
    link.click();
}

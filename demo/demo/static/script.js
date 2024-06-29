document.addEventListener('DOMContentLoaded', function() {
    // Initialize Leaflet map
    var map = L.map('map').setView([20.5937, 78.9629], 5); // India's coordinates and zoom level

    // Add OpenStreetMap base layer to the map with purple theme
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(map);

    // Sample crime locations with types and messages
    var crimeLocations = [
        { latlng: [28.6139, 77.209], type: 'pickpocketing', message: 'Be aware of pickpocketing' },
        { latlng: [19.076, 72.8777], type: 'burglary', message: 'Recent burglary reported here' },
        { latlng: [12.9716, 77.5946], type: 'assault', message: 'Exercise caution, recent assault' }
    ];

    // Add markers for crime locations
    crimeLocations.forEach(function(location) {
        var markerColor = '#FF5733'; // Default color for markers
        var tooltipMessage = location.message;

        // Customize marker color based on crime type
        switch(location.type) {
            case 'pickpocketing':
                markerColor = '#FF5733'; // Red color for pickpocketing
                break;
            case 'burglary':
                markerColor = '#FFC300'; // Yellow color for burglary
                break;
            case 'assault':
                markerColor = '#33FF57'; // Green color for assault
                break;
            default:
                markerColor = '#FF5733'; // Default to red
                break;
        }

        // Create and add marker to the map
        var marker = L.circleMarker(location.latlng, {
            radius: 8,
            color: markerColor,
            fillColor: markerColor,
            fillOpacity: 0.8
        }).addTo(map);

        marker.bindTooltip(tooltipMessage).openTooltip();
    });

    // Function to update "You Are Here" indicator position
    function updateYouAreHerePosition(latlng) {
        var youAreHereElement = document.getElementById('you-are-here');
        if (youAreHereElement) {
            youAreHereElement.style.display = 'block';
            var mapContainer = document.getElementById('map');
            var mapRect = mapContainer.getBoundingClientRect();
            var posX = latlng.x - mapRect.left;
            var posY = latlng.y - mapRect.top;
            youAreHereElement.style.top = posY + 'px';
            youAreHereElement.style.left = posX + 'px';
        }
    }

    // Simulate movement and update "You Are Here" indicator
    function simulateYouAreHereMovement() {
        var latitude = 20.5937; // Example latitude for simulation
        var longitude = 78.9629; // Example longitude for simulation

        setInterval(function() {
            latitude += 0.01; // Example increment for latitude
            longitude += 0.01; // Example increment for longitude

            // Update map view
            map.panTo(new L.LatLng(latitude, longitude));

            // Update "You Are Here" indicator position
            updateYouAreHerePosition(map.latLngToLayerPoint(new L.LatLng(latitude, longitude)));
        }, 2000); // Adjust interval as needed
    }

    // Initialize simulated movement and update
    simulateYouAreHereMovement();

    // Crime Analytics Chart
    var ctx = document.getElementById('crime-analytics-chart').getContext('2d');

    // Sample data (replace with your actual crime analytics data)
    var crimeLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
    var crimeData = [65, 59, 80, 81, 56, 55];

    var crimeAnalyticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: crimeLabels,
            datasets: [{
                label: 'Number of Crimes',
                data: crimeData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
    
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Sample live updates (replace with real-time data fetching)
    var updatesContainer = document.getElementById('live-updates-list');
    if (updatesContainer) {
        // Sample updates (replace with real-time updates logic)
        var updates = [
            { title: 'Update Title 1', content: 'Sample update content 1' },
            { title: 'Update Title 2', content: 'Sample update content 2' },
            { title: 'Complaint Title 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo ligula quis ligula gravida malesuada.' },
            { title: 'Complaint Title 2', content: 'Fusce eleifend felis sed lectus facilisis, et lacinia ex scelerisque. Vivamus venenatis, dolor sit amet fringilla eleifend, tortor arcu euismod odio.' },
            { title: 'Complaint Title 3', content: 'Integer sit amet venenatis felis. Proin in pretium lacus. Nam posuere, tortor nec convallis congue, lorem justo iaculis mi, sit amet condimentum odio dui non orci.' },
            { title: 'Complaint Title 4', content: 'Suspendisse a ullamcorper nunc. Nulla facilisi. Aenean suscipit lorem vel ipsum cursus, non venenatis ex malesuada.' },
            { title: 'Complaint Title 5', content: 'Vivamus sodales felis in sem feugiat, ac suscipit lacus commodo. Nulla nec venenatis ante.' },
            { title: 'Complaint Title 6', content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer a ligula bibendum, aliquam sapien non, interdum lacus.' },
            { title: 'Complaint Title 7', content: 'Aliquam nec varius sem, eget eleifend arcu. Ut interdum sollicitudin magna, non cursus odio placerat ut.' },
            { title: 'Complaint Title 8', content: 'Curabitur auctor lacinia nunc sed feugiat. Nam dapibus lacus non posuere ultricies.' },
            { title: 'Complaint Title 9', content: 'Nunc eget sapien et libero vestibulum convallis ut non dui. Mauris eget augue vel velit ultrices egestas.' },
            { title: 'Complaint Title 10', content: 'Quisque fermentum nisl at mi blandit, sed lacinia mi fringilla. Morbi egestas eros sed sapien iaculis, et ultrices lacus pellentesque.' }
        ];
        
        // Now updates array contains 12 items including the original updates and the new complaints
        

        // Append updates to the updates container
        updates.forEach(function(update) {
            var updateItem = document.createElement('div');
            updateItem.classList.add('update-item');
            updateItem.innerHTML = `
                <h3>${update.title}</h3>
                <p>${update.content}</p>
            `;
            updatesContainer.appendChild(updateItem);
        });
    }
});
$(document).ready(function() {
    // Simulated data for notifications and reports
    var notifications = [
        { title: 'Notification Title 1', content: 'Sample notification content 1' },
        { title: 'Notification Title 2', content: 'Sample notification content 2' }
    ];

    var reports = [
        { id: 1, description: 'Report description 1', location: 'Location 1', type: 'Type 1', status: 'Received' },
        { id: 2, description: 'Report description 2', location: 'Location 2', type: 'Type 2', status: 'In Progress' }
    ];

    // Function to populate notifications
    function populateNotifications() {
        var notificationsList = $('#notifications-list');
        notificationsList.empty(); // Clear existing content

        notifications.forEach(function(notification) {
            var listItem = $('<li>').addClass('list-group-item');
            var title = $('<h5>').addClass('mb-1').text(notification.title);
            var content = $('<p>').addClass('mb-1').text(notification.content);

            listItem.append(title).append(content);
            notificationsList.append(listItem);
        });
    }

    // Function to populate reports
    function populateReports() {
        var reportsList = $('#reports-list');
        reportsList.empty(); // Clear existing content

        reports.forEach(function(report) {
            var reportItem = $('<div>').addClass('card mb-3');
            var cardBody = $('<div>').addClass('card-body');

            var title = $('<h5>').addClass('card-title').text('Report ID: ' + report.id);
            var description = $('<p>').addClass('card-text').text(report.description);
            var location = $('<p>').addClass('card-text').text('Location: ' + report.location);
            var type = $('<p>').addClass('card-text').text('Type: ' + report.type);
            var status = $('<p>').addClass('card-text').text('Status: ' + report.status);

            cardBody.append(title).append(description).append(location).append(type).append(status);
            reportItem.append(cardBody);
            reportsList.append(reportItem);
        });
    }

    // Initially populate notifications and reports
    populateNotifications();
    populateReports();
});

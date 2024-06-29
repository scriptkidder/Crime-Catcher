$(document).ready(function() {
    var notifications = [
        { type: 'Emergency', message: 'There are 5 reports of pocket picking in your area. Be aware of that. In case of any emergency, contact your nearest police station.', contact: '+8112345678', address: 'central park' },
        { type: 'Status Change', message: 'Your complaint status has changed from Received to Investigating.', contact: '', address: '' }
        // Add more dummy notifications as needed
    ];

    var notificationsList = $('#notifications-list');

    // Function to generate HTML for each notification
    function generateNotificationHTML(notification) {
        var typeClass = '';
        if (notification.type === 'Emergency') {
            typeClass = 'emergency';
        } else if (notification.type === 'Status Change') {
            typeClass = 'status-change';
        }

        return `
            <div class="notification">
                <h2>${notification.type}</h2>
                <p>${notification.message}</p>
                <p><strong>Contact:</strong> ${notification.contact}</p>
                <p><strong>Address:</strong> ${notification.address}</p>
            </div>
        `;
    }

    // Function to populate notifications on the page
    function populateNotifications() {
        notifications.forEach(function(notification) {
            var notificationHTML = generateNotificationHTML(notification);
            notificationsList.append(notificationHTML);
        });
    }

    // Populate notifications on page load
    populateNotifications();
});

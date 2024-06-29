$(document).ready(function() {
    // Submit form via AJAX
    $('#crime-report-form').submit(function(e) {
        e.preventDefault();
        // Simulate form submission (replace with actual AJAX call)
        console.log('Form submitted!');
        
        // Show illusion of submission (optional)
        showSubmissionIllusion();

        // Reset form fields (optional)
        $(this)[0].reset();
    });

    // Function to show illusion of submission
    function showSubmissionIllusion() {
        // Display an alert or any visual cue
        alert('Thank you for reporting the crime!'); // Example alert message

        // You can add further animations or effects here
    }
});

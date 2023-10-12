<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the submitted email address
    $email = $_POST["email"];

    // Generate a random promo code
    $promoCode = "Wheels" . rand(100, 999);

    // Prepare the customer email content
    $customer_subject = "Thank you for signing up!";
    $customer_message = "Dear customer,\n\nThank you for signing up. We appreciate your interest in our services.\n\nYour promocode is: $promoCode\n\nPlease use your Promo Code when booking online or on the phone call. \n\nBest regards,\nDetailing On Wheels";

    // Set the headers for the customer email
    $customer_headers = "From: dow@detailingonwheels.ca" . "\r\n";
    $customer_headers .= "Reply-To: dow@detailingonwheels.ca" . "\r\n";
    $customer_headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";

    // Send the customer email
    $customer_email_sent = mail($email, $customer_subject, $customer_message, $customer_headers);

    if ($customer_email_sent) {
        echo 'success';
    } else {
        echo "Failed to send the email.";
    }
}
?>

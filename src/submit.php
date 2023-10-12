<?php

if(isset($_POST['submit'])) {
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "detailingonwheels.ca@gmail.com";
    $email_subject = "Contact Form Submission";

    function died($error) {
        // your error code can go here
        echo "<h1>Whoops!</h1><h2>There appears to be something wrong with your completed form.</h2>";
        echo "<strong><p>The following items are not specified correctly.</p></strong><br />";
        echo $error."<br /><br />";
        echo "<p>Return to the form and try again.</p><br />";
        echo "<p><a href='index.php'>return to the homepage</a></p>";
        die();
    }

    $name = $_POST['name'];
    $email_from = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if(!preg_match($email_exp, $email_from)) {
        $error_message .= '<li><p>The completed email address appears to be incorrect.</p></li>';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";
    if(!preg_match($string_exp, $name)) {
        $error_message .= '<li><p>Name appears to be wrong.</p></li>';
    }

    if(strlen($message) < 2) {
        $error_message .= '<li><p>Message appears to be incorrect.</p></li>';
    }

    if(strlen($error_message) > 0) {
        died($error_message);
    }

    $email_message = "Form details are given below.\n\n";
    function clean_string($string) {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Subject: ".clean_string($subject)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";

    // create email headers
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();

    if (@mail($email_to, $email_subject, $email_message, $headers)) {
        header("Location: confirmation.html");
        exit();
    } else {
        header("Location: 404.html");
        exit();
    }
}

?>
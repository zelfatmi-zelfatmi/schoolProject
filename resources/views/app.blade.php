<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Mon Application</title>
    @routes
    @vite(['resources/scss/app.scss', 'resources/js/app.js'])
        @inertiaHead
</head>
<body class="antialiased bg-gray-100">
    @inertia
</body>
</html>

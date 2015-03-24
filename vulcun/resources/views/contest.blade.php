<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>laravel</title>
  </head>
  <body>
        <script data-main="scripts/main" src="scripts/require.js"></script>
	<h1>contests</h1>
	<table>
	<tr>
	<th>id</th>
	<th>Contest Name</th>
	<th>Prize Pool</th>
	<th>Entry Fee</th>
	<th>Entries</th>
	<th>League</th>
	<th>Starts At</th>
	</tr>
	@foreach ($contests as $contest)
	  <tr>
	  <td>{{ $contest->id }}</td>
	  <td>{{ $contest->contestname }}</td>
	  <td>{{ $contest->prizepool }}</td>
	  <td>{{ $contest->entryfee }}</td>
	  <td>{{ $contest->entries }} of {{ $contest->maxentries }}</td>
	  <td>{{ $contest->league }}</td>
	  <td>{{ $contest->starts_at }}</td>
	  </tr>
	@endforeach
	</table>
  </body>
</html>

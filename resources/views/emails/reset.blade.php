Dear {{$name}},<br/><br/>
We are from {{config('app.name')}}. Please login through below URL and use below credentials.<br/><br/>
Username:- {{$username}}<br/>
Password:- {{$password}}<br/>
Login URL:- {{url('/user/passwordReset?hash='.$hash.'&user='.$userId)}}<br/>
<br/>
Thank You!

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Login</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/IOT.png"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
<!--===============================================================================================-->
</head>
<body>
	<div class="limiter">
		<div class="container-login100">
			<div class="left-div">
				<p>
					Techno-rIoT
				</p>
			</div>
			<div class="wrap-login100">
				<form class="login100-form validate-form p-l-55 p-r-55 p-t-178 needs-validation" method="post">
					<span class="login100-form-title">
						Sign In
					</span>
					<div class = "tab">	
						<h3 style="text-align: center;"> Team Member 1 </h3> <br>
						
						<div class="wrap-input100 validate-input m-b-16" data-validate="Please enter Email">
							<input class="input100" type="text" name="email1" placeholder="Email">
							<span class="focus-input100"></span>
						</div>

						<div class="wrap-input100 validate-input" data-validate = "Please enter Password">
							<input class="input100" type="password" name="pass1" placeholder="Password">
							<span class="focus-input100"></span>
						</div>			
					</div>
					<div class = "tab">	
						<h3 style="text-align: center;"> Team Member 2 </h3> <br>
					
						<div class="wrap-input100 validate-input m-b-16" data-validate="Please enter Email">
							<input class="input100" type="email" name="email2" placeholder="Email">
							<span class="focus-input100"></span>
						</div>

						<div class="wrap-input100 validate-input" data-validate = "Please enter Password">
							<input class="input100" type="password" name="pass2" placeholder="Password">
							<span class="focus-input100"></span>
						</div>
						
					</div>

					<div class="navButtons">
							<button class="login100-form-btn" type = "button" id="prevBtn" onclick="nextPrev(-1);">
								Previous
							</button>
							<button class="login100-form-btn" type = "button" id="nextBtn" onclick="nextPrev(1);">
								Next
							</button>
					</div>

					<div style="text-align:center;margin-top:40px;" id="steps">
						<span class="step"></span>
						<span class="step"></span>
					</div>
					<br>

					<div class="flex-col-c p-t-100 p-b-40" id="reg">
						<span class="txt1 p-b-9">
							Don’t have an account?
						</span>

						<a href="http://www.psgtechlogin.in" class="txt3">
							Sign up now
						</a>
					</div>
				</form>
			</div>
			<div class="right-div">
				<img src="images/IOT1.png"/>
			</div>
		</div>
	</div>
	
	
<!--===============================================================================================-->
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<!-- <script src="js/main.js"></script> -->

	<script type='text/javascript' src="js/amazon-cognito-identity.js"></script>
	<script src="https://sdk.amazonaws.com/js/aws-sdk-2.248.1.min.js"></script> 
	<script type='text/javascript' src="js/bhuvan.js"></script>

</body>
</html>
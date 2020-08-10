var $form = $("form"),
			$successMsg = $(".alert");
		$.validator.addMethod("letters", function (value, element) {
			return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
		});
		$form.validate({
			rules: {
				name: {
					required: true,
					minlength: 3,
					letters: true
				},
				email: {
					required: true,
					email: true
				},
				company: {
					required: true,
					letters: true,
					minlength: 5
				},
				website: {
					required: true,
					url: true
				},
				message: {
					required: true,
					minlength: 10
				}
			},
			messages: {
				name: "Please specify your name (only letters)",
				email: "Please specify a valid email address",
				company: "Please specify a your name",
				website: "Please specify a your website in url format",
				message: "Please specify a your message at least 10 letter"
			},
			submitHandler: function () {
				$successMsg.show();
			}
		});
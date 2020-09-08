function delete_page(post_id, csrf_token) {
	var del_conf = confirm("Are you sure?");

	if (del_conf === true) {
		var form = document.createElement("form");

		form.method = "POST";
		form.action = "/diary/" + post_id + "/delete/";

		var csrf_element = document.createElement("input");
		csrf_element.type = "hidden";
		csrf_element.name = "csrfmiddlewaretoken";
		csrf_element.value = csrf_token;

		form.appendChild(csrf_element);

		document.body.appendChild(form);

		form.submit();
	}
}
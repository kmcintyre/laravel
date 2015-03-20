requirejs.config({
	urlArgs: "unique=" + (new Date()).getTime(),
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
    }
});
requirejs(["vulcun"]);
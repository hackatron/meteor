Package.describe({
  summary: "Twitter Bootstrap"
});

Package.on_use(function (api) {
  api.add_files('bootstrap.css', 'client');
  api.add_files('bootstrap-responsive.css', 'client');
  api.add_files('bootstrap.js', 'client');
});
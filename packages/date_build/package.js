Package.describe({
  summary: "Date parsing library."
});

Package.on_use(function (api) {
  api.add_files('date.js', 'client');
});
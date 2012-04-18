Package.describe({
  summary: "Date parsing library."
});

Package.on_use(function (api) {
  api.add_files('en-US.js', 'client');
  api.add_files('core.js', 'client');
  api.add_files('parser.js', 'client');
  api.add_files('sugarpak.js', 'client');
  api.add_files('time.js', 'client');
  api.add_files('extras.js', 'client');
});
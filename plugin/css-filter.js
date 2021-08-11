var css_parse = require("css-parse");
var css_stringify = require("css-stringify");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var through = require("through2");

const PLUGIN_NAME = "gulp-css-filter";

// 过滤函数
function filterRules(list, options) {
  return list.filter(function (r) {
    if (r.type === "rule") {
      if (r.selectors) {
        r.declarations = r.declarations.filter((item) =>
          options.includes(item.property)
        );
      }

      if (r.type === "media") {
        r.rules = filterRules(r.rules, options);
      }
      return true;
    }

    return false;
  });
}

const css_filter = function (string, options = []) {
  var css = css_parse(string);
  css.stylesheet.rules = filterRules(css.stylesheet.rules, options);
  return css_stringify(css);
};

module.exports = function (options) {
  function transform(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(
        new gutil.PluginError(PLUGIN_NAME, "Streaming not supported")
      );
    }

    file.contents = new Buffer(css_filter(file.contents.toString(), options));

    callback(null, file);
  }

  return through.obj(transform);
};

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
function queryVars(url) {
  void 0 === url && (url = window.location.search);
  var vars = {};
  if (url)
    for (var splits = url.substr(1).split("&"), i = 0; i < splits.length; ++i) {
      var p = splits[i].split("=");
      1 == p.length
        ? (vars[p[0]] = !0)
        : 2 == p.length &&
          (vars[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")));
    }
  return vars;
}
!(function (factory) {
  "function" == typeof define && define.amd
    ? define(["jquery"], factory)
    : "object" == typeof exports
    ? factory(require("jquery"))
    : factory(jQuery);
})(function ($) {
  var pluses = /\+/g;
  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }
  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }
  function read(s, converter) {
    var value = config.raw
      ? s
      : (function (s) {
          0 === s.indexOf('"') &&
            (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
          try {
            return (
              (s = decodeURIComponent(s.replace(pluses, " "))),
              config.json ? JSON.parse(s) : s
            );
          } catch (e) {}
        })(s);
    return $.isFunction(converter) ? converter(value) : value;
  }
  var config = ($.cookie = function (key, value, options) {
    if (void 0 !== value && !$.isFunction(value)) {
      if (
        "number" ==
        typeof (options = $.extend({}, config.defaults, options)).expires
      ) {
        var days = options.expires,
          t = (options.expires = new Date());
        t.setTime(+t + 864e5 * days);
      }
      return (document.cookie = [
        encode(key),
        "=",
        stringifyCookieValue(value),
        options.expires ? "; expires=" + options.expires.toUTCString() : "",
        options.path ? "; path=" + options.path : "",
        options.domain ? "; domain=" + options.domain : "",
        options.secure ? "; secure" : "",
      ].join(""));
    }
    for (
      var s,
        result = key ? void 0 : {},
        cookies = document.cookie ? document.cookie.split("; ") : [],
        i = 0,
        l = cookies.length;
      i < l;
      i++
    ) {
      var parts = cookies[i].split("="),
        name = ((s = parts.shift()), config.raw ? s : decodeURIComponent(s)),
        cookie = parts.join("=");
      if (key && key === name) {
        result = read(cookie, value);
        break;
      }
      key || void 0 === (cookie = read(cookie)) || (result[name] = cookie);
    }
    return result;
  });
  (config.defaults = {}),
    ($.removeCookie = function (key, options) {
      return (
        void 0 !== $.cookie(key) &&
        ($.cookie(key, "", $.extend({}, options, { expires: -1 })),
        !$.cookie(key))
      );
    }),
    $(document).ready(function () {
      var _body = $("body"),
        cookie = $("#cookie");
      cookie.length &&
        "hide" != $.cookie("cookie-notice") &&
        (_body.addClass("cookie-notice"),
        cookie.find(".button").on("click", function () {
          _body.removeClass("cookie-notice"), $.cookie("cookie-notice", "hide");
        }));
    });
});
var urlGetVars = queryVars();
function trackCart(item, size, qty) {
  var size_str = "undefined";
  "string" == typeof size
    ? (size_str = size)
    : "select-one" == size.type &&
      (size_str = size.options[size.selectedIndex].text);
  var qty_int = null;
  "object" == typeof qty && (qty = qty.value),
    (qty_int = isNaN(qty) ? 0 : parseInt(qty)),
    _gaq.push(["_trackEvent", "Add to Cart", item, size_str, qty_int]);
}
function mmgPrintImg(imgURL) {
  var w = window.open(
      "",
      "Map",
      "width=1000,height=600,scrollbars=yes,location=no,status=no"
    ),
    html =
      '<html><head></head><body><img src="https://606687.app.netsuite.com/core/media/media.nl?id=1903&c=606687&h=bd7b61a790959295ae2e"><br><img src="' +
      imgURL +
      '"></body></html>';
  w.document.open(),
    w.document.write(html),
    w.document.close(),
    w.focus(),
    (w.onload = function () {
      w.print();
    });
}
!(function ($) {
  var _body,
    w,
    mmgScrollTo = 0,
    opens = [];
  function bodyScrolled() {
    var s = parseInt(w.scrollTop()),
      changed = _body.hasClass("scrolled") ? 1 : 0;
    s > 0 && !changed
      ? _body.addClass("scrolled")
      : s <= 0 && changed && _body.removeClass("scrolled");
  }
  function correctScrollTo(el) {
    if (el.length) {
      var top = el.offset().top - $("#header").height() - 10;
      $("html,body").animate({ scrollTop: top });
    }
  }
  urlGetVars.open && (opens = urlGetVars.open.split(","));
  ($.fn.mmgCollapsible = function (options) {
    var params = $.extend(
      { title: ".module-title", content: ".content" },
      options
    );
    this.each(function () {
      var _this = $(this);
      _this.hasClass("products-listing") && (params.title = ".flex-area-title");
      var title = _this.find(params.title),
        content = _this.find(params.content);
      if (
        (title.length && (title = $(title[0])),
        content.length && (content = $(content[0])).hide(),
        title.click(function (e) {
          _this.hasClass("open")
            ? (content.hide("400"), _this.removeClass("open"))
            : (content.show("400"), _this.addClass("open"));
        }),
        opens.length)
      )
        for (var i = 0; i < opens.length; i++)
          if (_this.hasClass(opens[i])) {
            content.show("400"),
              _this.addClass("open"),
              0 === mmgScrollTo &&
                ("complete" === document.readyState
                  ? correctScrollTo(_this)
                  : $(window).load(function () {
                      correctScrollTo(_this);
                    }),
                (mmgScrollTo = 1));
            break;
          }
    });
  }),
    ($.fn.mmgTabs = function (options) {
      var params = $.extend(
        {
          buttons: ".tablist .tab",
          content: ".tabpanel",
          contents: ".tabpanels",
        },
        options
      );
      this.each(function () {
        var _this = $(this),
          content = (_this.find(params.contents), _this.find(params.content)),
          buttons = _this.find(params.buttons),
          active = -1;
        if (urlGetVars.tabopen) {
          var newActive = buttons.filter("#" + urlGetVars.tabopen);
          newActive.length && buttons.removeClass("active"),
            content.removeClass("active"),
            newActive.addClass("active");
        }
        buttons.each(function (i) {
          var btn = $(this);
          (btn.index = i),
            btn.hasClass("active") &&
              ((active = i), $(content[i]).addClass("active")),
            btn.click(function (e) {
              e.preventDefault(),
                btn.index !== active &&
                  ($(buttons[active])
                    .removeClass("active")
                    .attr("aria-selected", !1),
                  $(content[active])
                    .removeClass("active")
                    .attr("aria-hidden", !0),
                  btn.addClass("active").attr("aria-selected", !0),
                  $(content[btn.index])
                    .addClass("active")
                    .attr("aria-hidden", !1),
                  (active = btn.index));
            });
        }),
          active < 0 &&
            ($(buttons[(active = 0)])
              .addClass("active")
              .attr("aria-selected", !0),
            $(content[active]).addClass("active").attr("aria-hidden", !1));
      });
    }),
    $(document).ready(function () {
      navigator.userAgent.toLowerCase();
      var isTouch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof DocumentTouch);
      (_body = $("body")),
        (w = $(window)),
        isTouch && _body.addClass("touch"),
        $(".hs_cos_wrapper_widget_container").each(function () {
          var ch = $(this).children(".hs_cos_wrapper_widget");
          ch.each(function (i) {
            var _this = $(this);
            _this.addClass("module-" + (i + 1)),
              ch.length == i + 1 && _this.addClass("module-last");
          });
        }),
        bodyScrolled(),
        w.on("scroll touchstart", function () {
          bodyScrolled();
        }),
        $(".hs-menu-flow-horizontal ul").each(function () {
          var ch = $(this).children("li");
          ch.each(function (i) {
            var _this = $(this);
            _this.addClass("menu-num-" + (i + 1)),
              ch.length == i + 1 && _this.addClass("menu-last");
          });
        });
      var nav = $("#header-nav"),
        nav_in = $("#header-nav-in");
      if (
        (nav.on("click", function () {
          _body.width() < 960 &&
            (nav.toggleClass("hover"),
            nav_in.css("height", window.innerHeight)),
            w.on("resize scroll", function () {
              _body.width() < 960 && nav_in.css("height", window.innerHeight);
            });
        }),
        _body.width() <= 960 &&
          nav
            .find("li.hs-item-has-children:not(.hs-menu-depth-3)")
            .each(function () {
              var _this = $(this),
                a = _this.children("a"),
                ul = _this.children("ul").hide();
              if (
                (_this.hasClass("active-branch") &&
                  ul.length &&
                  (_this.addClass("open"), ul.slideDown()),
                ul.length)
              ) {
                var arrow = $('<span class="arrow"></span>').click(function (
                  e
                ) {
                  e.stopPropagation(),
                    _this.toggleClass("open"),
                    ul.slideToggle("slow");
                });
                "javascript:;" == a.attr("href") &&
                  a.click(function (e) {
                    e.stopPropagation(),
                      _this.toggleClass("open"),
                      ul.slideToggle("slow");
                  }),
                  a.before(arrow);
              }
            }),
        isTouch)
      ) {
        nav_in.on("swiperight", function (e) {
          nav.hasClass("hover") &&
            (e.preventDefault(), e.stopPropagation(), nav.removeClass("hover"));
        });
        var aTouch = $("#menu ul li.hs-menu-depth-1.hs-item-has-children>a");
        aTouch.on("click", function (e) {
          _body.width() >= 960 &&
            (this.iclicked ||
              (e.preventDefault(),
              e.stopPropagation(),
              aTouch.each(function () {
                this.iclicked = 0;
              }),
              (this.iclicked = 1)));
        }),
          $("#content-wrapper, #footer").on("touchstart", function () {
            _body.width() >= 960 &&
              aTouch.each(function () {
                this.iclicked = 0;
              });
          });
      }
      $(".mmg-sticked-banner").each(function () {
        var _this = $(this),
          bannerId = _this.attr("id"),
          exp = parseInt(_this.attr("data-expire-closed"));
        _this.addClass("open"),
          _this.find(".close").click(function () {
            _this.removeClass("open"),
              $.cookie(bannerId, "closed", { expires: exp });
          });
      }),
        $(".mmg-collapsible").mmgCollapsible(),
        $(".mmg-tabs").mmgTabs(),
        $('img[src*="popup"], img.colorbox').each(function () {
          var _this = $(this);
          if (_this.css("display").indexOf("none") > -1) return !1;
          var wrap = $('<div class="img-colorbox-popup"></div>').colorbox({
            close: "&times;",
            opacity: 0.7,
            photo: !0,
            href: _this.attr("src"),
            maxWidth: "97%",
            maxHeight: "98%",
            onComplete: function () {
              var img = $("#cboxLoadedContent img"),
                ratio =
                  parseInt(window.devicePixelRatio) > 0
                    ? window.devicePixelRatio
                    : 1,
                img2 = new Image();
              (img2.onload = function () {
                var h = img2.height / ratio,
                  w = img2.width / ratio;
                if (w > img.width()) {
                  img.css({ cursor: "pointer" });
                  var zoom = $('<span class="button icon-search"></span>');
                  img.parent().parent().append(zoom),
                    $(img)
                      .add(zoom)
                      .click(function () {
                        img.css({ width: w, height: "auto", cursor: "auto" });
                        var wh =
                            Math.max(window.innerHeight, $(window).height()) -
                            30,
                          params = h > wh ? { height: wh } : {};
                        $.colorbox.resize(params), img.off(), zoom.remove();
                      });
                }
              }),
                (img2.src = img.attr("src"));
            },
          });
          "right" == _this.css("float") &&
            (wrap.addClass("half-right"),
            _this.attr("style", ""),
            _this.attr("width", "")),
            "left" == _this.css("float") &&
              (wrap.addClass("half-left"),
              _this.attr("style", ""),
              _this.attr("width", "")),
            _this.wrap(wrap);
        });
    }),
    $(window).load(function () {
      location.hash && correctScrollTo($(location.hash));
    });
})(jQuery),
  (function ($) {
    $(document).ready(function () {
      var _body = $("body");
      if (
        !(
          _body.hasClass("home") ||
          _body.hasClass("blog") ||
          _body.hasClass("hs-content-id-4084794227") ||
          _body.hasClass("sidebar-50") ||
          _body.hasClass("hs-landing-page")
        )
      ) {
        var w = $(window),
          sidebar = $("#sidebar"),
          sbMenu = $("#hs_menu_wrapper_mainmenu"),
          header = $("#header"),
          wrap = $("#content"),
          outer = $("#content .outer"),
          footer = $("#footer");
          console.log(wrap.offset());
        w.bind("load resize scroll", function (e) {
          var wTop = w.scrollTop(),
            winW = w.width(),
            t = header.height() + 30,
            fixPoint =
              300 - t,
            sH = sidebar.height(),
            fT = 300;
          if (sidebar.hasClass("fixed"))
            if (wTop < fixPoint || winW < 860)
              sidebar.removeClass("fixed").attr("style", ""),
                sbMenu.length &&
                  sbMenu.show(200, function () {
                    sbMenu.css("display", "");
                  });
            else if ("resize" == e.type) {
              var oW = outer.width();
              sidebar.css({
                right: (winW - oW) / 2,
                width: Math.ceil(0.26 * oW),
              });
            } else {
              (t =
                (bottomSpace = fT - wTop - sH - t) > 30
                  ? t
                  : t - 30 + bottomSpace) != parseInt(sidebar.css("top")) &&
                sidebar.css("top", t);
            }
          else if (wTop >= fixPoint && winW >= 860) {
            var bottomSpace;
            oW = outer.width();
            (t =
              (bottomSpace = fT - wTop - sH - t) > 30
                ? t
                : t - 30 + bottomSpace),
              sidebar.css({
                position: "fixed",
                right: (winW - oW) / 2,
                top: t,
                width: Math.ceil(0.26 * oW),
              }),
              sidebar.addClass("fixed"),
              sbMenu.length && sbMenu.hide(200);
          }
        });
      }
    });
  })(jQuery),
  (function ($) {
    $(document).ready(function () {
      var ids = [];
      $(".table_order .price").each(function () {
        var id = $(this).attr("id");
        if (id.indexOf("price_") > -1) {
          var x = id.replace("price_", "");
          ids.push(x);
        }
      });
      var jsonString = JSON.stringify(ids);
      if (
        (ids.length > 0 &&
          $.ajax({
            type: "POST",
            url: "http://app.aldevron.com/getprice/get_price.php",
            data: { idArray: jsonString },
            ContentType: "application/json",
            success: function (response) {
              !(function (resp) {
                $(".table_order .price").each(function () {
                  var _this = $(this),
                    id = _this.attr("id");
                  if (id.indexOf("price_") > -1) {
                    var x = id.replace("price_", "");
                    _this.html(resp[x]);
                  }
                });
              })(JSON.parse(response));
            },
            error: function (response) {
              console.log(JSON.parse(response));
            },
          }),
        $(".pricetable .content, .pricetable-self").each(function () {
          var _this = $(this),
            id = _this.attr("id").split("_");
          $.ajax({
            url:
              "https://app.aldevron.com/get_price.php?pricetable&id=" + id[1],
            success: function (data, status, jxhr) {
              _this.append(data);
            },
            error: function (jxhr, status, error) {
              _this.append("<p>Failed to load price table</p>"),
                console.log(error);
            },
          });
        }),
        $(".zoom-iframe").colorbox({
          iframe: !0,
          width: "660px",
          height: "550px",
          close: "&times;",
          opacity: 0.7,
        }),
        $(".zoom-map").each(function () {
          var _this = $(this),
            w = Math.min(0.98 * $(window).width(), 700),
            content =
              (Math.min(0.98 * $(window).height(), 500),
              '<img src="' +
                _this.attr("href") +
                '"><br><span class="button" onclick="mmgPrintImg(\'' +
                _this.attr("href") +
                "')\">Print</span>");
          _this.colorbox({
            close: "&times;",
            opacity: 0.7,
            width: w,
            height: 500,
            html: content,
            onComplete: function () {
              $.colorbox.resize();
            },
          });
        }),
        urlGetVars.show)
      ) {
        var products = urlGetVars.show.split(",").map(function (p) {
            return p.trim();
          }),
          anyHidden = 0;
        if (products.length) {
          var refTR = $("#table_citations tbody tr");
          refTR.each(function () {
            var _this = $(this),
              attr = _this.attr("data-product"),
              hide = 1;
            if (void 0 !== attr && !1 !== attr)
              for (i = 0; i < products.length; i++)
                if (attr.indexOf(products[i]) > -1) {
                  hide = 0;
                  break;
                }
            hide && (_this.css("display", "none"), (anyHidden = 1));
          });
        }
        anyHidden &&
          $(".show-all-refs")
            .click(function () {
              refTR.show(),
                $(this).hide(),
                $("html,body").animate({ scrollTop: 0 });
            })
            .show();
        anyHidden = 0;
        if (products.length) {
          var trs = $("#table_antibodyproducts tbody tr");
          (products = products.join(",")),
            trs.each(function () {
              var _this = $(this),
                id = _this.attr("id");
              products.indexOf(id) < 0 &&
                (_this.css("display", "none"), (anyHidden = 1));
            });
        }
        anyHidden &&
          $(".show-all-items")
            .click(function () {
              trs.show(),
                $(this).hide(),
                $("html,body").animate({ scrollTop: 0 });
            })
            .show();
      }
    });
  })(jQuery);
//# sourceURL=https://cdn2.hubspot.net/hub/1769030/hub_generated/template_assets/3978463248/1695336486795/Coded_files/Custom/page/aldevron/Scripts.js

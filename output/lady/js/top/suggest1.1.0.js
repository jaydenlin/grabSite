Ac = Class.create({
    initialize: function () {
        this.slindex = -1;
        this.elt = $('k');
        this.domain = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        this.elt.setAttribute('autocomplete', 'off');
        this.popup = $('suggest');
        this.elt.observe('keyup', this.keyevent.bind(this));
        this.elt.observe('keydown', this.navigate.bind(this));
        this.elt.autocomplete = "off";
        this.pK = $F('k');
        this.kws = new Array();
        this.isV = false;
        this.isN = false;
        this.inRoll = false;
        this.count = 0;
        this.biggestRoot = '';
        this.sjson = new Array();
        this.rid = 'tw01'
    },
    close: function () {
        $('suggest')
            .hide();
        this.isV = false;
        this.isN = false;
        $('k')
            .value = this.pK;
        $('k')
            .focus();
        jQuery("#category-g")
            .removeClass("xxx");
        jQuery("#banners")
            .removeClass("xxx")
    },
    hide: function () {
        $('suggest')
            .hide();
        this.isV = false;
        this.isN = false;
        this.pK = '';
        this.count = 0;
        this.kws = new Array();
        $('k')
            .focus();
        jQuery("#category-g")
            .removeClass("xxx");
        jQuery("#banners")
            .removeClass("xxx")
    },
    help: function () {
        var a = unescape('%3e');
        var b = null;
        var c = "Launch Pop-up Navigator";
        b = window.open('', 'popupnav', 'width=270,height=160,resizable=0,scrollbars=auto');
        if (b != null) {
            if (b.opener == null) {
                b.opener = self
            }
            b.location.href = 'http://ws.rakuten.com.tw/suggestapi/help.html'
        }
    },
    offlight: function () {
        this.inRoll = false;
        $('sb' + String(this.slindex))
            .style.background = "#FFFFFF"
    },
    highlight: function (a) {
        this.inRoll = true;
        if (this.slindex > -1) {
            $('sb' + String(this.slindex))
                .style.background = "#FFFFFF"
        }
        this.slindex = a;
        $('sb' + String(this.slindex))
            .style.background = "#fff09d"
    },
    select: function (a) {
        $('k')
            .value = this.kws[a];
        this.hide();
        this.isN = true;
        $('searchForm')
            .submit()
    },
    keyevent: function (a) {
        var b = a.which || a.keyCode;
        if (b == 13) {
            return
        }
        var c = $F('k');
        if (c && (b != 27)) {
            this.show(c)
        } else {
            this.hide();
            if (b == 27) {
                $('k')
                    .value = this.pK
            } else {
                this.pK = ''
            }
        } if (this.count == 0) {
            this.hide()
        }
    },
    show: function (a) {
        if (this.pK != a && this.isN == false && a.length < 20) {
            this.pK = a;
            if ((this.count == 0) && (this.biggestRoot.length > 0) && (this.pK.indexOf(this.biggestRoot) == 0) && (this.pK != this.biggestRoot)) {
                return
            }
            if (this.sjson[a]) {
                this.sd(this.sjson[a])
            } else {
                var b = 'http://ws.rakuten.com.tw/suggestapi/suggest.action?' + 'k=' + encodeURIComponent(this.pK) + '&t=' + '0' + '&x=' + Math.random(new Date()
                    .getTime()) + '&rid=' + this.rid;
                var c = $('ssrc');
                if (c) {
                    document.body.removeChild(c)
                }
                c = document.createElement('script');
                c.src = b;
                c.id = 'ssrc';
                document.body.appendChild(c)
            }
            jQuery("#category-g")
                .addClass("xxx");
            jQuery("#banners")
                .addClass("xxx")
        }
    },
    sd: function (j) {
        var a = this;
        if (j && j["k"] && j["r"] && j["r"].length > 0) {
            var b = '<ul>';
            a.kws = new Array();
            a.count = 0;
            var c = j['k'];
            for (var i = 0; i < j["r"].length; i++) {
                var k = j["r"][i];
                a.count++;
                a.kws[i] = k;
                var d;
                var e = Math.max(k.toLowerCase()
                    .indexOf(c.toLowerCase()), 0);
                d = k.substr(0, e) + '<span>' + k.substr(e, c.length) + '<\/span>' + k.substr(e + c.length);
                b += '<li onmouseover="suggestbox.highlight(' + i + ');return false;" onmouseout="suggestbox.offlight();return false;" ><a href="#" id="sb' + i + '" onclick="suggestbox.select(' + i + ');return false;">' + d + '<\/a><\/li>'
            }
            a.biggestRoot = a.pK;
            b += '<\/ul><p><a href="#" onclick="suggestbox.close();">關閉</a><\/p>';
            $('suggest')
                .update(b);
            $('suggest')
                .show();
            a.isV = true;
            a.slindex = -1
        } else {
            a.hide()
        } if (a.sjson.length > 1000) {
            a.sjson = new Array()
        }
        a.sjson[j["k"]] = j
    },
    navigate: function (a) {
        var b = a.which || a.keyCode;
        if (this.isV && ((b == 40) || (b == 38))) {
            if (b == 40) {
                this.isN = true;
                if (this.slindex > -1) {
                    $('sb' + String(this.slindex))
                        .style.background = "#FFFFFF"
                }
                this.slindex++;
                if ($('sb' + String(this.slindex))) {
                    $('sb' + String(this.slindex))
                        .style.background = "#fff09d";
                    $('k')
                        .value = this.kws[this.slindex]
                } else {
                    this.slindex = -1;
                    $('k')
                        .value = this.pK
                }
            } else if (b == 38) {
                this.isN = true;
                if (this.slindex > -1) {
                    $('sb' + String(this.slindex))
                        .style.background = "#FFFFFF";
                    this.slindex--;
                    if (this.slindex > -1) {
                        $('sb' + String(this.slindex))
                            .style.background = "#fff09d";
                        $('k')
                            .value = this.kws[this.slindex]
                    }
                } else if (this.count > 0) {
                    this.slindex = this.count - 1;
                    $('sb' + String(this.slindex))
                        .style.background = "#fff09d";
                    $('k')
                        .value = this.kws[this.slindex]
                } else {
                    this.slindex = -1;
                    $('k')
                        .value = this.pK
                }
            }
        } else if (((b == 13) || (b == 16) || (b == 17) || (b == 18) || (b == 35) || (b == 36) || (b == 37) || (b == 39) || (b == 40) || (b == 38))) {} else {
            this.isN = false
        }
    }
});
jQuery.noConflict();
jQuery(document)
    .ready(function () {
        suggestbox = new Ac();
        var c;

        function b() {
            clearTimeout(c);
            if (suggestbox.inRoll == false) {
                $('suggest')
                    .hide();
                suggestbox.isV = false;
                suggestbox.isN = false;
                suggestbox.pK = '';
                suggestbox.count = 0;
                suggestbox.kws = new Array();
                jQuery("#category-g")
                    .removeClass("xxx");
                jQuery("#banners")
                    .removeClass("xxx")
            }
        }

        function f() {
            var a = $F('k');
            if (a && a.length < 20) {
                suggestbox.show(a)
            } else {
                if (suggestbox.isV == true && suggestbox.isN == false) {
                    suggestbox.hide()
                }
            }
            c = setTimeout(f, 500)
        }
        $('k')
            .onfocus = f;
        $('k')
            .onblur = b
    });
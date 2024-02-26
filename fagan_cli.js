// TODO: Add certs and pictures
// TODO: Add display command
(function(b) {
    b.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            191: "/",
            224: "meta"
        },
        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };

    function a(d) {
        if (typeof d.data !== "string") {
            return
        }
        var c = d.handler,
            e = d.data.toLowerCase().split(" ");
        d.handler = function(n) {
            if (this !== n.target && (/textarea|select/i.test(n.target.nodeName) || n.target.type === "text")) {
                return
            }
            var h = n.type !== "keypress" && b.hotkeys.specialKeys[n.which],
                o = String.fromCharCode(n.which).toLowerCase(),
                k, m = "",
                g = {};
            if (n.altKey && h !== "alt") {
                m += "alt+"
            }
            if (n.ctrlKey && h !== "ctrl") {
                m += "ctrl+"
            }
            if (n.metaKey && !n.ctrlKey && h !== "meta") {
                m += "meta+"
            }
            if (n.shiftKey && h !== "shift") {
                m += "shift+"
            }
            if (h) {
                g[m + h] = true
            } else {
                g[m + o] = true;
                g[m + b.hotkeys.shiftNums[o]] = true;
                if (m === "shift+") {
                    g[b.hotkeys.shiftNums[o]] = true
                }
            }
            for (var j = 0, f = e.length; j < f; j++) {
                if (g[e[j]]) {
                    return c.apply(this, arguments)
                }
            }
        }
    }
    b.each(["keydown", "keyup", "keypress"], function() {
        b.event.special[this] = {
            add: a
        }
    })
})(jQuery);
(function(a) {
    a.browserTest = function(e, g) {
        var f = "unknown",
            d = "X",
            b = function(k, j) {
                for (var c = 0; c < j.length; c = c + 1) {
                    k = k.replace(j[c][0], j[c][1])
                }
                return k
            },
            h = function(l, k, j, n) {
                var m = {
                    name: b((k.exec(l) || [f, f])[1], j)
                };
                m[m.name] = true;
                m.version = (n.exec(l) || [d, d, d, d])[3];
                if (m.name.match(/safari/) && m.version > 400) {
                    m.version = "2.0"
                }
                if (m.name === "presto") {
                    m.version = (a.browser.version > 9.27) ? "futhark" : "linear_b"
                }
                m.versionNumber = parseFloat(m.version, 10) || 0;
                m.versionX = (m.version !== d) ? (m.version + "").substr(0, 1) : d;
                m.className = m.name + m.versionX;
                return m
            };
        e = (e.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? b(e, [
            [/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ""],
            ["Chrome Safari", "Chrome"],
            ["KHTML", "Konqueror"],
            ["Minefield", "Firefox"],
            ["Navigator", "Netscape"]
        ]) : e).toLowerCase();
        a.browser = a.extend((!g) ? a.browser : {}, h(e, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));
        a.layout = h(e, /(gecko|konqueror|msie|opera|webkit)/, [
            ["konqueror", "khtml"],
            ["msie", "trident"],
            ["opera", "presto"]
        ], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);
        a.os = {
            name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [f])[0].replace("sunos", "solaris")
        };
        if (!g) {
            a("html").addClass([a.os.name, a.browser.name, a.browser.className, a.layout.name, a.layout.className].join(" "))
        }
    };
    a.browserTest(navigator.userAgent)
})(jQuery);
(function(a) {
    a.fn.konami = function(b, c) {
        c = a.extend({}, a.fn.konami.params, c);
        this.each(function() {
            var d = a(this);
            d.bind("konami", b).bind("keyup", function(e) {
                a.fn.konami.checkCode(e, c, d)
            })
        });
        return this
    };
    a.fn.konami.params = {
        code: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
        step: 0
    };
    a.fn.konami.checkCode = function(b, c, d) {
        if (b.keyCode == c.code[c.step]) {
            c.step++
        } else {
            c.step = 0
        }
        if (c.step == c.code.length) {
            d.trigger("konami");
            c.step = 0
        }
    }
})(jQuery);

function ltrim(b) {
    if (b) {
        var a = /\s*((\S+\s*)*)/;
        return b.replace(a, "$1")
    }
    return ""
}

function rtrim(b) {
    if (b) {
        var a = /((\s*\S+)*)\s*/;
        return b.replace(a, "$1")
    }
    return ""
}

function trim(a) {
    if (a) {
        return ltrim(rtrim(a))
    }
    return ""
}

function entityEncode(a) {
    a = a.replace(/&/g, "&amp;");
    a = a.replace(/</g, "&lt;");
    a = a.replace(/>/g, "&gt;");
    a = a.replace(/  /g, " &nbsp;");
    if (/msie/i.test(navigator.userAgent)) {
        a = a.replace("\n", "&nbsp;<br />")
    } else {
        a = a.replace(/\x0D/g, "&nbsp;<br />")
    }
    return a
}
var TerminalShell = {
    commands: {
        help: function help(a) {
            a.print($("<h3>help</h3>"));
            cmd_list = $("<ul>");
            $.each(["cd", "ls", "cat","wget","curl","vim","emacs","echo","display"], function(c, b) {
                cmd_list.append($("<li>").text(b))
            });
            a.print(cmd_list);
            a.print(cow("Find more commands BY YOURSELF!"))
        },
        clear: function(a) {
            a.clear()
        }
    },
    filters: [],
    fallback: null,
    lastCommand: null,
    process: function(a, b) {
        try {
            $.each(this.filters, $.proxy(function(e, g) {
                b = g.call(this, a, b)
            }, this));
            var f = b.split(" ");
            var d = f.shift();
            f.unshift(a);
            if (this.commands.hasOwnProperty(d)) {
                this.commands[d].apply(this, f)
            } else {
                if (!(this.fallback && this.fallback(a, b))) {
                    a.print('Unrecognized command. Type "help" for assistance.')
                }
            }
            this.lastCommand = b
        } catch (c) {
            a.print($("<p>").addClass("error").text("An internal error occured: " + c));
            a.setWorking(false)
        }
    },
};
var Terminal = {
    buffer: "",
    pos: 0,
    history: [],
    historyPos: 0,
    promptActive: true,
    cursorBlinkState: true,
    _cursorBlinkTimeout: null,
    spinnerIndex: 0,
    _spinnerTimeout: null,
    output: TerminalShell,
    config: {
        scrollStep: 20,
        scrollSpeed: 100,
        bg_color: "#000",
        fg_color: "#FFF",
        cursor_blink_time: 700,
        cursor_style: "block",
        prompt: "guest@fagan:/$ ",
        spinnerCharacters: ["[   ]", "[.  ]", "[.. ]", "[...]"],
        spinnerSpeed: 250,
        typingSpeed: 50
    },
    sticky: {
        keys: {
            ctrl: false,
            alt: false,
            scroll: false
        },
        set: function(a, b) {
            this.keys[a] = b;
            $("#" + a + "-indicator").toggle(this.keys[a])
        },
        toggle: function(a) {
            this.set(a, !this.keys[a])
        },
        reset: function(a) {
            this.set(a, false)
        },
        resetAll: function(a) {
            $.each(this.keys, $.proxy(function(b, c) {
                this.reset(b)
            }, this))
        }
    },
    init: function() {
        function a(b) {
            return function() {
                if (Terminal.promptActive) {
                    b.apply(this, arguments)
                }
            }
        }
        $(document).keypress($.proxy(a(function(d) {
            if (d.which >= 32 && d.which <= 126) {
                var c = String.fromCharCode(d.which);
                var b = c.toLowerCase()
            } else {
                return
            }
            if ($.browser.opera && !(/[\w\s]/.test(c))) {
                return
            }
            if (this.sticky.keys.ctrl) {
                if (b == "w") {
                    this.deleteWord()
                } else {
                    if (b == "h") {
                        Terminal.deleteCharacter(false)
                    } else {
                        if (b == "l") {
                            this.clear()
                        } else {
                            if (b == "a") {
                                this.setPos(0)
                            } else {
                                if (b == "e") {
                                    this.setPos(this.buffer.length)
                                } else {
                                    if (b == "d") {
                                        this.runCommand("logout")
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (c) {
                    this.addCharacter(c);
                    d.preventDefault()
                }
            }
        }), this)).bind("keydown", "return", a(function(b) {
            Terminal.processInputBuffer()
        })).bind("keydown", "backspace", a(function(b) {
            b.preventDefault();
            Terminal.deleteCharacter(b.shiftKey)
        })).bind("keydown", "del", a(function(b) {
            Terminal.deleteCharacter(true)
        })).bind("keydown", "left", a(function(b) {
            Terminal.moveCursor(-1)
        })).bind("keydown", "right", a(function(b) {
            Terminal.moveCursor(1)
        })).bind("keydown", "up", a(function(b) {
            b.preventDefault();
            if (b.shiftKey || Terminal.sticky.keys.scroll) {
                Terminal.scrollLine(-1)
            } else {
                if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                    Terminal.scrollPage(-1)
                } else {
                    Terminal.moveHistory(-1)
                }
            }
        })).bind("keydown", "down", a(function(b) {
            b.preventDefault();
            if (b.shiftKey || Terminal.sticky.keys.scroll) {
                Terminal.scrollLine(1)
            } else {
                if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                    Terminal.scrollPage(1)
                } else {
                    Terminal.moveHistory(1)
                }
            }
        })).bind("keydown", "pageup", a(function(b) {
            Terminal.scrollPage(-1)
        })).bind("keydown", "pagedown", a(function(b) {
            Terminal.scrollPage(1)
        })).bind("keydown", "home", a(function(b) {
            b.preventDefault();
            if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                Terminal.jumpToTop()
            } else {
                Terminal.setPos(0)
            }
        })).bind("keydown", "end", a(function(b) {
            b.preventDefault();
            if (b.ctrlKey || Terminal.sticky.keys.ctrl) {
                Terminal.jumpToBottom()
            } else {
                Terminal.setPos(Terminal.buffer.length)
            }
        })).bind("keydown", "tab", function(b) {
            b.preventDefault()
        }).keyup(function(c) {
            var b = $.hotkeys.specialKeys[c.which];
            if (b in {
                    ctrl: true,
                    alt: true,
                    scroll: true
                }) {
                Terminal.sticky.toggle(b)
            } else {
                if (!(b in {
                        left: true,
                        right: true,
                        up: true,
                        down: true
                    })) {
                    Terminal.sticky.resetAll()
                }
            }
        });
        $(window).resize(function(b) {
            $("#screen").scrollTop($("#screen")[0].scrollHeight)
        });
        this.setCursorState(true);
        this.setWorking(false);
        $("#prompt").html(this.config.prompt);
        $("#screen").hide().fadeIn("fast", function() {
            $("#screen").triggerHandler("cli-load")
        })
    },
    setCursorState: function(b, a) {
        this.cursorBlinkState = b;
        if (this.config.cursor_style == "block") {
            if (b) {
                $("#cursor").css({
                    color: this.config.bg_color,
                    backgroundColor: this.config.fg_color
                })
            } else {
                $("#cursor").css({
                    color: this.config.fg_color,
                    background: "none"
                })
            }
        } else {
            if (b) {
                $("#cursor").css("textDecoration", "underline")
            } else {
                $("#cursor").css("textDecoration", "none")
            }
        }
        if (!a && this._cursorBlinkTimeout) {
            window.clearTimeout(this._cursorBlinkTimeout);
            this._cursorBlinkTimeout = null
        }
        this._cursorBlinkTimeout = window.setTimeout($.proxy(function() {
            this.setCursorState(!this.cursorBlinkState, true)
        }, this), this.config.cursor_blink_time)
    },
    updateInputDisplay: function() {
        var c = "",
            b = " ",
            a = "";
        if (this.pos < 0) {
            this.pos = 0
        }
        if (this.pos > this.buffer.length) {
            this.pos = this.buffer.length
        }
        if (this.pos > 0) {
            c = this.buffer.substr(0, this.pos)
        }
        if (this.pos < this.buffer.length) {
            b = this.buffer.substr(this.pos, 1)
        }
        if (this.buffer.length - this.pos > 1) {
            a = this.buffer.substr(this.pos + 1, this.buffer.length - this.pos - 1)
        }
        $("#lcommand").text(c);
        $("#cursor").text(b);
        if (b == " ") {
            $("#cursor").html("&nbsp;")
        }
        $("#rcommand").text(a);
        $("#prompt").text(this.config.prompt);
        return
    },
    clearInputBuffer: function() {
        this.buffer = "";
        this.pos = 0;
        this.updateInputDisplay()
    },
    clear: function() {
        $("#display").html("")
    },
    sudo: function(a) {
        if (a) {
            this.config.prompt = this.config.prompt.replace("$", "#").replace("guest", "root")
        } else {
            this.config.prompt = this.config.prompt.replace("#", "$").replace("root", "guest")
        }
        $("#prompt").text(this.config.prompt)
    },
    addCharacter: function(b) {
        var c = this.buffer.substr(0, this.pos);
        var a = this.buffer.substr(this.pos, this.buffer.length - this.pos);
        this.buffer = c + b + a;
        this.pos++;
        this.updateInputDisplay();
        this.setCursorState(true)
    },
    deleteCharacter: function(a) {
        var d = a ? 1 : 0;
        if (this.pos >= (1 - d)) {
            var c = this.buffer.substr(0, this.pos - 1 + d);
            var b = this.buffer.substr(this.pos + d, this.buffer.length - this.pos - d);
            this.buffer = c + b;
            this.pos -= 1 - d;
            this.updateInputDisplay()
        }
        this.setCursorState(true)
    },
    deleteWord: function() {
        if (this.pos > 0) {
            var a = this.pos;
            while (a > 0 && this.buffer.charAt(a) !== " ") {
                a--
            }
            left = this.buffer.substr(0, a - 1);
            right = this.buffer.substr(a, this.buffer.length - this.pos);
            this.buffer = left + right;
            this.pos = a;
            this.updateInputDisplay()
        }
        this.setCursorState(true)
    },
    moveCursor: function(a) {
        this.setPos(this.pos + a)
    },
    setPos: function(a) {
        if ((a >= 0) && (a <= this.buffer.length)) {
            this.pos = a;
            Terminal.updateInputDisplay()
        }
        this.setCursorState(true)
    },
    moveHistory: function(b) {
        var a = this.historyPos + b;
        if ((a >= 0) && (a <= this.history.length)) {
            if (a == this.history.length) {
                this.clearInputBuffer()
            } else {
                this.buffer = this.history[a]
            }
            this.pos = this.buffer.length;
            this.historyPos = a;
            this.updateInputDisplay();
            this.jumpToBottom()
        }
        this.setCursorState(true)
    },
    addHistory: function(a) {
        this.historyPos = this.history.push(a)
    },
    jumpToBottom: function() {
        $("#screen").animate({
            scrollTop: $("#screen")[0].scrollHeight
        }, this.config.scrollSpeed, "linear")
    },
    jumpToTop: function() {
        $("#screen").animate({
            scrollTop: 0
        }, this.config.scrollSpeed, "linear")
    },
    scrollPage: function(a) {
        $("#screen").animate({
            scrollTop: $("#screen").scrollTop() + a * ($("#screen").height() * 0.75)
        }, this.config.scrollSpeed, "linear")
    },
    scrollLine: function(a) {
        $("#screen").scrollTop($("#screen").scrollTop() + a * this.config.scrollStep)
    },
    print: function(b) {
        if (!b) {
            $("#display").append($("<div>"))
        } else {
            if (b instanceof jQuery) {
                $("#display").append(b)
            } else {
                var a = Array.prototype.slice.call(arguments, 0);
                $("#display").append($("<p>").text(a.join(" ")))
            }
        }
        this.jumpToBottom()
    },
    processInputBuffer: function(a) {
        this.print($("<p>").addClass("command").text(this.config.prompt + this.buffer));
        var a = trim(this.buffer);
        this.clearInputBuffer();
        if (a.length == 0) {
            return false
        }
        this.addHistory(a);
        if (this.output) {
            return this.output.process(this, a)
        } else {
            return false
        }
    },
    setPromptActive: function(a) {
        this.promptActive = a;
        $("#inputline").toggle(this.promptActive)
    },
    setWorking: function(a) {
        if (a && !this._spinnerTimeout) {
            $("#display .command:last-child").add("#bottomline").first().append($("#spinner"));
            this._spinnerTimeout = window.setInterval($.proxy(function() {
                if (!$("#spinner").is(":visible")) {
                    $("#spinner").fadeIn()
                }
                this.spinnerIndex = (this.spinnerIndex + 1) % this.config.spinnerCharacters.length;
                $("#spinner").text(this.config.spinnerCharacters[this.spinnerIndex])
            }, this), this.config.spinnerSpeed);
            this.setPromptActive(false);
            $("#screen").triggerHandler("cli-busy")
        } else {
            if (!a && this._spinnerTimeout) {
                clearInterval(this._spinnerTimeout);
                this._spinnerTimeout = null;
                $("#spinner").fadeOut();
                this.setPromptActive(true);
                $("#screen").triggerHandler("cli-ready")
            }
        }
    },
    runCommand: function(e) {
        var b = 0;
        var d = false;
        this.promptActive = false;
        var a = window.setInterval($.proxy(function c() {
            if (b < e.length) {
                this.addCharacter(e.charAt(b));
                b += 1
            } else {
                clearInterval(a);
                this.promptActive = true;
                this.processInputBuffer()
            }
        }, this), this.config.typingSpeed)
    }
};
$(document).ready(function() {
    $("#welcome").show();
    document.onkeydown = document.onkeypress = function(a) {
        return $.hotkeys.specialKeys[a.keyCode] != "backspace"
    };
    Terminal.init()
});

function pathFilename(b) {
    var a = /\/([^\/]+)$/.exec(b);
    if (a) {
        return a[1]
    }
}

function getRandomInt(b, a) {
    return Math.floor(Math.random() * (a - b + 1)) + b
}

function randomChoice(a) {
    return a[getRandomInt(0, a.length - 1)]
}
var xkcd = {
    lang: "en",
    face: '              \\|/ ____ \\|/\n              "@\'/ ,. \\`@"\n              /_| \\__/ |_\\\n                 \\__U_/\n\n',
    cow: "             \\   ^__^\n              \\  (xx)\\_______\n                 (__)\\       )\\/\\\n                  U  ||----w |\n                     ||     ||\n\n",
    logo: "   __                             \n /'__`\\                           \n/\\ \\/\\ \\    ___   _____     ____  \n\\ \\ \\ \\ \\  / __`\\/\\ '__`\\  /',__\\ \n \\ \\ \\_\\ \\/\\ \\L\\ \\ \\ \\L\\ \\/\\__, `\\\n  \\ \\____/\\ \\____/\\ \\ ,__/\\/\\____/\n   \\/___/  \\/___/  \\ \\ \\/  \\/___/ \n                    \\ \\_\\         \n                     \\/_/         \n\n"
};

function cow(b) {
    var a = "";
    a += "     " + " _________________________________________________________________________________________________".substr(0, b.length + 3) + "\n";
    a += "     < " + b + " >\n";
    a += "     " + " -------------------------------------------------------------------------------------------------".substr(0, b.length + 3) + "\n";
    a += xkcd.cow + "\n";
    return a
}
TerminalShell.commands.sudo = function(a) {
    var c = Array.prototype.slice.call(arguments);
    c.shift();
    if (c.join(" ") == "key") {
        a.print("Okay.")
    } else {
        var b = c.shift();
        c.unshift(a);
        c.push("sudo");
        if (TerminalShell.commands.hasOwnProperty(b)) {
            if (a.god) {
                this.commands[b].apply(this, c)
            } else {
                a.god = true;
                this.commands[b].apply(this, c);
                delete a.god
            }
        } else {
            if (!b) {
                a.print("sudo is disabled.")
            } else {
                a.print("sudo: " + b + ": command not found")
            }
        }
    }
};
TerminalShell.commands.please = function(a) {
    a.god = true;
    a.sudo(true)
};
TerminalShell.commands.blacksheepwall = function(a) {
    a.map = true
};
TerminalShell.filters.push(function(b, c) {
    if (/!!/.test(c)) {
        var a = c.replace("!!", this.lastCommand);
        b.print(a);
        return a
    } else {
        return c
    }
});
TerminalShell.commands.shutdown = TerminalShell.commands.poweroff = function(a) {
    if (a.god) {
        if (a.god) {
            a.print("Broadcast message from root@fagan")
        } else {
            a.print("Broadcast message from guest@fagan")
        }
        a.print();
        a.print("The system is going down for maintenance NOW!");
        return $("#screen").fadeOut()
    } else {
        a.print("Must be root. Use magic word.")
    }
};
TerminalShell.commands.logout = TerminalShell.commands.exit = TerminalShell.commands.quit = function(a) {
    if (a.god) {
        delete a.god;
        a.sudo(false);
        return
    }
    a.print("Bye.");
    $("#prompt, #cursor").hide();
    a.promptActive = false
};
TerminalShell.commands.restart = TerminalShell.commands.reboot = function(a) {
    if (a.god) {
        TerminalShell.commands.poweroff(a).queue(function(b) {
            window.location.reload()
        })
    } else {
        a.print("Must be root. Use magic word.")
    }
};


TerminalShell.commands.display = function(b, c) {
    function a() {
        b.print($("<p>").addClass("error").text('display: unable to open image "' + c + '": No such file or directory.'));
        b.setWorking(false)
    }
    if (c) {
        c = String(c);
        num = Number(c.match(/^\d+/));
        filename = pathFilename(c);
        if (num > xkcd.latest.num) {
            b.print("Time travel mode not enabled.");
            return
        }
    } else {
        num = xkcd.last.num
    }
    b.setWorking(true);
    xkcd.get(num, function(d) {
        if (!filename || (filename == pathFilename(d.img))) {
            $("<img>").hide().load(function() {
                b.print($("<h3>").text(d.num + ": " + d.title));
                $(this).fadeIn();
                var e = $(this);
                if (d.link) {
                    e = $("<a>").attr("href", d.link).append($(this))
                }
                b.print(e);
                b.setWorking(false)
            }).attr({
                src: d.img,
                alt: d.title,
                title: d.alt
            }).addClass("comic")
        } else {
            a()
        }
    }, a)
};


function linkFile(a) {
    return {
        type: "dir",
        enter: function() {
            top.location = a
        }
    }
} // FIXME: CHANGE FILES
Filesystem = {
    "welcome.txt": {
        type: "file",
        read: function(a) {
            a.print($("<p>").html("<b>Welcome to my portfolio website. Within this space, I aim to showcase my expertise and experience in securing digital environments.</b>"))
        }
    },
    "about.txt": {
        type: "file",
        read: function(a) {
            a.print();
            $.each(["I am Fagan Afandiyev, a dedicated student enrolled at the esteemed University of South Florida, where I pursue my academic journey as a freshman. My fervent interest lies in the intricate domain of cybersecurity, particularly in red-teaming, programming, and robotics. With a steadfast commitment spanning over seven to eight years, I have diligently honed my skills in cybersecurity and programming, alongside actively participating in robotics competitions since 2017.\n\nCurrently, I proudly contribute to Cyberherd, a distinguished cybersecurity competition team rooted within the USF community, where I am continually challenged to push the boundaries of my knowledge and expertise. Additionally, serving as the Secretary at Whitehatter Computer Security Club, I further engage in fostering an environment of learning and collaboration within the cybersecurity realm.", ], function(c, b) {
                a.print($("<p>").html(b))
            })
        }
    },
    "contact.txt": {
        type: "file",
        read: function(a) {
            a.print();
            a.print($("<p>").html('<b>*</b>&nbsp;&nbsp;You can contact me at <a href="mailto:fegan.efendiyev@gmail.com">fegan.efendiyev@gmail.com</a>.'));
            a.print($("<p>").html('<b>*</b>&nbsp;&nbsp;Phone Number: <a href="tel:+813-816-4368">+813-816-4368</a>'));
            a.print($("<p>").html('<b>*</b>&nbsp;&nbsp;<a href="https://www.linkedin.com/in/fagan-afandiyev-a38698249/">LinkedIn</a>'));
            a.print($("<p>").html('<b>*</b>&nbsp;&nbsp;<a href="https://github.com/FaganAfandiyev">Github</a>'));
            a.print()
        }
    },
    ".flag.txt": {
        type: "file",
        read: function(a) {
            a.print(xkcd.face);
            a.print(randomChoice(["What a interesting place to look for, but are you sure this is the only one?"]))
        }
    },
    ".user.txt": {
        type: "file",
        read: function(a) {
            a.print(xkcd.face);
            a.print(randomChoice(["Fagan{th1s_1s_4_s3cr3t_f1ag}"]))
        }
    },
    ".root.txt": {
        type: "file",
        read: function(a) {
            a.print(xkcd.face);
            a.print(randomChoice(["Fagan{What_is_konami_code}"]))
        }
    }
};
 // TODO: Change and add links
Filesystem.resume = linkFile("/resume.pdf");
Filesystem.linkedin = linkFile("https://www.linkedin.com/in/fagan-afandiyev-a38698249/")
Filesystem.github= linkFile("https://github.com/FaganAfandiyev")
Filesystem.writeups= linkFile("writeups.fegan.me")

TerminalShell.pwd = Filesystem;
TerminalShell.commands.cd = function(a, b) {
    if (b in this.pwd) {
        if (this.pwd[b].type == "dir") {
            this.pwd[b].enter(a)
        } else {
            if (this.pwd[b].type == "file") {
                a.print("cd: " + b + ": Not a directory")
            }
        }
    } else {
        a.print("cd: " + b + ": No such file or directory")
    }
};
TerminalShell.commands.dir = TerminalShell.commands.ls = function(b, c) {
    var a = $("<ul>");
    $.each(this.pwd, function(d, e) {
        if (e.type == "dir") {
            d += "/"
        }
        if (d[0] != "." || b.map || b.god) {
            a.append($("<li>").text(d))
        }
    });
    b.print(a)
};
TerminalShell.commands.type = TerminalShell.commands.cat = function(a, b) {
    if (b in this.pwd) {
        if (this.pwd[b].type == "file") {
            this.pwd[b].read(a)
        } else {
            if (this.pwd[b].type == "dir") {
                a.print("cat: " + b + ": Is a directory")
            }
        }
    } else {
        a.print($("<p>").addClass("error").text('cat: "' + b + '": No such file or directory.'))
    }
};
TerminalShell.commands.rm = function(b, a, c) {
    window.location.href = 'https://rickroll.it/rickroll.mp4'
    // if (a && a[0] != "-") {
    //     c = a
    // }
    // if (!c) {
    //     b.print("rm: missing operand")
    // } else {
    //     if (c in this.pwd) {
    //         if (this.pwd[c].type == "file") {
    //             delete this.pwd[c]
    //         } else {
    //             if (this.pwd[c].type == "dir") {
    //                 if (/r/.test(a)) {
    //                     delete this.pwd[c]
    //                 } else {
    //                     b.print("rm: cannot remove " + c + ": Is a directory")
    //                 }
    //             }
    //         }
    //     } else {
    //         if (a == "-rf" || c == "/") {
    //             if (b.god) {
    //                 TerminalShell.commands = {}
    //             } else {
    //                 b.print("rm: cannot remove /: Permission denied")
    //             }
    //         }
    //     }
    // }
};
TerminalShell.commands.hint = TerminalShell.commands.cheat = function(a) {
    a.print(cow("Do you know konami, konami, konami and konami?"))
};
TerminalShell.commands.wget = TerminalShell.commands.curl = function(c, b) {
    if (b) {
        c.setWorking(true);
        var a = $("<div>").addClass("browser").append($("<iframe>").attr("src", b).width("100%").height(300).one("load", function() {
            c.setWorking(false)
        }));
        c.print(a);
        return a
    } else {
        c.print("Please specify a URL.")
    }
};

function oneLiner(a, c, b) {
    if (b.hasOwnProperty(c)) {
        a.print(b[c]);
        return true
    } else {
        return false
    }
}
TerminalShell.commands.sleep = function(a, b) {
    b = Number(b);
    if (!b) {
        b = 5
    }
    a.setWorking(true);
    a.print("You take a nap.");
    $("#screen").fadeOut(1000);
    window.setTimeout(function() {
        a.setWorking(false);
        $("#screen").fadeIn();
        a.print("You awake refreshed.")
    }, 1000 * b)
};
TerminalShell.commands.echo = function(a, b) {
    a.print(b)
};
TerminalShell.fallback = function(a, b) {
    oneliners = {
        pwd: "You are at my portfolio page.",
        date: new Date().toDateString(),
        time: new Date().toTimeString(),
        "fagan": xkcd.face,
        fuck: "The connection was reset",
        whoami: "Fagan Afandiyev",
        uname: navigator.platform
    };
    oneliners.emacs = "You should really use vim.";
    oneliners.vi = oneliners.vim = "You should really use emacs.";
    b = b.toLowerCase();
    if (!oneLiner(a, b, oneliners)) {
        $.get("/cnf", {
            cmd: b
        });
        return false
    }
    return true
};
var konamiCount = 0;
$(document).ready(function() {
    Terminal.promptActive = false;
    $("#screen").bind("cli-load", function(a) {
        Terminal.print(); //TODO: Change these
        Terminal.print();
        Terminal.print($("<h4>").text("Enter 'help' for a list of built-in commands."));
        Terminal.print();
        Terminal.runCommand("cat welcome.txt")
        // Terminal.runCommand("display .me.png")
    });
    $(document).konami(function() {
        function a(b) {
            b.css("position", "relative");
            return window.setInterval(function() {
                b.css({
                    top: getRandomInt(-3, 3),
                    left: getRandomInt(-3, 3)
                })
            }, 100)
        }
        if (konamiCount == 0) {
            $("#screen").css("text-transform", "uppercase")
        } else {
            if (konamiCount == 1) {
                $("#screen").css("text-shadow", "gray 0 0 2px")
            } else {
                if (konamiCount == 2) {
                    $("#screen").css("text-shadow", "orangered 0 0 10px")
                } else {
                    if (konamiCount == 3) {
                        a($("#screen"))
                    } else {
                        window["\x65\x76\x61\x6c"](Terminal["\x72\x75\x6e\x43\x6f\x6d\x6d\x61\x6e\x64"](unescape("%63%75\x72%6c%20%66%6c\x61%67%5f\u0069%73%5f%6e\x6f%74\u005f\u0068%65%72%65")))
                    }
                }
            }
        }
        $("<div>").height("100%").width("100%").css({
            background: "white",
            position: "absolute",
            top: 0,
            left: 0
        }).appendTo($("body")).show().fadeOut(1000);
        if (Terminal.buffer.substring(Terminal.buffer.length - 2) == "ba") {
            Terminal.buffer = Terminal.buffer.substring(0, Terminal.buffer.length - 2);
            Terminal.updateInputDisplay()
        }
        Terminal.god = true;
        Terminal.sudo(true);
        konamiCount += 1
    })
});
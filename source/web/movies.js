{
    class View {

        static isMobile() {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }

        static documentWidth() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // document.body.clientWidth;
        }

        static documentHeight() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // document.body.clientHeight;
        }

        static byId(id) {
            return document.getElementById(id);
        }

        static byClass(className, elem) {
            if (elem === undefined) {
                elem = document;
            }
            return elem.getElementsByClassName(className);
        }

        static byClass0(className, elem) {
            return View.byClass(className, elem)[0];
        }

        static byCss(elem, css) {
            return elem.querySelectorAll(css);
        }

        static div(html, className = ``, canEmpty = false) {
            if (html || canEmpty) {
                let s = className ? ` class="${className}"` : ``;
                return `<div${s}>${html}</div>`;
            } else {
                return ``;
            }
        }

        static link(html, onclick, dataName = ``, dataValue = ``, className = ``, title = ``, disabled = false) {
            if (!html) return ``;

            let data = ``;
            let click = ``;
            let classLink = `link`;

            if (disabled) {
                classLink += ` disabled`;
            } else {
                data = dataName ? ` data-${dataName}="${dataValue}"` : ``;
                click = ` onclick="${onclick}(event, this)"`;
            }

            className = classLink + (className ? ` ${className}` : ``);
            title = title ? ` title="${title}"` : ``;

            return `<div class="${className}"${data}${title}${click}>${html}</div>`;
        }

        static shown(elem) {
            return !elem.classList.contains(`display-none`);
        }

        static show(elem, showed) {
            if (elem) {
                if (showed === `toggle`) {
                    showed = !View.shown(elem);
                }

                if (showed) {
                    elem.classList.remove(`display-none`);
                } else {
                    elem.classList.add(`display-none`);
                }
            }
        }

        static setHTML(elem, html) {
            // while (elem.firstChild) elem.removeChild(elem.lastChild);
            // elem.insertAdjacentHTML(`afterbegin`, html);

            elem.innerHTML = html;
        }
    }


    class App {

        ROOT_INDEX = 0;

        ICON_BACK = `arrow_back`;
        ICON_FORWARD = `arrow_forward`;
        ICON_PATH = `navigate_next`;
        ICON_HOME = `home`;
        ICON_CLEAR = `clear`;
        ICON_FILTERS = `layers`; // `sort`; // `reorder`; // `arrow_drop_down`;
        ICON_BACKSPACE = `backspace`;
        ICON_LETTERS = `font_download`;
        ICON_FAVORITES = `favorite`;
        ICON_ABOUT = `info`;
        ICON_MENU = `menu`;
        ICON_THEME = `brush`; // `color_lens`;
        ICON_WARNING = `warning`;
        ICON_CMDS = `gamepad`;

        ICON_CMD = {
            play: `play_arrow`,
            pause: `pause`,
            stop: `stop`,
            skipback: `skip_previous`,
            skipforward: `skip_next`,

            mute: `volume_mute`,
            volumedown: `volume_down`,
            volumeup: `volume_up`,

            fullscreen: `fullscreen`,
            fullscreenoff: `fullscreen_exit`,
            incsize: `zoom_in`,
            decsize: `zoom_out`,
            resetsize: `youtube_searched_for`,

            jumpback: `fast_rewind`,
            jumpforward: `fast_forward`,

            prevaudio: `audiotrack`,
            nextaudio: `audiotrack`,
            prevsubtitle: `subtitles`,
            nextsubtitle: `subtitles`,

            right: `chevron_right`,
            left: `chevron_left`,

            // framestep: `framestep`,
            // framestepback: `framestep back`,

            exit: `close`
        };

        CODE_BACKSPACE = `<`;

        LETTER_EN = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`";
        LETTER_RU = "йцукенгшщзхъфывапролджэячсмитьбюё";

        LETTERS_RU = `АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ`.toLowerCase();
        LETTERS_EN = this.CODE_BACKSPACE + ` 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ`.toLowerCase();



        selfVarName = ``;
        records = [];
        errors = [];
        filters = [];
        favorites = [];
        config = [];
        theme = `blue`;
        themes = [`blue`];
        index = this.ROOT_INDEX;
        search = ``;
        currentRecords = [];
        history = [];
        historyIndex = -1;
        cookieLetters = 0;



        getCookieVrf(name, def, int = false) {
            let result = Cookie.getCookie(name);

            if (result === undefined) {
                result = def;
            }

            if (int) {
                result = +result;
            }

            return result;
        }

        getCookies() {
            this.cookieLetters = this.getCookieVrf(`letters`, this.cookieLetters, true);
            this.theme = this.getCookieVrf(`theme`, this.theme);
        }

        setCookie(name, value) {
            Cookie.setCookie(name, value, {expires: `Tue, 19 Jan 2038 03:14:07 GMT`, path: `/`});
        }



        sendRequest(method, url, body, json = true) {
            const headers = json ? {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } : {
                "Content-Type": "application/x-www-form-urlencoded"
            };

            return fetch(url + `?now=` + Date.now(), {
                method: method,
                body: json ? JSON.stringify(body) : body,
                headers: headers
            })
                .then(reaponse => {
                    if (reaponse.ok) {
                        return reaponse.json()
                    } else {
                        return reaponse.json().then(
                            error => {
                                const e = new Error(`ошибка передачи данных`);
                                e.data = error;
                                throw e;
                            })
                    }
                })
            // .catch(error => console.log(`error`, error));
        }


        drawErrors() {
            let html = ``;
            this.errors.forEach(error => html += View.div(error, `error`));
            let eErrors = View.byId(`errors`);

            View.setHTML(eErrors,
                this.drawGroup([
                        View.div(html, `error`),
                        View.link(this.ICON_CLEAR, this.onPrepare(`clickErrorClose`), ``, ``, `field icon icon-small icon-error-close`, `скрыть ошибки`)
                    ],
                    ``, `group-nowrap group-top`));

            View.show(eErrors, this.errors.length > 0);
        }

        drawGroup(items, classNameItem, classNameGroup) {
            if (classNameItem !== false) classNameItem = classNameItem ? ` ${classNameItem}` : ``;
            classNameGroup = classNameGroup ? ` ${classNameGroup}` : ``;

            let html = ``;
            items.forEach(item => {
                if (classNameItem === false) {
                    html += item;
                } else {
                    html += View.div(item, `field` + classNameItem);
                }
            });

            if (html) {
                html = View.div(html, `group` + classNameGroup);
            }

            return html;
        }

        drawWords(funcOnClick, words, classNameGroup, classNameField = `field`, displayNone = `display-none`) {
            let group = [];
            words.forEach(word => group.push(
                View.link(word, this.onPrepare(funcOnClick), `word`, word, classNameField + ` word`, `добавить в поиск`)
            ));
            return this.drawGroup(group, false, displayNone + ` words ` + classNameGroup);
        }

        setCurrentWord(words, current) {
            words = View.byClass(`word`, View.byClass0(words));
            for (let i = 0; i < words.length; i++) {
                if (words[i].innerText === current) {
                    words[i].classList.add(`word-current`);
                } else {
                    words[i].classList.remove(`word-current`);
                }
            }
        }

        drawRecords(next = false) {
            let html = ``;

            let i = next ? this.config.maxDrawRecords : 0;
            let end = next ? this.currentRecords.length : (this.currentRecords.length <= this.config.maxDrawRecords ? this.currentRecords.length : this.config.maxDrawRecords);

            if (this.currentRecords.length > 0) {
                this.sortRecords(this.currentRecords);
                let odd = `odd`;

                while (i < end) {
                    odd = (odd === `odd`) ? `nodd` : `odd`;

                    let record = this.currentRecords[i];
                    let path = ``;

                    if (this.search) {
                        let indexPath = [];
                        for (let i = this.records[this.index].indexPath.length + 1; i < record.indexPath.length; i++) {
                            indexPath.push(record.indexPath[i]);
                        }

                        if (indexPath.length > 0) {
                            let paths = this.prepareIndexPath(indexPath, indexPath[0]);
                            path = this.drawGroup(paths, false, `line line-path ${odd}`);
                        }
                    }

                    let left = View.div(record.russianName + (record.russianNameAdd ? View.div(record.russianNameAdd, 'russianNameAdd') : '') + (record.isDir ? View.div(this.ICON_PATH, `icon icon-path icon-dir`) : ``), `field russianName`);

                    left += View.div(record.year, `field year`);
                    left += View.div(record.originalName, `field originalName`);
                    left = View.div(left, `group`);

                    let right = this.drawGroup(record.filter, `filter`, `group-right`);

                    html += path;
                    html += View.link(left + right, this.onPrepare(`clickIndex`), `index`, record.index, `line ${odd} ` + (this.search ? ` search` : ``));

                    i++;
                }
                html = View.div(html, `list`);
            }

            if (!next && (this.currentRecords.length > this.config.maxDrawRecords)) {
                html += View.div(
                    View.div(`отображено ${this.config.maxDrawRecords} из ${this.currentRecords.length} записей`, `max-records-info`) +
                    View.link(`показать все найденные записи…`, this.onPrepare(`clickDrawAll`), ``, ``, `field max-records-link`),
                    `max-records`);
            }

            return html ? html : (View.div(this.search ? `соответствия поиску не найдены` : `пустой список`, `field russianName`));
        }

        drawPathIcon() {
            return View.div(this.ICON_PATH, `icon icon-path icon-small`);
        }

        prepareIndexPath(indexPath, noDrawIndex = 0) {
            let paths = [];

            indexPath.forEach(index => {
                if (index !== noDrawIndex) {
                    paths.push(this.drawPathIcon());
                }
                paths.push(View.link(
                    (index === 0) ? this.ICON_HOME : this.records[index].russianName,
                    this.onPrepare(`clickIndex`),
                    `index`,
                    index,
                    `field` + ((index === 0) ? ` icon icon-home` : ``),
                    ((index === 0) ? `домой` : `перейти к папке`),
                    !this.search && (index === this.index)
                ));
            });

            return paths;
        }

        drawNavigationPath() {
            let paths = [
                View.link(this.ICON_BACK, this.onPrepare(`clickBack`), ``, ``, `field icon icon-back`, `назад`, this.historyIndex === 0),
                View.link(this.ICON_FORWARD, this.onPrepare(`clickForward`), ``, ``, `field icon icon-forward`, `вперед`, this.historyIndex === this.history.length - 1)
            ];

            let indexPath = this.records[this.index].indexPath.slice(0);
            indexPath.push(this.index);

            this.prepareIndexPath(indexPath).forEach(path => paths.push(path));

            if (this.search) {
                paths.push(this.drawPathIcon());
                paths.push(View.div(`поиск`, `field`));
            }

            paths.push(View.div(View.div(`${this.currentRecords.length}`, `info info1`) + View.div(`${this.records.length - 1}`, `info info2`), `field flex-end`));

            return this.drawGroup(paths, false);
        }

        draw() {
            this.currentRecords = [];

            let search = this.search.split(` `); // this.prepareSearch();
            let record = this.records[this.index];

            if (record.firstChild) {
                let lastIndex = this.search ? record.lastGrandchild : record.lastChild;
//                for (let i = record.firstChild; (i <= lastIndex) && (this.currentRecords.length < this.config.maxDrawRecords); i++) {
                for (let i = record.firstChild; i <= lastIndex; i++) {
                    if (!this.search || this.verifySearch(search, this.records[i])) {
                        this.currentRecords.push(this.records[i]);
                    }
                }
            }

            View.setHTML(View.byId(`main`), this.drawRecords());
            View.setHTML(View.byId(`navigation`), this.drawNavigationPath());

            window.scrollTo(0, 0);
        }

        drawCmd(name) {
            let name_s = this.delSpaces(name);

            return View.link(
                View.div(this.ICON_CMD[name_s], `icon icon-cmd icon-` + name_s) + `<br>` + name,
                this.onPrepare(`clickCMD`), `cmd`, name, `field cmd cmd-` + name_s, name
            );
        }



        clickBackForward(event, dIndex) {
            this.historyUpdate();

            this.historyIndex = this.historyIndex + dIndex;
            let history = this.history[this.historyIndex];

            this.index = history.index;
            if (history.search) {
                let input = this.elemInput();
                input.value = ``;
                this.toInput(event, input, history.search, false, false);
                input.selectionStart = history.selectionStart;
                input.selectionEnd = history.selectionEnd;
            } else {
                this.clearSearch();
                this.draw();
            }
        }

        clickBack(event, elem) {
            if (this.historyIndex > 0) {
                this.clickBackForward(event, -1);
            }
        }

        clickForward(event, elem) {
            if (this.historyIndex < this.history.length - 1) {
                this.clickBackForward(event, 1);
            }
        }

        clickIndex(event, elem) {
            let index = this.elemIndex(elem);
            let record = this.records[index];
            if (record.isDir) {
                this.historyUpdate();
                this.index = index;
                this.clearSearch();
                this.historyAdd();
                this.draw();
            } else {
                this.runMovie(record);
            }
        }

        clickWords(event, elem) {
            let eName = this.elemData(elem, `words`);
            let shown = View.shown(View.byClass0(eName));
            this.hideAllWords();
            this.showWords(eName, !shown);
        }

        clickWord(event, elem) {
            if (this.menuShowed()) {
                this.clickMenuClose(event);
            }
            this.toInput(event, this.elemInput(), this.elemData(elem, `word`), true, false);
            this.hideAllWords();
        }

        clickTheme(event, elem) {
            this.theme = this.elemData(elem, `word`);
            this.setCookie(`theme`, this.theme);
            this.setCurrentWord(`mehu-themes`, this.theme);
            View.show(View.byClass0(`theme-info`), true);
        }

        clickErrorClose(event, elem) {
            View.show(View.byId(`errors`), false);
        }

        clickLetter(event, elem) {
            this.toInput(event, this.elemInput(), this.elemData(elem, `letter`), false);
        }

        clickLetters(event, elem) {
            this.cookieLetters = this.cookieLetters ? 0 : 1;
            this.setCookie(`letters`, this.cookieLetters);
            this.setLetters();
        }

        clickAbout() {
            this.clickMenu();
        }

        clickMenu() {
            this.elemHTML().classList.add(`overflow-y-hidden`);
            let menu = this.elemMenu();
            menu.classList.remove(`display-none`);
            setTimeout(() => {
                menu.classList.remove(`menu-hide`);
            }, 1)
        }

        clickMenuClose() {
            let menu = this.elemMenu();
            menu.classList.add(`menu-hide`);
            setTimeout(() => {
                menu.classList.add(`display-none`);
                this.elemHTML().classList.remove(`overflow-y-hidden`);
            }, 150);
        }

        clickMenuCaption(event, elem) {
            let menuContents = View.byClass(`menu-content`);
            for (let i = 0; i < menuContents.length; i++) {
                View.show(menuContents[i], false);
            }

            View.show(View.byClass0(this.elemData(elem, `caption`)), `toggle`);
        }

        clickDrawAll() {
            let e = View.byClass0(`max-records-link`);
            View.setHTML(e, View.link(`подождите…`, ``, ``, ``, ``, ``, true));
            e.classList.remove(`link`);
            setTimeout(() => {
                View.setHTML(View.byClass0(`max-records`), this.drawRecords(true));
            }, 1);
        }

        clickCMD(event, elem) {
            let body = {
                // cmd: this.config.commands[this.elemData(elem, `cmd`)]
                cmd: this.elemData(elem, `cmd`)
            };

            this.sendRequest(`POST`, `/api/cmd.php`, body, true)
                .then(data => {
                    console.log(`пульт: ` + data.cmd + ` - ` + (data.result ? `успешно` : `ошибка`));
                    let e = View.byClass0(`cmd-` + this.delSpaces(data.cmd));
                    if (e) {
                        let cls = `cmd-result-` + data.result;
                        e.classList.add(cls);
                        setTimeout(() => e.classList.remove(cls), 250);
                    }
                });
        }



        hideAllWords() {
            this.showWords(`filters`, false);
            this.showWords(`favorites`, false);
        }

        historyAdd() {
            this.historyIndex++;
            this.history.splice(this.historyIndex);
            this.historyUpdate();
        }

        historyUpdate() {
            let input = this.elemInput();
            this.history[this.historyIndex] = {
                index: this.index,
                search: this.search,
                selectionStart: input.selectionStart,
                selectionEnd: input.selectionEnd
            };
        }

        showWords(className, param) {
            View.show(View.byClass0(className), param);
        }

        ru_en_invert(str) {
            let result = ``;

            for (let i = 0; i < str.length; i++) {
                let letter = str[i];
                let p = this.LETTER_EN.indexOf(letter);
                if (p >= 0) {
                    letter = this.LETTER_RU[p];
                } else {
                    let p = this.LETTER_RU.indexOf(letter);
                    if (p >= 0) {
                        letter = this.LETTER_EN[p];
                    }
                }
                result += letter;
            }

            return result;
        }

        elemData(elem, name) {
            return elem.dataset[name];
        }

        elemIndex(elem) {
            return +this.elemData(elem, `index`);
        }

        sign(a, b) {
            return a === b ? 0 : (a < b ? -1 : 1);
        }

        signStr(a, b) {
            let aL = a.toLowerCase();
            let bL = b.toLowerCase();
            return this.sign(aL, bL);
        }

        sortRecords(records) {
            records.sort((a, b) => {
                let res = this.signStr(a.russianName, b.russianName);
                if (res === 0) {
                    res = this.sign(a.year, b.year);
                    if (res === 0) {
                        res = this.signStr(a.originalName, b.originalName);
                    }
                }
                return res;
            });
        }

        onPrepare(onclick) {
            return `${this.selfVarName}.${onclick}`;
        }

        verifySearch(search, record) {
            for (let i = 0; i < search.length; i++) {
                if (!record.findName.includes(search[i]) && !record.findNameInvert.includes(search[i])) {
                    return false;
                }
            }

            return true;
        }

        clearSearch() {
            this.search = ``;
            this.elemInput().value = ``;

            let e = View.byClass0(`clear`);
            e.classList.add(`disabled`);
            e.onclick = null;

            this.hideAllWords();
        }

        delSpaces(str) {
            return str.replace(/\s+/g, ``).trim();
        }

        delReSpaces(str) {
            return str.replace(/\s+/g, ` `).trim();
        }

        elemHTML() {
            return View.byId(`html`);
        }

        elemInput() {
            return View.byId(`input`);
        }

        elemMenu() {
            return View.byId(`menu`);
        }

        menuShowed() {
            return !this.elemMenu().classList.contains(`menu-hide`);
        }

        input(event, input) {
            this.search = input.value.toLowerCase().replace(/ё/g, `е`);
            this.search = this.delReSpaces(this.search);

            if (!this.search) {
                this.clearSearch();
            } else {
                let e = View.byClass0(`clear`);
                e.classList.remove(`disabled`);
                e.onclick = () => {
                    this.clearSearch();
                    this.draw();
                }
            }

            this.draw();
        }

        toInput(event, input, str, spaces = false, focus = true) {
            let value = input.value;
            let start = input.selectionStart;
            let end = input.selectionEnd;
            let len = value.length;
            let backspace = str === this.CODE_BACKSPACE;

            if (backspace) {
                str = ``;
                if ((start === end) && (start > 0)) {
                    start--;
                }
            } else {
                if (spaces) {
                    if ((start > 0) && (value.substr(start - 1, 1) !== ` `)) {
                        str = ` ` + str;
                    }
                    if ((end < len) && (value.substr(end, 1) !== ` `)) {
                        str = str + ` `;
                    }
                }
            }

            let lenStr = str.length;

            input.value = value.substr(0, start) + str + value.substr(end);

            setTimeout(() => {
                input.selectionStart = start + lenStr;
                input.selectionEnd = start + lenStr;

                if (focus) {
                    input.focus();
                }

                this.input(event, input);
            }, 1);
        }

        keyPress(event, input) {
            if (!this.menuShowed() && (document.activeElement !== input) && (event.key.toLowerCase() !== `enter`)) {
                this.toInput(event, input, event.key);
            }
        }

        keyDown(event) {
            if (this.menuShowed() && (event.which === 27)) {
                this.clickMenuClose(event);
            }
        }

        getTextWidth(text, font) {
            let canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement(`canvas`));
            let context = canvas.getContext(`2d`);
            context.font = font;
            let metrics = context.measureText(text);
            return metrics.width;
        }

        setSizeLetters(letters, classLetters, k) {
            let l = View.byClass0(classLetters);
            let font = window.getComputedStyle(l).fontFamily;
            let width = l.clientWidth;
            let size = 7;

            do {
                size++;
            } while (this.getTextWidth(letters, `${size}px ${font}`) < width - letters.length * (size / 2 + 2) - k * size);

            l.style.fontSize = `${size - 1}px`;
        }

        onResize() {
            this.setLetters();
        }

        setLetters() {
            let eLetters = View.byId(`letters`);

            if (!this.cookieLetters) {
                View.show(eLetters, false);
                return;
            }

            if (!eLetters.innerText) {

                let drawLetters = (letters, classGroup) => {
                    let a = [];
                    for (let i = 0; i < letters.length; i++) {
                        let ch = letters[i];
                        let title = ``;
                        let cls = ``;
                        switch (ch) {
                            case ` `: {
                                ch = `&nbsp`;
                                break;
                            }
                            case `<`: {
                                ch = this.ICON_BACKSPACE;
                                title = `backspace`;
                                cls = ` icon icon-backspace`;
                                break;
                            }
                        }
                        a.push(View.link(ch, this.onPrepare(`clickLetter`), `letter`, letters[i], `field letter` + cls, title));
                    }
                    return this.drawGroup(a, false, classGroup);
                };

                View.setHTML(eLetters,
                    drawLetters(this.LETTERS_RU, `letters-ru`) +
                    drawLetters(this.LETTERS_EN, `letters-en`));
            }

            View.show(eLetters, true);

            this.setSizeLetters(this.LETTERS_RU, `letters-ru`, 1);
            this.setSizeLetters(this.LETTERS_EN, `letters-en`, 2);
        }

        setBody() {
            let html = this.drawGroup([
                `<input id="input" class="field" spellcheck="false"/>`,
                View.link(this.ICON_CLEAR, ``, ``, ``, `field clear icon icon-clear`, `очистить поиск`, !this.search),
                View.link(this.ICON_FAVORITES, this.onPrepare(`clickWords`), `words`, `favorites`, `field icon icon-favorites`, `добавить любимое в поиск...`, this.favorites.length === 0),
                View.link(this.ICON_FILTERS, this.onPrepare(`clickWords`), `words`, `filters`, `field icon icon-filters`, `добавить фильт в поиск...`, this.filters.length === 0),
                View.link(this.ICON_LETTERS, this.onPrepare(`clickLetters`), ``, ``, `field icon icon-letters flex-end`, `показать/скрыть буквы`),
//                View.link(this.ICON_ABOUT, this.onPrepare(`clickAbout`), ``, ``, `field icon icon-about`, `о программе...`),
                View.link(this.ICON_MENU, this.onPrepare(`clickMenu`), ``, ``, `field icon icon-menu`, `меню`)
            ], false, `group-nowrap`);

            html += this.drawWords(`clickWord`, this.favorites, `favorites`);
            html += this.drawWords(`clickWord`, this.filters, `filters`);

            View.setHTML(View.byId(`search`), html);

            let e = this.elemInput();
            e.addEventListener(`input`, event => this.input(event, e));
            document.addEventListener(`keypress`, event => this.keyPress(event, e));
            document.addEventListener(`keydown`, event => this.keyDown(event));


            html = this.drawGroup([
                View.link(this.ICON_CLEAR, this.onPrepare(`clickMenuClose`), ``, ``, `field icon icon-menu-close flex-end`, `закрыть меню`)
            ], false, `group-nowrap menu-top`);



            html += View.link(View.div(this.ICON_CMDS, `icon icon-in-menu`) + `Пульт`, this.onPrepare(`clickMenuCaption`), `caption`, `menu-cmds`, `menu-caption-cmds menu-caption`);
            html += `<br>`;

            let cmds = this.drawGroup([
                this.drawCmd(`fullscreen`),
                this.drawCmd(`reset size`),
                this.drawCmd(`dec size`),
                this.drawCmd(`inc size`)
            ], false, `group-center group-justify-content-center`);

            cmds += this.drawGroup([
                this.drawCmd(`prev subtitle`),
                this.drawCmd(`next subtitle`),
                this.drawCmd(`prev audio`),
                this.drawCmd(`next audio`)
            ], false, `group-center group-justify-content-center`);

            cmds += this.drawGroup([
                this.drawCmd(`skip back`),
                this.drawCmd(`skip forward`),
                this.drawCmd(`jump back`),
                this.drawCmd(`jump forward`)
            ], false, `group-center group-justify-content-center`);

            cmds += this.drawGroup([
                this.drawCmd(`exit`),
                this.drawCmd(`stop`),
                this.drawCmd(`play`),
                this.drawCmd(`pause`)
            ], false, `group-center group-justify-content-center`);

            cmds += this.drawGroup([
                this.drawCmd(`mute`),
                this.drawCmd(`volume down`),
                this.drawCmd(`volume up`)
            ], false, `group-center group-justify-content-center`);

            html += View.div(cmds, `menu-content menu-cmds display-none`);



            html += View.link(View.div(this.ICON_ABOUT, `icon icon-in-menu`) + `О программе`, this.onPrepare(`clickMenuCaption`), `caption`, `about`, `menu-caption-about menu-caption`);
            html += `<br>`;
            let logo = View.div(``, `about-logo`, true);
            let about = View.div(`Запускатель фильмов`, `about-title`);
            about += View.div(`web-версия, 2.10`, `about-version`);
            about += View.div(`© ich`, `about-ich`);
            about += View.div(`2020 - 2021`, `about-year`);
            about += View.link(`<a href="mailto:ich@ich.su">ich@ich.su</a>`, ``, ``, ``, `link about-email field`);
            about += View.div(`Программа посвящается лени, плохой памяти, неудержимому росту дискового пространства и минимализму в интерфейсе.`, `about-info about-info-begin`);
            about += View.div(`Windows-версии развивались с 2010 по 2017 год.`, `about-info`);

            html += this.drawGroup([logo, about], `margin-space`, `group-top group-nowrap menu-content about display-none`);



            html += View.link(View.div(app.ICON_THEME, `icon icon-in-menu`) + `Цветовая тема`, this.onPrepare(`clickMenuCaption`), `caption`, `menu-themes`, `menu-caption-themes menu-caption`, ``, this.themes.length === 0);
            html += `<br>`;

            html += this.drawWords(`clickTheme`, this.themes, `menu-content menu-themes group-column`, `field flex-end`);
            html += View.div(`Цветовая тема будет применена при следующем запуске или при перезагрузке страницы!`, `theme-info display-none`);
            setTimeout(() => this.setCurrentWord(`menu-themes`, this.theme), 1);



            html += View.link(View.div(this.ICON_FAVORITES, `icon icon-in-menu`) + `Избранное`, this.onPrepare(`clickMenuCaption`), `caption`, `menu-favorites`, `menu-caption-favorites menu-caption`, ``, this.favorites.length === 0);
            html += `<br>`;
            html += this.drawWords(`clickWord`, this.favorites, `menu-content menu-favorites group-column`, `field flex-end`);



            html += View.link(View.div(this.ICON_FILTERS, `icon icon-in-menu`) + `Фильтры`, this.onPrepare(`clickMenuCaption`), `caption`, `menu-filters`, `menu-caption-filters menu-caption`, ``, this.filters.length === 0);
            html += `<br>`;
            html += this.drawWords(`clickWord`, this.filters, `menu-content menu-filters group-column`, `field flex-end`);

            View.setHTML(this.elemMenu(), html);
        }

        runMovie(record) {
            const body = {
                path: record.path,
                fileName: record.fileName
            };

            this.sendRequest(`POST`, `/api/run.php`, body)
                .then(data => console.log(`запуск: ${data}`));
        }

        captureHistory() {
            let historyState = {movies: `movies`};
            if (!(history.state && (history.state.movies && (history.state.movies === historyState.movies)))) {
                history.pushState(historyState, null, ``);
            }
            window.addEventListener(`popstate`, () => {
                history.pushState(historyState, null, ``);
                if (this.menuShowed()) {
                    this.clickMenuClose();
                } else {
                    this.clickBack();
                }
            });
        }

        prepareRecords() {
            this.records.forEach(record => {
                record.findName = ``;

                record.filter.forEach(filt => {
                    record.findName += ` ${filt}`;

                    if (!this.filters.includes(filt)) {
                        this.filters.push(filt);
                    }
                });

                record.findName =
                    record.russianName + ` ` +
                    (record.originalName ? record.originalName + ` ` : ``) +
                    (record.year ? record.year + ` ` : ``) +
                    record.findName.trim();

                record.findName = record.findName.toLowerCase();

                record.findNameInvert = this.ru_en_invert(record.findName);
            });

            this.filters.sort();
        }

        setData(data) {
            if (data) {
                for (let key in data) {
                    if (data[key]) {
                        this[key] = data[key];
                    }
                }
            }
        }

        errorConsole() {
            window.addEventListener(`unhandledrejection`, event => {
                console.log(`ошибка: ${event.reason}`); // event.promise
            });
        }

        run(varName, url) {
            this.selfVarName = varName;

            if (!View.isMobile()) {
                this.elemHTML().classList.add(`myscroll`);
                this.elemMenu().classList.add(`myscroll`);
            }

            this.captureHistory();
            this.errorConsole();
            this.getCookies();

            let m = url.toString().match(/\?(.+)/);
            if ((m === null) || (m.length > 1)) {
                this.sendRequest(`POST`, `/api/get.php`, {filePaths: m === null ? `` : m[1]})
                    .then(data => {
                        this.setData(data);
                        this.prepareRecords();
                        this.setBody();
                        this.historyAdd();
                        this.drawErrors();
                        this.draw();
                    })
            }

            setTimeout(() => {
                this.onResize();
            }, 1);
        }
    }

    window.app = new App();
    window.onload = () => app.run(`window.app`, window.location.toString());
    window.onresize = () => app.onResize();
}

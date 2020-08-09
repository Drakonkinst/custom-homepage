// constants
const VERSION = "1.4";
const AUTHOR = "Drakonkinst";
const TIME_TICK = 500;
const KEY_ENTER = 13;
const KEY_TAB = 9;
const KEY_S = 83;
const ONE_DAY = 60 * 60 * 24 * 1000;
const BACKGROUNDS_PATH = "backgrounds/";
const GREETING_ENDINGS = [ ".", "!" ];
const SHOW_HIDE_DURATION = 300;
const WEBSITE_PREFIX = "https://";
const COMMON_WEBSITE_SUFFIXES = ["com", "org", "net", "us", "co", "gov", "edu", "int", "mil", "am" ];
const TOOLTIP_EFFECT = {
    show: {
        effect: "none",
        delay: 0
    },
    hide: {
        effect: "none",
        delay: 0
    }
}

// JSON keys for saving
const SETTINGS_KEY = "settings";
const CURRENT_QUOTE_KEY = "currentQuoteId";
const LAST_REFRESH_KEY = "lastRefresh";
const TODO_LIST_KEY = "todoList";
const TODO_STAY_OPEN_KEY = "isTodoListOpen";
const CURRENT_BACKGROUND_KEY = "currentBackground";
const NOTES_KEY = "notesList";

// default config - in case UserConfig doesn't exist for some reason
var config = {
    name: "",
    birthMonth: 0,
    birthDay: 0
}

// Are you hacking me, Master Jedi?
var devSettings = {
    debug: true
};

var currentBackground;
var currentQuote;       // id of current quote in quotebook
var todoList = [];

// This is a pretty fun settings pattern. In the future I would probably
// write a method to grab values from it cleanly without needing to use
// all these properties (i.e. getSetting("general.show.search-bar-visible") -> true)
var settings = {
    "general": {
        "title": "General",
        "description": "Customize your dashboard",
        "onload": function() {
            
        },
        "show": {
            "search-bar-visible": {
                "display": "Search Bar",
                "toggle": true,
                "click": function() {
                    toggleHide("#search-container");
                }
            },
            "quotes-visible": {
                "display": "Quotes",
                "toggle": true,
                "click": function() {
                    toggleHide("#quote");
                }
            },
            "links-visible": {
                "display": "Links",
                "toggle": true,
                "hidden": true,
                "click": function() {
                    // TODO
                }
            },
            "greeting-visible": {
                "display": "Greeting",
                "toggle": true,
                "click": function() {
                    toggleHide("#greeting");
                }
            },
            "name-visible": {
                "display": "Name",
                "description": "Let the site greet you by name",
                "toggle": false,
                "click": function() {
                    if(!config.name) {
                        return;
                    }
                    if(getSetting("general.show.name-visible")) {
                        $(".greeting-name").html(", " + config.name);
                        $(".greeting-name").animate({
                            "opacity": 1.0
                        }, SHOW_HIDE_DURATION)
                    } else {
                        $(".greeting-name").animate({
                            "opacity": 0.0
                        }, SHOW_HIDE_DURATION, function() {
                            $(".greeting-name").empty();
                        })
                    }
                }
            },
            "todo-visible": {
                "display": "Todo",
                "toggle": true,
                "click": function() {
                    if($("#todo-toggle").hasClass("active")) {
                        $("#todo-toggle").click();
                    }
                    toggleHide("#todo-toggle", true);
                }
            },
            "notes-visible": {
                "display": "Notes",
                "toggle": true,
                "click": function() {
                    if($("#notes-toggle").hasClass("active")) {
                        $("#notes-toggle").click();
                    }
                    toggleHide("#notes-toggle", true);
                }
            },
            "countdowns-visible": {
                "display": "Countdowns",
                "toggle": true,
                "hidden": true,
                "click": function() {
                    // TODO
                }
            },
            "clock-visible": {
                "display": "Clock",
                "toggle": true,
                "click": function() {
                    toggleHide("#clock");
                }
            },
            "alt-clock-visible": {
                "display": "Alternate Clock",
                "toggle": false,
                "hidden": true,
                "description": "Keep track of time anywhere on Earth",
                "click": function() {
                    // TODO
                }
            }
        },
        "options": {
            "12-hour-clock": {
                "display": "Clock Format",
                "choices": ["12 hour", "24 hour"],
                "choice": 0,
                "click": function() {
                    updateTime(true);
                }
            },
            "focus-search": {
                "display": "Autofocus Search",
                "description": "Focus the search bar automatically when opening new tab",
                "toggle": true
            },
            "wallpaper-rotation": {
                "display": "Rotating Wallpaper",
                "description": "Automatically change wallpaper daily at 4:00 AM",
                "toggle": true
            },
            "quote-rotation": {
                "display": "Rotating Quote",
                "description": "Automatically change quote daily at 4:00 AM",
                "toggle": true
            }
        }
    },
    "backgrounds": {
        "title": "Backgrounds",
        "description": "See something new each day",
        "onload": function() {
            var refreshIcon = $("<i>").addClass("fa fa-refresh fa-3x large-refresh");
            refreshIcon.click(function() {
                refreshCurrentWallpaper();
            });
            refreshIcon.appendTo("#settings-view");
            
            var photoGallery = $("<div>").addClass("photo-gallery").appendTo("#settings-view");
            for(var i = 0; i < config.backgrounds.length; i++) {
                let imageName = config.backgrounds[i];
                var image = $("<img src='" + BACKGROUNDS_PATH + imageName + "'>").addClass("photo").click(function() {
                    if(imageName == currentBackground) {
                        return;
                    }
                    $(this).siblings(".photo").removeClass("active");
                    $(this).addClass("active");
                    changeWallpaperTo(imageName);
                }).appendTo(photoGallery);
                if(config.backgrounds[i] == currentBackground) {
                    image.addClass("active");
                }
            }
        },
        "display": {
            "background-darken": {
                "display": "Darken Background",
                "description": "Darken background slightly to enhance text visibility",
                "choices": ["0%", "10%", "20%"],
                "choice": 1,
                "click": function() {
                    changeWallpaperTo(currentBackground);
                }
            },
        }
    },
    "quotes": {
        "title": "Quotes",
        "description": "A daily reminder for inspiration and growth",
        "onload": function() {
            var refreshIcon = $("<i>").addClass("fa fa-refresh fa-3x large-refresh");
            refreshIcon.click(function() {
                refreshCurrentQuote();
            });
            refreshIcon.appendTo("#settings-view");

            var quoteCollection = $("<div>").addClass("quote-collection");
            var header = $("<div>").addClass("quote-collection-header").appendTo(quoteCollection);
            var addQuoteForm = $("<form>").addClass("add-quote-form").appendTo(quoteCollection);
            var quoteInput = $("<input type='text' placeholder='Quote*'>").addClass("add-quote-input quote").appendTo(addQuoteForm);
            var authorInput = $("<input type='text' placeholder='Author*'>").addClass("add-quote-input author").appendTo(addQuoteForm);
            var sourceInput = $("<input type='text' placeholder='Source'>").addClass("add-quote-input source").appendTo(addQuoteForm);
            quoteInput.add(authorInput).add(sourceInput).on("input", function() {
                if(quoteInput.val().trim().length > 0 && authorInput.val().trim().length > 0) {
                    $(".add-quote-submit").removeClass("disabled");
                } else {
                    $(".add-quote-submit").addClass("disabled");
                }
            });

            var addQuoteControls = $("<div>").addClass("add-quote-buttons").appendTo(addQuoteForm);
            $("<button type='button'>").addClass("add-quote-submit disabled").text("Submit").click(function() {
                var quote = {
                    "text": $(".add-quote-input.quote").val().trim(),
                    "author": $(".add-quote-input.author").val().trim()
                };
                var source = $(".add-quote-input.source").val().trim();
                if(source.length) {
                    quote.source = source;
                }
                addCustomQuote(quote);
                $(".add-quote-input").val("");
            }).appendTo(addQuoteControls);
            $("<button type='button'>").addClass("add-quote-cancel").text("Cancel").click(function() {
                toggleAddQuoteForm();
            }).appendTo(addQuoteControls);

            var myQuoteList = $("<ul>").addClass("quote-list").appendTo(quoteCollection);
            $("<span>").addClass("quote-collection-option custom").text("My Quotes").click(function() {
                $(this).siblings(".quote-collection-option").removeClass("active");
                $(this).addClass("active");
                viewCustomQuotes(myQuoteList);
            }).appendTo(header);
            $("<span>").addClass("quote-collection-option favorites").text("Favorites").click(function() {
                $(this).siblings(".quote-collection-option").removeClass("active");
                $(this).addClass("active");
                viewFavoriteQuotes(myQuoteList);
            }).appendTo(header);
            $("<span>").addClass("quote-collection-option history active").text("History").click(function() {
                $(this).siblings(".quote-collection-option").removeClass("active");
                $(this).addClass("active");
                viewHistoryQuotes(myQuoteList);
            }).appendTo(header);
            $("<button type='button'>").addClass("add-custom-quote").text("+ Add Quote").click(function() {
                toggleAddQuoteForm();
            }).appendTo(header);
            viewHistoryQuotes(myQuoteList);

            quoteCollection.appendTo("#settings-view");
        },
        "feeds": {
            "default-quote-visibility": {
                "display": "Developer's Quotes",
                "description": "See handpicked quotes from the developer",
                "toggle": true
            },
            "special-quotes-visibility": {
                "hidden": true
            },
            "custom-quote-visibility": {
                "display": "My Quotes",
                "description": "Add your own quotes",
                "toggle": false
            },
            "favorite-quote-visibility": {
                "display": "Favorites",
                "description": "See your favorited quotes from history",
                "toggle": true
            }
        }
    },
    "todo": {
        "title": "Todo",
        "description": "Break your goals into manageable pieces",
        "onload": function() {

        },
        "settings": {
            "todo-stay-open": {
                "display": "Stay Open",
                "description": "Keep todo list opened on new tabs",
                "toggle": false
            },
            "move-finished-todos": {
                "display": "Move Finished Items",
                "description": "Checking an item automatically moves it to the bottom",
                "toggle": true
            }
        }
    },
    "notes": {
        "title": "Notes",
        "description": "Keep track of deadlines, thoughts, and experiences",
        "onload": function() {

        },
        "settings": {
            "update-order": {
                "display": "Dynamic Order",
                "description": "Move edited notes to top",
                "toggle": true
            },
            "spellcheck": {
                "display": "Spellcheck",
                "toggle": true
            },
            "easy-reveal": {
                "display": "Easy Reveal",
                "description": "Click anywhere on a hidden note to reveal it",
                "toggle": true
            },
            "show-date-created": {
                "display": "Show Date Created",
                "description": "See when the note was created",
                "toggle": true
            },
            "confirm-delete": {
                "display": "Confirm Delete",
                "description": "Ask to confirm when deleting a note",
                "toggle": true
            }
            
            
        },
        "export": {
            "export-capitalize": {
                "display": "Capitalize Title",
                "description": "Keep title capitalization in the file name",
                "toggle": true
            },
            "export-spacing": {
                "display": "Title Spacing",
                "description": "Replace space characters in the file name",
                "choices": [ "Spaces", "Dashes", "Underscores"],
                "choice": 0
            },
            "export-save-shortcut": {
                "display": "Export Shortcut",
                "description": "Use Ctrl-S to export text",
                "toggle": false
            }
        }
    }
};

function getSetting(path) {
    var nodes = path.split(".");
    if(nodes.length < 3 || nodes.length > 4) {
        debug("Tried to get bad setting: Invalid length " + nodes.length);
        return;
    }
    
    var list = nodes[1];
    var option = nodes[2];

    var category = nodes[0];
    if(settings.hasOwnProperty(category)) {
        var setting = settings[category];
        var list = nodes[1];

        if(setting.hasOwnProperty(list)) {
            setting = setting[list];
            var option = nodes[2];

            if(setting.hasOwnProperty(option)) {
                setting = setting[option];
                if(nodes.length > 3) {
                    // 4 options, specified property
                    var property = nodes[3];

                    if(property == "choiceStr"
                    && setting.hasOwnProperty("choice")
                    && setting.hasOwnProperty("choices")) {
                        // shortcut to get choice from choices array
                        return setting.choices[setting.choice];
                    }

                    if(setting.hasOwnProperty(property)) {
                        // get specific property from array
                        return setting[property];
                    }
                    debug("Tried to get bad setting: Invalid property " + property);
                    return null;
                } else {
                    // only 3 options, assume default property
                    if(setting.hasOwnProperty("toggle")) {
                        return setting.toggle;
                    }

                    if(setting.hasOwnProperty("choice")) {
                        return setting.choice;
                    }
                }
            }
            debug("Tried to get bad setting: Invalid option " + option);
            return null;
        }
        debug("Tried to get bad setting: Invalid list " + list);
        return null;
    }
    debug("Tried to get bad setting: Invalid category " + category);
}

/* === HELPER METHODS === */
// sends a console message
function debug(message) {
    if(devSettings.debug) {
        console.log(message);
    }
}

// chooses random item from array
function choose(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// given chance to return true
function chance(chance) {
    return Math.random() < chance;
}

// generates random ID
function generateID() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

// copies given text to clipboard
function copyToClipboard(text) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

function hideOnClickOutside(selector, onRemove) {
    const outsideClickListener = (event) => {
        var $target = $(event.target);
        if (!$target.closest(selector).length) {
            removeClickListener();
            onRemove();
        }
    };

    const removeClickListener = () => {
        $(document).off("click", outsideClickListener);
    };
    $(document).on("click", outsideClickListener);
}

// parses html characters safely
function decodeHTML(html) {
    return $("<textarea>").html(html).val();
}

/* === GENERAL METHODS === */

function updateTime(noTimeout) {

    function validateTime(value) {
        if(value < 10) {
            return "0" + value;
        }
        return value;
    }

    var now = new Date();
    var hours = now.getHours();
    if(getSetting("general.options.12-hour-clock") == 0) {
        hours = (hours % 12) || 12;
    } else {
        hours = validateTime(hours);
    }
    var minutes = validateTime(now.getMinutes());
    $("#clock").html(hours + ":" + minutes);
    if(!noTimeout) {
        setTimeout(updateTime, TIME_TICK);
    }
}

// goddamn this is a big function
function openSettings(category) {
    if(!settings.hasOwnProperty(category)) {
        return;
    }
    var settingsInfo = settings[category];
    var settingsWindow = "#settings-view";
    $(settingsWindow).empty();  // reset settings window

    // add header
    $("<h3>").text(settingsInfo.title).addClass("settings-title").appendTo(settingsWindow);
    $("<div>").text(settingsInfo.description).addClass("settings-description").appendTo(settingsWindow);

    // add each section of options
    for(let s in settingsInfo) {
        if(!settingsInfo.hasOwnProperty(s)) {
            continue;
        }
        if(s == "title" || s == "description" || s == "onload") {
            continue;
        }

        $("<h4>").text(s).appendTo(settingsWindow); // section header
        var sectionEl = $("<ul>").addClass("settings-section").attr("data-section", s);
        var section = settingsInfo[s];
        
        // add each item in the section
        for(let k in section) {
            if(!section.hasOwnProperty(k)) {
                continue;
            }
            var optionEl = $("<li>").addClass("settings-option").attr("data-option", k);
            let option = section[k];
            if(option.hasOwnProperty("hidden") && option.hidden) {
                continue;
            }
            $("<span>").text(option.display).addClass("option-name").appendTo(optionEl);

            // OPTION STYLE: TOGGLE SLIDER
            if(option.hasOwnProperty("toggle")) {
                // upon user click, toggle the slider
                optionEl.click(function() {
                    var checkbox = $(this).find("input");

                    // do nothing if already animating
                    if(checkbox.hasClass("disabled")) {
                        return;
                    }

                    // toggle checkbox
                    var isChecked = Boolean(!checkbox.prop("checked"));
                    checkbox.prop("checked", isChecked);
                    option.toggle = isChecked;

                    if(option.hasOwnProperty("click")) {
                        option.click();
                    }

                    // disable the toggle until all animations are definitely complete
                    checkbox.addClass("disabled");
                    setTimeout(function() {
                        checkbox.removeClass("disabled");
                    }, SHOW_HIDE_DURATION + 10);

                    saveSettings();
                });

                // build the slider
                var slider = $("<span>").addClass("toggle-slider");
                var checkbox = $("<input type='checkbox'>");

                // check option if already checked
                if(option.toggle) {
                    checkbox.prop("checked", true);
                }

                checkbox.appendTo(slider);
                $("<span>").appendTo(slider);
                slider.appendTo(optionEl);

            // OPTION STYLE: CHOICES
            } else if(option.hasOwnProperty("choices") && option.hasOwnProperty("choice")) {
                // when user clicks on the tab but not an option, loop through options
                optionEl.click(function(event) {
                    // return early if user is clicking directly on an option
                    var $target = $(event.target);
                    if($target.closest(".toggle-option").length) {
                        return;
                    }

                    // choose next option index
                    if(option.choice < option.choices.length - 1) {
                        option.choice++;
                    } else {
                        option.choice = 0;
                    }

                    // update active option
                    var choiceEls = $(this).find(".toggle-option");
                    choiceEls.removeClass("active");
                    choiceEls.eq(option.choice).addClass("active");

                    if(option.hasOwnProperty("click")) {
                        option.click();
                    }
                    
                    saveSettings();
                });

                var choicesEl = $("<span>").addClass("toggle-options");
                
                // add each option in the list of choices
                for(let i = 0; i < option.choices.length; i++) {
                    let choiceEl = $("<span>").text(option.choices[i]).addClass("toggle-option");

                    // when clicking on an option, select that option
                    choiceEl.click(function() {
                        choiceEl.siblings(".toggle-option").removeClass("active");
                        choiceEl.addClass("active");
                        option.choice = i;

                        if(option.hasOwnProperty("click")) {
                            option.click();
                        }

                        saveSettings();
                    });

                    // make selected option active
                    if(option.choice == i) {
                        choiceEl.addClass("active");
                    }
                    choiceEl.appendTo(choicesEl);

                    // put dividers between options
                    if(i < option.choices.length - 1) {
                        $("<span>").text("|").addClass("toggle-divider").appendTo(choicesEl);
                    }
                }
                choicesEl.appendTo(optionEl);
            }

            // add description if any
            if(option.hasOwnProperty("description")) {
                $("<span>").text(option.description).addClass("option-description").appendTo(optionEl);
            }
            optionEl.appendTo(sectionEl);

        }
        sectionEl.appendTo(settingsWindow);
    }
    settings[category].onload();
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    debug("Settings saved!");
}

function toggleHide(selector, shouldHideDisplay) {
    var el = $(selector);
    if(el.hasClass("m-hide")) {
        unhide(el);
    } else {
        hide(el, shouldHideDisplay);
    }
}

function hide(el, shouldHideDisplay) {
    el.addClass("m-hiding");
    el.animate({
        opacity: 0.0
    }, SHOW_HIDE_DURATION, function() {
        el.removeClass("m-hiding");
        el.addClass("m-hide");
        if(shouldHideDisplay) {
            el.addClass("m-hide-display");
        }
    });
    
}

function unhide(el) {
    el.removeClass("m-hide");
    el.removeClass("m-hide-display");
    el.animate({
        opacity: 1.0
    }, SHOW_HIDE_DURATION);
}

function addTodoItem(todo) {
    var todoItem = $("<li>").addClass("todo-item").addClass("visible");
    var todoWrapper = $("<span>").addClass("todo-item-wrapper").appendTo(todoItem);
    var checkboxLabel = $("<label>").appendTo(todoWrapper);
    var checkbox = $("<input type='checkbox'>").appendTo(checkboxLabel);

    checkbox.click(function() {
        var isChecked = Boolean($(this).prop("checked"));
        todoItem.toggleClass("done");
        todo.done = !todo.done;
        if($("#todo-list .todo-item.done").length) {
            $(".todo-delete-finished").addClass("active");
        } else {
            $(".todo-delete-finished").removeClass("active");
        }
        if(todo.done && getSetting("todo.settings.move-finished-todos")) {
            todoItem.appendTo("#todo-list");
            var index = todoList.indexOf(todo);
            if(index > -1) {
                todoList.push(todoList.splice(index, 1)[0]);
            }
        }
        saveTodoList();
    });

    function enableEditing(el) {
        if(todoItem.hasClass("done")) {
            return;
        }
        el.prop("contenteditable", true);
        el.addClass("editing");
        todoSortableDisable();

        // put cursor at end of text
        // this is way harder to do than I thought it would be
        var oldText = el.text();
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.contents()[0], oldText.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
        
        // TODO known bug: div expands vertically when there is no text

        el.one("blur", function() {
            disableEditing(el, oldText);
        });

        el.keypress(function(event) {
            if(event.keyCode == KEY_ENTER) {
                el.blur();
            }
        });
    }

    function disableEditing(el, oldText) {
        el.removeClass("editing");
        el.prop("contenteditable", false);
        if(el.text().trim().length <= 0 || el.text().trim() == oldText) {
            el.text(oldText);
        } else {
            todo.text = el.text();
            saveTodoList();
        }
        todoSortableEnable();
    }

    // text element
    var textEl = $("<div>").addClass("todo-item-text").text(todo.text).dblclick(function() {
        enableEditing($(this));
    }).appendTo(todoWrapper);

    // context menu
    var context = $("<span>").addClass("todo-item-context");
    
    // edit
    $("<i>").addClass("fa fa-edit").attr("title", "Edit").tooltip(TOOLTIP_EFFECT).click(function() {
        enableEditing(textEl);
    }).appendTo(context);

    // delete
    $("<i>").addClass("fa fa-times-circle").attr("title", "Delete").tooltip(TOOLTIP_EFFECT).click(function() {
        // remove item
        var index = todoList.indexOf(todo);
        if(index > -1) {
            todoItem.remove();
            todoList.splice(index, 1);
            saveTodoList();
        }
    }).appendTo(context);
    context.appendTo(todoWrapper);

    todoItem.appendTo("#todo-list");
    todo.el = todoItem;
    return todo;
}

function todoSortableEnable() {
    $("#todo-list").sortable( "option", "disabled", false );
    return false;
}

function todoSortableDisable() {
    $("#todo-list").sortable("disable");
    return false;
}

function saveTodoList() {
    // gotta remove the "el" property when saving
    // so it doesn't cause recursive problems
    var copyList = [];
    for(var i = 0; i < todoList.length; i++) {
        var copy = Object.assign({}, todoList[i]);

        if(copy.hasOwnProperty("el")) {
            delete copy.el;
        }
        copyList.push(copy);
    }
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(copyList));
    debug("Todo list saved!");
}

function toggleAddQuoteForm() {
    if($(".add-quote-form").hasClass("visible")) {
        $(".add-quote-form").css({
            "max-height": 0,
            "opacity": 0
        });
    } else {
        var contentHeight = 400;
        $(".add-quote-form").css({
            "max-height": contentHeight + "px",
            "opacity": 1.0
        });
    }
    $(".add-quote-form").toggleClass("visible");
}

function updateWallpaper() {
    if(!currentBackground) {
        currentBackground = config.backgrounds[0];
    }

    var backgroundDarken = parseInt(getSetting("backgrounds.display.background-darken.choiceStr"));
    if(backgroundDarken) {
        var gradient = "rgba(0, 0, 0, " + (backgroundDarken / 100) + ")";
        $("#background").css("background-image", "linear-gradient(" + gradient + ", " + gradient +"), url(" + BACKGROUNDS_PATH + currentBackground + ")");
    } else {
        $("#background").css("background-image", "url(" + BACKGROUNDS_PATH + currentBackground + ")");
    }

    $("#background").animate({"opacity": 1.0}, 300);

    localStorage.setItem(CURRENT_BACKGROUND_KEY, currentBackground);
}

function refreshCurrentWallpaper() {
    var newBackground;
    do {
        newBackground = choose(config.backgrounds);
    }
    while(newBackground == currentBackground);
    changeWallpaperTo(newBackground);
}

function changeWallpaperTo(wallpaper) {
    currentBackground = wallpaper;
    $("#background").animate({"opacity": 0.0}, 300, function() {
        updateWallpaper();
    });
}

/* === EVENT HANDLERS === */
function onFavorite(e) {
    debug("Received " + e.category);
    // favorite quote
    if(e.category == "quote") {
        var quote;
        if(e.hasOwnProperty("quote")) {
            // quote specified
            
            quote = e.quote;
        } else {
            // no quote specified, get current
            quote = currentQuote;
        }

        quote.favorite = true;
        saveQuotebook();    // TODO if there's an easier way to find which list this quote was in and only save that list, would be nice
                            // maybe a method framework around the quotebook? but it's all based around currentQuote
                            // until then, just save both of em
    }
}

function onUnfavorite(e) {
    // unfavorite quote
    if(e.category == "quote") {
        var quote;
        if(e.hasOwnProperty("quote")) {
            // quote specified
            quote = e.quote;
        } else {
            // no quote specified, get current
            quote = currentQuote;
        }
        quote.favorite = false;
        saveQuotebook();
    }
}

/* === SETUP === */

function setupSettings() {
    if(localStorage.hasOwnProperty(SETTINGS_KEY)) {
        var oldSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
        settings = deepMerge(settings, oldSettings);
        debug("Settings loaded!");
    } else {
        debug("Generated default settings");
        saveSettings();
    }
}

function setupSettingsMenu() {

    for(let category in settings) {
        if(!settings.hasOwnProperty(category)) {
            continue;
        }
        var navItem = $("<li>").text(settings[category].title).addClass("main-nav-item").attr("data-navitem", category);
        navItem.click(function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            openSettings(category);
            $("#settings-menu li").removeClass("active");
            $(this).addClass("active");
        });
        navItem.appendTo("#settings-menu");
    }
    $("#settings-menu li").first().addClass("active");

    $("#settings-icon").click(function() {
        var thisEl = $(this);
        if(thisEl.hasClass("active")) {
            return;
        }
        thisEl.addClass("active");
        var containerEl = thisEl.siblings(".app-container");
        containerEl.addClass("active");
        setTimeout(function() {
            hideOnClickOutside(containerEl, function() {
                containerEl.removeClass("active");
                thisEl.removeClass("active");
            });
        }, 0);
        
        if($("#settings-menu li.active").length) {
            var category = $("#settings-menu li.active").data("navitem");
            openSettings(category);
        }
        // construct menu based on navitem in $("#settings-view")
        // on opening menu, load
    });

    $("#dedication-text").text("Made by " + AUTHOR);
    $("#dedication-subtext").text("Version " + VERSION);
}

function setupSearchBar() {
    // when user presses ENTER while search bar is focused, search input
    $("#search-bar").keypress(function(event) {
        if(event.keyCode == KEY_ENTER) {
            var input = $("#search-bar").val();

            // ignore when search bar is empty
            if(input.length <= 0) {
                return;
            }

            var isWebsite = false;
            for(var i = 0; i < COMMON_WEBSITE_SUFFIXES.length; i++) {
                if(input.includes("." + COMMON_WEBSITE_SUFFIXES[i])) {
                    isWebsite = true;
                    break;
                }
            }
            var url;
            if(isWebsite) {
                url = input;
                if(!url.startsWith(WEBSITE_PREFIX)) {
                    url = WEBSITE_PREFIX + url;
                }
            } else {
                url = "https://www.google.com/search?q=" + encodeURIComponent(input);
            }
            window.location = url;
        }
    });

    // focus the search bar when any part of the search area is clicked on
    $("#search-container").click(function() {
        $("#search-bar").focus();
        $("#search-container").addClass("active");
    });

    $("#search-bar").on("blur", function() {
        $("#search-container").removeClass("active");
    });

    if(getSetting("general.options.focus-search")) {
        $("#search-container").click();
    }
}

function setupClock() {
    updateTime();
}

// darkens wallpaper slightly to make white text clearer
function setupWallpaper() {
    if(localStorage.hasOwnProperty(CURRENT_BACKGROUND_KEY)) {
        currentBackground = localStorage.getItem(CURRENT_BACKGROUND_KEY);
    }

    updateWallpaper();
}

function setupGreeting() {
    var hour = new Date().getHours();
    var greeting;

    if(hour < 6 || hour >= 21) {
        greeting = "Good night";
    } else if(hour < 12) {
        greeting = "Good morning";
    } else if(hour < 17) {
        greeting = "Good afternoon";
    } else if(hour < 21) {
        greeting = "Good evening";
    } else {
        // something's gone wrong!
        greeting = "Hello there";   // might have non-time based greetings later
    }

    

    if(config.birthMonth >= 1 && config.birthMonth <= 12
    && config.birthDay >= 1 && config.birthDay <= 31) {
        // probably valid birthday, check for it
        var now = new Date();
        if(now.getMonth() + 1 == config.birthMonth
        && now.getDate()== config.birthDay) {
            greeting = "Happy birthday";
        }
    }

    $("<span>").addClass("greeting-text").html(greeting).appendTo("#greeting");
    $("<span>").addClass("greeting-name").appendTo("#greeting");
    if(getSetting("general.show.name-visible")) {
        if(config.name) {
            $(".greeting-name").html(", " + config.name);
            $(".greeting-name").css("opacity", 1.0);
        }
    }

    // choose a valid greeting ending
    var valid;
    var greetingEnding;
    do {
        valid = true;
        greetingEnding = choose(GREETING_ENDINGS);

        // don't say "You should probably go to sleep!" cuz that's mean
        if(greetingEnding == "!" && greeting.includes("You should probably go to sleep")) {
            valid = false;
        }
    } while(!valid);
    $("<span>").addClass("greeting-ending").html(greetingEnding).appendTo("#greeting");
}

function setupQuote() {
    if(localStorage.hasOwnProperty(CURRENT_QUOTE_KEY)) {
        var quote = getQuoteByID(localStorage.getItem(CURRENT_QUOTE_KEY));
        if(quote) {
            setCurrentQuote(quote);
        } else {
            refreshCurrentQuote();
        }
    } else {
        refreshCurrentQuote();
    }

    $("#quote").find(".copy-quote").click(function() {
        var quote = ">>> \"" + currentQuote.text + "\"\n- " + currentQuote.author;
        if(currentQuote.hasOwnProperty("source")) {
            quote += " (" + currentQuote.source + ")";
        } 
        copyToClipboard(quote);
    });

    $("#quote").find(".refresh-quote").click(function() {
        refreshCurrentQuote();
    });
}

function setupNotes() {
    var notesList = [];
    var currentOpenNote = null;
    const MAX_CHARACTER_PREVIEW = 30;
    const BLANK_NOTE_TITLE = "Untitled Note";
    const HIDDEN_NOTE_PREVIEW = "(Hidden)";
    const MAX_TITLE_LENGTH = 50;

    if(localStorage.hasOwnProperty(NOTES_KEY)) {
        notesList = JSON.parse(localStorage.getItem(NOTES_KEY));
    }

    // load notes;
    refreshNav();
    if(currentOpenNote != null) {
        openNote(currentOpenNote);
    }

    $("#notes-toggle").click(function() {
        if($("#todo-toggle").hasClass("active")) {
            $("#todo-toggle").click();
        }

        var isClosing = $(this).hasClass("active");
        $(this).toggleClass("active");
        var containerEl = $(this).siblings(".app-container");
        containerEl.toggleClass("active");

        if(isClosing) {
            setTimeout(function() {
                closeCurrentNote(false);
            }, 300);
            
        } else if(currentOpenNote != null) {
            openNote(currentOpenNote);
        } else {
            closeCurrentNote(true);
        }
    });

    function refreshNav() {
        $("#notes-nav").empty();
        for(var i = 0; i < notesList.length; i++) {
            let noteInfo = notesList[i];
            var navItem = $("<div>").addClass("notes-nav-item").click(function() {
                if($(this).hasClass("active")) {
                    return;
                }
                $(".notes-nav-item").removeClass("active");
                $(this).addClass("active");
                currentOpenNote = noteInfo;
                openNote(currentOpenNote);
            });
            if(currentOpenNote != null && noteInfo.id == currentOpenNote.id) {
                navItem.addClass("active");
            }

            var preview = noteInfo.text.substr(0, MAX_CHARACTER_PREVIEW);
            if(noteInfo.isHidden) {
                preview = HIDDEN_NOTE_PREVIEW;
            }
            $("<div>").addClass("notes-nav-item-title").text(noteInfo.title).appendTo(navItem);
            
            $("<div>").addClass("notes-nav-item-preview").text(preview).appendTo(navItem);
            navItem.appendTo("#notes-nav");
        }
    }

    // moves note to top of list, returns true if should save/refresh nav
    function moveToTop(note) {
        if(!getSetting("notes.settings.update-order")) {
            return false;
        }

        var index = notesList.indexOf(note);
        if(index > 0) {
            notesList.unshift(notesList.splice(index, 1)[0]);
        }
        return true;
    }

    function closeCurrentNote(shouldReplace) {
        $(".notes-view-title-wrapper").empty();
        $("#notes-content").empty();
        $(".notes-view-context-wrapper").empty();
        
        if(!shouldReplace) {
            return;
        }

        if(notesList.length > 0) {
            $("<div>").addClass("notes-view-placeholder").html("Select a note to open<br>&larr;").appendTo("#notes-content");
        } else {
            var text = $("<div>").addClass("notes-view-placeholder").html("Create new note<br>").appendTo("#notes-content");
            $("<i>").addClass("fa fa-plus-circle fa-lg notes-view-add").click(function() {
                createNewNote();
            }).appendTo(text);
        }
        
    }

    function createNewNote() {
        var newNote = addNote();
        var isFirst = moveToTop(newNote);
        refreshNav();
        openNote(newNote);
        $("#notes-view-title").focus().select();

        // set new note active and scroll to it
        var navItems = $(".notes-nav-item");
        navItems.removeClass("active");
        
        var el;
        if(isFirst) {
            el = navItems.first();
        } else {
            el = navItems.last();
        }
        el.addClass("active");

        if(el.length >= 2) {
            el[0].scrollIntoView();
        }
        
    }

    function openNote(note) {
        closeCurrentNote(false);
        var titleWrapper = $(".notes-view-title-wrapper");
        var contentWrapper = $("#notes-content");
        var contextWrapper = $(".notes-view-context-wrapper");

        // TITLE
        $("<input type='text' maxlength=" + MAX_TITLE_LENGTH + ">").val(note.title).attr("id", "notes-view-title").keypress(function(event) {
            if(event.keyCode != KEY_ENTER) {
                return;
            }

            var text = $(this).val().trim();
    
            if(text.length <= 0) {
                text = BLANK_NOTE_TITLE;
                $(this).val(BLANK_NOTE_TITLE)
            }
            var isChanged = text != note.title;
            note.title = text;
            $(this).blur();
            
            // do nothing else unless text is actually changed
            if(isChanged) {
                moveToTop(note);
                refreshNav();
                saveNotes();
            }
        }).appendTo(titleWrapper);

        // Note Content
        var oldVal = note.text;
        $("<textarea>").addClass("notes-view-content").attr("spellcheck", getSetting("notes.settings.spellcheck")).attr("placeholder", "Start writing\u2026").val(note.text)
        .keydown(function(event) {
            // we love tab support
            if(event.keyCode != KEY_TAB) {
                return;
            }

            var textarea = $(this).get(0);
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;

            var oldText = $(this).val();
            $(this).val(oldText.substr(0, start) + "\t" + oldText.substr(end));
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            if(event.preventDefault) {
                event.preventDefault();
            }

            return false;
        })
        .keydown(function(event) {
            // prevent Ctrl-S from making people accidentally open the save dialog
            if(event.ctrlKey && (event.which == KEY_S)) {
                if(getSetting("notes.export.export-save-shortcut")) {
                    downloadFile(generateFileTitle(), $(".notes-view-content").val());
                }
                event.preventDefault();
                return false;
            }
        })
        .on("change keyup paste", function() {
            // This function calls every time you edit the text, and saves every time...
            // That's a lot of saving. But I don't care :)
            if($(this).attr("placeholder").length > 0) {
                $(this).attr("placeholder", "");
            }
            var currentVal = $(this).val();
            if(currentVal == oldVal) {
                return;
            }
            oldVal = currentVal;
            note.text = currentVal;
            moveToTop(note);
            refreshNav();
            saveNotes();
        })
        .click(function() {
            if(!$("#notes-toggle").hasClass("active")) {
                return true;
            }
            if(note.isHidden && getSetting("notes.settings.easy-reveal")) {
                $(".notes-view-context-wrapper .hide-toggle").click();
                $(this).removeClass("easy-reveal");
            }
        })
        .appendTo(contentWrapper).focus();

        function downloadFile(name, contents, type) {
            type = type || "text/plain";

            var blob = new Blob([contents], {type: type});

            var link = document.createElement("a");
            link.download = name;
            link.href = window.URL.createObjectURL(blob);
            link.onclick = function(e) {
                // revokeObjectURL needs a delay to work properly
                var el = this;
                setTimeout(function() {
                    window.URL.revokeObjectURL(el.href);
                }, 1500);
            };

            link.click();
            link.remove();
        }

        function generateFileTitle() {
            var title = currentOpenNote.title;
            if(!getSetting("notes.export.export-capitalize")) {
                title = title.toLowerCase();
            }

            var spacingChoice = getSetting("notes.export.export-spacing");
            if(spacingChoice == 1) {
                // dashes
                title = title.replace(" ", "-")
            } else if(spacingChoice == 2) {
                // underscores
                title = title.replace(" ", "_")
            }
            return title;
        }

        function deleteNote() {
            var index = notesList.indexOf(note);
            notesList.splice(index, 1);
            closeCurrentNote(true);
            refreshNav();
            saveNotes();
        }

        var isDeleting = false;

        /* Context Menu */

        // new note
        $("<i>").addClass("fa fa-plus-square").attr("title", "New Note").tooltip(TOOLTIP_EFFECT).click(function() {
            createNewNote();
        }).appendTo(contextWrapper);

        // copy note
        $("<i>").addClass("fa fa-copy").attr("title", "Copy Text").tooltip(TOOLTIP_EFFECT).click(function() {
            if(note.isHidden) {
                return true;
            }
            $(".notes-view-content").select();
            document.execCommand("copy");
        }).appendTo(contextWrapper);

        // export note
        $("<i>").addClass("fa fa-upload").attr("title", "Export").tooltip(TOOLTIP_EFFECT).click(function() {
            downloadFile(generateFileTitle(), $(".notes-view-content").val());
        }).appendTo(contextWrapper);

        // lock/unlock note
        var lockOption = $("<i>").addClass("fa fa-unlock").attr("title", "Lock").tooltip(TOOLTIP_EFFECT).click(function() {
            var el = $(this);
            el.toggleClass("fa-unlock fa-lock");
            var newTooltip;
            var isLocked = el.hasClass("fa-lock");
            if(isLocked) {
                newTooltip = "Unlock";
            } else {
                newTooltip = "Lock";
            }
            note.isLocked = isLocked;
            $("#notes-view-title").prop("readonly", note.isHidden || note.isLocked);
            $(".notes-view-content").prop("readonly", note.isHidden || note.isLocked);
            el.attr("title", newTooltip).tooltip("option", "content", newTooltip);
            saveNotes();
        }).appendTo(contextWrapper);

        // hide/unhide note
        var hideOption = $("<i>").addClass("fa fa-eye hide-toggle").attr("title", "Hide").tooltip(TOOLTIP_EFFECT).click(function() {
            if(isDeleting) {
                return;
            }
            var el = $(this);
            var contentEl = $(".notes-view-content");
            el.toggleClass("fa-eye fa-eye-slash");
            var newTooltip;
            var isHidden = el.hasClass("fa-eye-slash");
            if(isHidden) {
                newTooltip = "Reveal";
                contentEl.addClass("blur");
                if(getSetting("notes.settings.easy-reveal")) {
                    contentEl.addClass("easy-reveal");
                }
            } else {
                newTooltip = "Hide";
                contentEl.removeClass("blur");
            }
            note.isHidden = isHidden;

            $("#notes-view-title").prop("readonly", note.isHidden || note.isLocked);
            contentEl.prop("readonly", note.isHidden || note.isLocked);

            el.attr("title", newTooltip);
            el.tooltip("option", "content", newTooltip);
            refreshNav();
            saveNotes();
        }).appendTo(contextWrapper);

        $("<i>").addClass("fa fa-trash").attr("title", "Delete Note").tooltip(TOOLTIP_EFFECT).click(function() {
            if(isDeleting) {
                return;
            }
            
            if(!getSetting("notes.settings.confirm-delete")) {
                deleteNote();
                return;
            }
            
            isDeleting = true;
            var el = $(".notes-view-content");
            var removeDialog = $("<div>").addClass("note-dialogue").html("Are you sure you want to delete this note?<br>").insertAfter(el);
            el.addClass("blur");
            $("<div>").addClass("note-button").text("Confirm").click(function() {
                deleteNote();
                isDeleting = false;
            }).appendTo(removeDialog);
            $("<div>").addClass("note-button").text("Cancel").click(function() {
                isDeleting = false;
                removeDialog.remove();
                el.removeClass("blur");
            }).appendTo(removeDialog);
            
        }).appendTo(contextWrapper);

        $("<i>").addClass("fa fa-times").attr("title", "Close").tooltip(TOOLTIP_EFFECT).click(function() {
            closeCurrentNote(true);
            $(".notes-nav-item.active").removeClass("active");
            currentOpenNote = null;
        }).appendTo(contextWrapper);

        if(note.isLocked) {
            lockOption.click();
        }

        if(note.isHidden) {
            hideOption.click();
        }

        if(getSetting("notes.settings.show-date-created")) {
            $("<div>").addClass("notes-view-info").text("Created " + note.dateCreated).appendTo(contentWrapper);
        }
    }

    function addNote(info) {
        info = info || { "title": BLANK_NOTE_TITLE, "text": "" };
        var note = {
            id: generateID(),
            title: info.title,
            text: info.text,
            dateCreated: getFormattedDate(new Date()),
            isHidden: info.isHidden || false,
            isLocked: info.isLocked || false
        };
        debug(note.dateCreated);
        notesList.push(note);
        saveNotes();
        return note;
    }

    function saveNotes() {
        localStorage.setItem(NOTES_KEY, JSON.stringify(notesList));
        debug("Notes saved!");
    }

    var getFormattedDate = (function() {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        
        return function(date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
        
            return monthNames[monthIndex] + " "  + day + ", " + year;
        }
    })();
}

function setupTodo() {
    if(localStorage.hasOwnProperty(TODO_LIST_KEY)) {
        todoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY));
        for(var i = 0; i < todoList.length; i++) {
            addTodoItem(todoList[i]);
            if(todoList[i].done) {
                todoList[i].el.addClass("done");
                todoList[i].el.find("input").prop("checked", true);
            }
        }
        debug("Todo list loaded!");
    }

    $("#todo-toggle").click(function() {
        if($("#notes-toggle").hasClass("active")) {
            $("#notes-toggle").click();
        }

        $(this).toggleClass("active");
        var containerEl = $(this).siblings(".app-container");
        containerEl.toggleClass("active");
        if(localStorage.hasOwnProperty(TODO_STAY_OPEN_KEY)) {
            var option = JSON.parse(localStorage.getItem(TODO_STAY_OPEN_KEY));
            localStorage.setItem(TODO_STAY_OPEN_KEY, JSON.stringify(!option));
        } else {
            localStorage.setItem(TODO_STAY_OPEN_KEY, "true");
        }
    });

    if(localStorage.hasOwnProperty(TODO_STAY_OPEN_KEY)
        && JSON.parse(localStorage.getItem(TODO_STAY_OPEN_KEY))
        && getSetting("todo.settings.todo-stay-open")) {
        $("#todo-toggle").click();
        localStorage.setItem(TODO_STAY_OPEN_KEY, "true");
    } else {
        localStorage.setItem(TODO_STAY_OPEN_KEY, "false");
    }

    $(".new-todo-input").keypress(function(event) {
        if(event.keyCode == KEY_ENTER) {
            var text = $(this).val().trim();

            if(text.length <= 0) {
                return;
            }

            todoList.push(addTodoItem({
                "id": generateID(),
                "text": text,
                "done": false
            }));

            $(this).val("");
            saveTodoList();
        }
    });

    $(".todo-delete-finished").attr("title", "Delete all finished items").tooltip(TOOLTIP_EFFECT).click(function() {
        if(!$(this).hasClass("active")) {
            return;
        }

        for(var i = todoList.length - 1; i >= 0; i--) {
            if(todoList[i].done) {
                todoList[i].el.remove();
                todoList.splice(i, 1);
            }
        }

        $(this).removeClass("active");
        saveTodoList();
    });

    if($("#todo-list .todo-item.done").length) {
        $(".todo-delete-finished").addClass("active");
    }

    function getElementIndex(node) {
        var index = 0;
        while(node.prev().length) {
            node = node.prev();
            index++;
        }
        return index;
    }

    function moveTodoItem(oldIndex, newIndex) {
        todoList.splice(newIndex, 0, todoList.splice(oldIndex, 1)[0]);
    }

    var currentIndex = -1;
    $("#todo-list").sortable({
        cursor: "grabbing",
        start: function(event, ui) {
            currentIndex = getElementIndex($(ui.item));
            debug("Picked up element " + currentIndex);
        },
        update: function(event, ui) {
            var finalIndex = getElementIndex($(ui.item));
            if(finalIndex != currentIndex) {
                moveTodoItem(currentIndex, finalIndex);
                saveTodoList();
            }
            currentIndex = -1;
        }
    });
    todoSortableEnable();
}

function checkDailyRotation() {
    var now = new Date();
    if(!localStorage.hasOwnProperty(LAST_REFRESH_KEY)) {
        localStorage.setItem(LAST_REFRESH_KEY, now.toString());
    }

    var lastRefresh = new Date(localStorage.getItem(LAST_REFRESH_KEY));
    var isMoreThanOneDayAgo = (lastRefresh.getTime() - now.getTime()) > ONE_DAY;
    var isDifferentDay = now.getDate() != lastRefresh.getDate()
                        || now.getMonth() != lastRefresh.getMonth()
                        || now.getFullYear() != lastRefresh.getFullYear();

    if(isMoreThanOneDayAgo || (isDifferentDay && now.getHours() >= 4)) {
        localStorage.setItem(LAST_REFRESH_KEY, now.toString());
        if(getSetting("general.options.quote-rotation")) {
            debug("Refreshing quote!");
            refreshCurrentQuote();
        }
        if(getSetting("general.options.wallpaper-rotation")) {
            debug("Refreshing wallpaper!");
            currentBackground = choose(config.backgrounds);
            localStorage.setItem(CURRENT_BACKGROUND_KEY, currentBackground);
        }
    }
}

function setupButtons() {
    $(".control-fav").click(function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var el = $(this).toggleClass("active");
        var category = el.data("category");

        if(el.hasClass("active")) {
            onFavorite({
                "category": category
            });
        } else {
            onUnfavorite({
                "category": category
            });
        }
        
        event.preventDefault();
    });
}

// hide elements immediately if they are toggled off in settings
function quickHideAll() {

    function quickHide(selector, showOption, shouldHideDisplay) {
        var el = $(selector);
        if(!getSetting("general.show." + showOption)) {
            el.css("opacity", 0.0);
            el.addClass("m-hide");
            if(shouldHideDisplay) {
                el.addClass("m-hide-display");
            }
        }
    }

    quickHide("#greeting", "greeting-visible");
    quickHide("#quote", "quotes-visible");
    quickHide("#search-container", "search-bar-visible");
    quickHide("#clock", "clock-visible");
    quickHide("#notes-toggle", "notes-visible", true);
    quickHide("#todo-toggle", "todo-visible", true);
    
}

// essentially the "main" function for you Java people
$(document).ready(function() {
    console.log("Custom New Tab Homepage Project Version " + VERSION + "\nCreated by " + AUTHOR);
    debug("Ready!");

    // load User Config if it exists
    if(typeof UserConfig == "object") {
        config = UserConfig;
        debug("User config loaded!");

        if(!config.hasOwnProperty("backgrounds") || config.backgrounds.length <= 0) {
            config.backgrounds = [
                "river.jpg",
                "mountain.jpg",
                "lake.jpg",
                "mountain2.jpg",
                "river2.jpg",
                "waterfall.jpg",
                "mountain3.jpg",
                "fuji.jpg",
                "lake_night.jpg",
                "lake_night2.jpg",
                "night.jpg"
            ]
        }
    }

    setupSettings();
    setupQuotebook();
    setupSearchBar();
    setupSettingsMenu();
    setupClock();
    setupGreeting();
    setupQuote();
    setupNotes();
    setupTodo();
    checkDailyRotation();
    setupWallpaper();
    setupButtons();
    quickHideAll();
});
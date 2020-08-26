'use strict'

class App {
    constructor() {
        this.font_size = 16;
        this.leniance = 0.0; // seconds of leniance to give
        this.goal_word_count = 0;

        this.time = 0.0;
        this.last_frame_time = 0.0;
        this.last_typed_time = 0.0;
        this.last_textarea_value = "";
    }

    init() {
        requestAnimationFrame(() => {
           this.update();
        });
    }

    get_elapsed_time() {
        const now = new Date().getTime();
        const elapsed = now - this.last_frame_time;
        this.last_frame_time = now;
        return elapsed / 1000; // convert to seconds
    }

    update() {
        // update time
        const dt = this.get_elapsed_time()
        this.time += dt;

        // select textarea
        const notepad = document.getElementById("notepad");
        const current_textarea_value = notepad.value;
        console.log(current_textarea_value);

        // update settings
        const rest_time_setting = document.getElementById("rest-time");
        const word_count_setting = document.getElementById("word-count-goal");
        const leniance = parseFloat(rest_time_setting.value);
        const goal_word_count = parseInt(word_count_setting.value);

        if (!isNaN(leniance)) {
            this.leniance = leniance;
        }
        if (!isNaN(goal_word_count)) {
            this.goal_word_count = goal_word_count;
        }

        // check word count
        var word_count = current_textarea_value.split(" ").length;
        if (current_textarea_value == "") {
            word_count = 0;
        }
        const progress_text = document.getElementById("progress");
        progress_text.innerHTML = "Words: " + word_count.toString();
        const progress_bar = document.getElementById("progress-bar");
        const progress = word_count / this.goal_word_count * 100;
        console.log(progress)
        progress_bar.setAttribute("value", progress.toString());
        progress_bar.innerHTML = toString(progress);

        // check typing and delete if necessary
        if (word_count < this.goal_word_count && this.time - this.last_typed_time >= this.leniance && current_textarea_value == this.last_textarea_value) {
            notepad.value = "";
        }
        else if (current_textarea_value != this.last_textarea_value) {
            this.last_typed_time = this.time;
        }

        this.last_textarea_value = current_textarea_value;

        requestAnimationFrame(() => {
            this.update()
        });
    }
}

const app = new App();

document.addEventListener("DOMContentLoaded", () => {
    app.init();
});
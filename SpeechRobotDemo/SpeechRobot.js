/**
 ************************************************************************************
 * Copyright 2020 Ivan Teixeira                                                     *
 *                                                                                  *
 * Permission is hereby granted, free of charge, to any person obtaining a copy     *
 * of this software and associated documentation files (the "Software"), to deal    *
 * in the Software without restriction, including without limitation the rights     *
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell        *
 * copies of the Software, and to permit persons to whom the Software is            *
 * furnished to do so, subject to the following conditions:                         *
 *                                                                                  *
 * The above copyright notice and this permission notice shall be included in all   *
 * copies or substantial portions of the Software.                                  *
 *                                                                                  *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR       *
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,         *
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE      *
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER           *
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,    *
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE    *
 * SOFTWARE.                                                                        *
 ************************************************************************************
 **/

//==================//
//== SpeechRobot  ==//
//==================//

class SpeechRobot {
    constructor() {
        this.speechRecog = undefined;

        window.speechSynthesis.onvoiceschanged = function () {
            this.languages = window.speechSynthesis.getVoices();
        }
    }

    //Speak (This can only be invoked by a user interaction)
    speak(language = 'en-US', message = '') {
        //Force SpeechRobot to load the languages
        this.languages = window.speechSynthesis.getVoices();

        //Wait for languages to load
        if (this.languages === undefined) {
            setTimeout(() => {
                this.speak(language, message);
            }, 1000);
            console.log("Unde");
        } else {

            //Select the language
            let selected_language;
            selected_language = this.languages.filter((obj) => {
                if (obj.lang === language)
                    return obj;
            })[0];

            //Prepare to speak
            const speechSynthesisUtterance = new SpeechSynthesisUtterance(message);
            speechSynthesisUtterance.voice = selected_language;

            window.speechSynthesis.speak(speechSynthesisUtterance);
            console.log("id: " + language);
        }

    }

    listen(language = 'en-US', on_word_interpreted = () => { }) {
        this.speechRecog = new webkitSpeechRecognition();
        this.speechRecog.continuous = true;
        this.speechRecog.interimResults = false;
        this.speechRecog.onresult = function (e) {
            on_word_interpreted(e.results[e.results.length - 1][0].transcript.trim());
        }
        this.speechRecog.start();
    }

    stopListening() {
        if (this.speechRecog !== undefined) {
            this.speechRecog.stop();
            this.speechRecog = undefined;
        }
    }
}

const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("database/db.json", "utf-8");
    }

    write(note) {
        return writeFileAsync("database/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsed;

            try {
                parsed = [].concat(JSON.parse(notes));
            } catch(err) {
                parsed = [];
            }

            return parsed;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if(!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }

        const newNote = { title, text, id : uuidv1() };

        return this.getNotes().then((notes) => [...notes, newNote]);
    }
}
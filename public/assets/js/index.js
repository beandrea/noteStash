const title = $(".note-title");
const text = $(".note");
const saveBtn = $(".save-note");
const newBtn = $(".new-note");
const noteLst = $(".list-container .list-group");

let active = {};

const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
};

const saveNote = (note) => {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST",
    });
};

const deleteNote = (id) => {
    return $.ajax({
        url: `/api/notes/${id}`,
        method: "DELETE",
    });
};

const renderActive = () => {
    saveBtn.hide();

    if(active.id) {
        title.attr("readonly", true);
        text.attr("readonly", true);
        title.val(active.title);
        text.val(active.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
};
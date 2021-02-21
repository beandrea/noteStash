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

const handleSave = function() {
    const newN = {
        title: title.val(),
        text: text.val(),
    };

    saveNote(newN).then(() => {
        getAndRender();
        renderActive();
    });
};

const handleDelete = function(e) {
    e.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    if(active.id === note) {
        active = {};
    }

    deleteNote(note.id).then(() => {
        getAndRender();
        renderActive();
    });
};

const handleNoteView = function() {
    active = $(this).data();
    renderActive();
};

const handleNewNoteView = function() {
    active = {};
    renderActive();
}

const handleRenderSaveBtn = function() {
    if(!title.val().trim() || !text.val().trim()) {
        saveBtn.hide();
    } else {
        saveBtn.show();
    }
};

const renderNoteLst = (notes) => {
    noteLst.empty();
    const noteLstItems = [];
    const createLi = (text, withDeleteButton = true) => {
        const li = $("<li class='list-group-item'>");
        const span = $("<span>").text(text);
        li.append(span);

        if(withDeleteButton) {
            const delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");
            li.append(delBtn);
        }

        return li;
    };

    if(notes.length === 0) {
        noteLstItems.push(createLi("No saved notes", false));
    }

    notes.forEach((note) => {
        const li = createLi(note.title).data(note);
        noteLstItems.push(li);
    });

    noteLst.append(noteLstItems);
};

const getAndRender = () => {
    return getNotes().then(renderNoteLst);
};

saveBtn.on("click", handleSave);
noteLst.on("click", ".list-group-item", handleNoteView);
newBtn.on("click", handleNewNoteView);
noteLst.on("click", ".delete-note", handleDelete);
title.on("keyup", handleRenderSaveBtn);
text.on("keyup", handleRenderSaveBtn);

getAndRender();
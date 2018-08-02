(function() {

	if (input && input.noteID) {
		var note = new GlideRecord('x_snc_createnotes_note');
		if (note.get(input.noteID)) {
			if (input.action == 'getNote') {
				data.note = {};
				$sp.getRecordValues(data.note, note, "title, note, sys_id");
			}
			else if (input.action == 'updateNote') { 
				note.title = input.noteTitle; 
				note.note = input.noteBody; 
				note.update(); 
				// Need to update the data object with the new title
				// and first 20 characters of the note (do not want to write huge
				// strings to the Notes List widget)
				data.title = note.getValue('title');
				data.note = note.getValue('note').slice(0,20);
			}

			else if (input.action == 'deleteNote') { 
				note.deleteRecord(); 
			}
		}
	}
})();
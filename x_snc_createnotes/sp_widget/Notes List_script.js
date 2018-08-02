(function() {

	data.notes = [];
	var noteGR = new GlideRecord('x_snc_createnotes_note');
	noteGR.addQuery('user', gs.getUser().getID());
	noteGR.orderByDesc('sys_created_on');
	//noteGR.setLimit(options.maximum_records_to_display);
	noteGR.query();
	while (noteGR.next()) {
		var noteObj = {};

		$sp.getRecordDisplayValues(noteObj, noteGR, 'number,title,sys_id');

		noteObj.note = noteGR.getValue('note').slice(0,20);

		data.notes.push(noteObj);
	}

	if (input) {
		if (input.action == 'newNote') {
			var newNote = new GlideRecord('x_snc_createnotes_note');
			newNote.newRecord();
			var id = newNote.insert();
			data.noteID = id;
			data.newNote = {};
			$sp.getRecordValues(data.newNote,newNote,"title,note,sys_id");
		}
	}
}
)();
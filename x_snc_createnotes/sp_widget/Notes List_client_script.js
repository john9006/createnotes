function($rootScope,$scope, spUtil) {
	/* widget controller */
	var c = this;
	// Use a position indicator to know which record to update
	c.notePos = 0;

	c.selectItem = function(idx) {  
		// Set the position indicator to the index value passed in on select
		c.notePos = idx;
		var id = c.data.notes[idx].sys_id;
		console.log('Note ID: ' + id);
		$rootScope.noteID = id;
		$rootScope.$emit('selectNote', id);
	};
	// Subscribe to event.  Set the new title and note values on the 
	// c.data object
	$rootScope.$on('updateTitle', function(event,data) { 
		c.data.notes[c.notePos].title = data.title;
		c.data.notes[c.notePos].note = data.note;
	});

	c.newNote = function() {
		c.server.get({
			action: 'newNote'
		}).then(function(r) {
			c.data.notes.unshift(r.data.newNote);
			c.data.noteID = r.data.noteID;
			$rootScope.noteID = c.data.noteID;
			$rootScope.$emit('selectNote', c.data.noteID);
		});
	};

	$rootScope.$on('deleteNote', function(event,data) {
		c.data.notes.splice($scope.notePos, 1);
	});
	spUtil.recordWatch($scope, "x_snc_createnotes_note", "numberANYTHING", function(name) {
		if(name.data.operation == "insert" || name.data.operation == "update" || name.data.operation == 'delete') {
			c.server.refresh();
		}
		console.log(name.data.operation);
		console.log(name);
	});
}

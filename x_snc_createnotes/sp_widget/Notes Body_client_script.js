function($scope,$rootScope,spModal,spUtil) {
	/* widget controller */
	var c = this;

	c.confirmDelete = function() {
		spModal.confirm("Are you sure?").then(function(confirmed){
			if(confirmed){
				c.deleteNote();
			}
		})
	}

	$rootScope.$on('selectNote', function(event,data) {
		c.server.get({
			action: 'getNote',
			noteID: $rootScope.noteID
		}).then(function(r) {
			c.data.title = r.data.note.title;
			c.data.note = r.data.note.note;
			c.data.noteID = r.data.note.sys_id;
		});
	});

	c.updateNote = function(updateType) {
		c.server.get({
			action: 'updateNote',
			noteID: c.data.noteID,
			noteBody: c.data.note,
			noteTitle: c.data.title
		}).then(function(r) {
			// When the promise is returned, emit the change
			if (updateType == 'title' || updateType == 'body') { 
				$rootScope.$emit('updateTitle', r.data); 
			}
		});
	}
	c.deleteNote = function() {
		c.server.get({
			action: 'deleteNote',
			noteID: c.data.noteID
		}).then(function(r) {
			spUtil.addTrivialMessage("The " + c.data.title + " record has been deleted");
			$rootScope.$emit('deleteNote', c.data.noteID);
			c.data.title = '';
			c.data.note = '';
			c.data.noteID = '';
		});
	}
}




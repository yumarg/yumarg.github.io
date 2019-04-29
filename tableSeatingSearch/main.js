$(function() {

	$.ajax({
        url: "sampleCSV.csv",
        dataType: "text",
        success: function(data) {controller.processCSV(data);}
     });

	var model = {

		init: function() {
			nameToTable = {};
			tableToNames = {};
		},

		getAllNames: function() {
			var allNames = [];
			for (var n in nameToTable) {
				allNames.push(n);
			}
			return allNames;
		},

		getAllTables: function() {
			var allTables = [];
			for (var t in tableToNames) {
				allTables.push(t);
			}
			return allTables;
		},

		addNameToTableMapping: function(name, table) {
			if (nameToTable.hasOwnProperty(name)) {
				nameToTable[name].push(table);
			} else {
				nameToTable[name] = [table];
			}
		},

		addTableToNameMapping: function(table, name) {
			tableToNames[table] = name;
		}
		
	};

	var searchResults = {
		init: function() {
			$("#search").click(function() {
				var results = controller.search(document.getElementById("input-name").value);
				var toRender = controller.formatForDisplay(results);
				searchResults.render(toRender);
			});
		},

		formatForDisplay: function(results) {
			var toRender = "";
			for (result in results) {
				toRender += "<tr><td>" + result.table + "</td><td>" + result.othersAtTable + "</td></tr>";
			}
			return toRender;
		},

		render: function(toRender) {
			$("#results-table thead").empty();
			$("#results-table tbody").empty();
			$("#results-table thead").append("<td>Table</td><td>Others at table</td></tr>");
			if (toRender == "") {
				$("#results-table tbody").append("<tr><td>Person not found</td></tr>");
			}
			else {
				$("#results-table tbody").append(toRender);
			}
		}
	};

	var controller = {
		init: function() {
			model.init();
			searchResults.init();
		},

		clear: function() {
			model.nameToTable = {};
			model.tableToNames = {};
		},

		getTableGivenName: function(name) {
			for(var n in nameToTable) {
				if (n.toLowerCase() == name.toLowerCase()) {
					return nameToTable[n];
				}
			}
		},

		getNamesGivenTable: function(table) {
			for (var t in tableToNames) {
				if (t.toLowerCase() == table.toLowerCase()) {
					return tableToNames[t];
				}
			}
		},

		getTableAndOthersAtTable: function(name) {
			var table = getTableGivenName(name);
			var results = [];
			for (t in table) {
				var namesGivenTable = getNamesGivenTable(table);
				var othersAtTable = [];
				for (var i=0; i<namesGivenTable.length; i++) {
					var nameAtTable = namesGivenTable[i];
					if (nameAtTable.toLowerCase() != name.toLowerCase()) {
						othersAtTable.push(namesGivenTable[i]);
					}
				}
				results.push({
					table: table,
					othersAtTable: othersAtTable
				});
			}
			return results;
		},

		processCSV: function(data) {
		    var fileContents = data.split(/\r?\n|\r/);
	    	for (var i = 0; i < fileContents.length-1; i++) {
	    		var mapping = fileContents[i].split(",");
	    		model.addNameToTableMapping(mapping[0], mapping[1]);
	    		model.addTableToNameMapping(mapping[1], mapping[0]);
	    	}	
		}
	};

	controller.init();
});
$(function() {

	$.fn.pressEnter = function(fn) {  
	    return this.each(function() {  
	        $(this).bind('enterPress', fn);
	        $(this).keyup(function(e){
	            if(e.keyCode == 13)
	            {
	            	$(this).trigger("enterPress");
	            }
	        })
	    });  
	 }; 

	// $.ajax({
 //        url: "http://margaretyu.me/seatMe/sampleCSV.csv",
 //        dataType: "text",
 //        success: function(content) {controller.readAndProcessCSV(content);},
 //        error: function() {console.log("couldn't load csv");}
 //     });

	$.ajax({
		url: "https://api.myjson.com/bins/kx8ew",
		dataType: "json",
		success: function(content) {controller.readAndProcessJson(content);},
		error: function() {console.log("couldn't load json");}
	});

	var model = {
		init: function() {
			data = {
				nameToTable: {},
				tableToNames: {},
				allNames: []
			};
		},

		clear: function() {
			data.nameToTable = {};
			data.tableToNames = {};
			data.allNames = [];
		},

		updateAllNames: function() {
			data.allNames = Object.keys(data.nameToTable);
		},

		addTableToNameMapping: function(table, name) {
			if (!data.tableToNames[table]) {
				data.tableToNames[table] = [name];
			}
			else {
				data.tableToNames[table].push(name);
			}
		},

		addNameToTableMapping: function(name, table) {
			if (!data.nameToTable[name]) {
				data.nameToTable[name] = [table];
			}
			else {
				data.nameToTable[name].push(table);
			}
		},

		substringMatcher: function(strs) {
			return function findMatches(q, cb) {
				var matches, substringRegex;

				// an array that will be populated with substring matches
				matches = [];

				// regex used to determine if a string contains the substring `q`
				substrRegex = new RegExp(q, 'i');

				// iterate through the pool of strings and for any string that
				// contains the substring `q`, add it to the `matches` array
				$.each(strs, function(i, str) {
					if (substrRegex.test(str)) {
						matches.push(str);
					}
				});
				cb(matches);
			};
		}
	};

	var csvInput = {
		init: function() {
			$("#upload").click(function() {
				model.clear();
				if (document.getElementById('input-csv').files[0] != undefined) {
					var fileToRead = document.getElementById('input-csv').files[0];
					controller.processCSV(fileToRead);
					alert("CSV successfully uploaded");
				}
				else if (document.getElementById('input-csv').files[0] == undefined) {
					alert("Please upload a CSV");
				}
				searchResults.clear();
				document.getElementById("input-name").value = "";
			});
			$("#input-csv").change(function(e) {
				$("#filename").text(e.target.files[0].name);
			});
		}
	}

	var searchResults = {
		init: function() {
			$("#search").click(function() {
				controller.search(document.getElementById("input-name").value);
			});
			$("#input-name").pressEnter(function() {
				$(".typeahead").typeahead('close');
				controller.search(document.getElementById("input-name").value)
			});
			$(".tt-input").css("verticalAlign", "middle");
		},

		clear: function() {
			$("#results-table thead").empty();
			$("#results-table tbody").empty();
		},

		formatForDisplay: function(results) {
			var toRender = "";
			for (var i=0; i < results.length; i++) {
				var result = results[i];
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
			csvInput.init();
			searchResults.init();
		},

		search: function(value) {
			if (value != "") {
				searchResults.clear();
				var results = controller.getTableAndOthersAtTable(value);
				var toRender = searchResults.formatForDisplay(results);
				searchResults.render(toRender);
			}
		},

		getTableGivenName: function(name) {
			if (data.nameToTable[name.toLowerCase()]) {
				return data.nameToTable[name.toLowerCase()];
			}
			return [];
		},

		getNamesGivenTable: function(table) {
			if (data.tableToNames[table]) {
				return data.tableToNames[table];
			}
			return [];
		},

		getTableAndOthersAtTable: function(name) {
			var tables = controller.getTableGivenName(name);
			var results = [];
			for (var t=0; t < tables.length; t++) {
				var table = tables[t];
				var namesGivenTable = controller.getNamesGivenTable(table);
				var othersAtTable = "";
				for (var i=0; i<namesGivenTable.length; i++) {
					var nameAtTable = namesGivenTable[i];
					if (nameAtTable.toLowerCase() != name.toLowerCase()) {
						othersAtTable += namesGivenTable[i] + ", ";
					}
				}
				results.push({
					table: table,
					othersAtTable: othersAtTable.substring(0, othersAtTable.length-2)
				});
			}
			return results;
		},

		processCSV: function(fileName) {
			model.clear();
			var reader = new FileReader();
		    reader.onload = function() {
		    	var fileContents = this.result.split("\n");
		    	for (var i = 1; i < fileContents.length; i++) {
		    		if (fileContents[i].indexOf(",")!=-1) {
		    			var mapping = fileContents[i].replace(/"/g,"").replace(/\s+/g,"").split(",");
			    		model.addTableToNameMapping(mapping[0], mapping[1]);
				    	model.addNameToTableMapping(mapping[1], mapping[0]);
		    		}
		    	}
		    	controller.startAutocomplete();
		    }
		    reader.readAsText(fileName);	
		},

		readAndProcessCSV: function(content) {
			model.clear();
			var fileContents = content.split("\n");
	    	for (var i = 1; i < fileContents.length; i++) {
	    		if (fileContents[i].indexOf(",")!=-1) {
	    			var mapping = fileContents[i].replace(/"/g,"").replace(/\s+/g,"").split(",");
		    		model.addTableToNameMapping(mapping[0], mapping[1]);
			    	model.addNameToTableMapping(mapping[1], mapping[0]);
	    		}
	    	}
	    	model.updateAllNames();
	    	controller.startAutocomplete();
		},

		readAndProcessJson: function(content) {
			model.clear();
	    	for (var i = 0; i < content.length; i++) {
	    		model.addTableToNameMapping(content[i].table, content[i].name);
		    	model.addNameToTableMapping(content[i].name, content[i].table);
	    	}
	    	model.updateAllNames();
	    	controller.startAutocomplete();
		},

		startAutocomplete: function() {
			model.updateAllNames();
	    	$('.typeahead').typeahead({
				hint: true,
				highlight: true,
				minLength: 0
			},
			{
				name: 'names',
				limit: data.allNames.length,
				source: model.substringMatcher(data.allNames)
			});
			$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
				controller.search(suggestion);
			});
		}
	};

	controller.init();
});
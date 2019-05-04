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

	$.ajax({
		url: "http://margaretyu.me/seatMe/kimjeremywedding.csv",
		dataType: "text",
		success: function(content) {controller.readAndProcessCSV(content);},
		error: function() {console.log("couldn't load csv");}
	});

	// $.ajax({
	// 	url: "https://api.myjson.com/bins/sicz4",
	// 	dataType: "json",
	// 	success: function(content) {controller.readAndProcessJson(content);},
	// 	error: function() {console.log("couldn't load json");}
	// });

	var model = {
		init: function() {
			data = {
				nameToTable: {},
				tableToNames: {},
				allNames: []
			};
		},

		clear: function() {
			if (typeof(Storage) !== "undefined") {
				localStorage.clear();
			}
			data.nameToTable = {};
			data.tableToNames = {};
			data.allNames = [];
		},

		updateAllNames: function() {
			data.allNames = Object.keys(data.nameToTable).sort();
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

	var fileInput = {
		init: function() {
			$("#upload").click(function() {
				model.clear();
				var file = document.getElementById('input-file').files[0];
				if (file == undefined || (file.name.substring(file.name.length-3, file.name.length) != "csv" && file.name.substring(file.name.length-4, file.name.length) != "json")) {
					alert("Please upload a CSV or JSON");
				}
				else if (file != undefined) {
					if (file.name.substring(file.name.length-3, file.name.length) == "csv") {
						controller.processCSV(file);
						alert("CSV successfully uploaded");
					}
					else if (file.name.substring(file.name.length-4, file.name.length) == "json") {
						controller.processJSON(file);
						alert("JSON successfully uploaded");
					}

				}
				$("#upload-text").css("display", "inline-block");
				searchResults.clear();
				document.getElementById("input-name").value = "";
				nameInput.init();
			});
			$("#input-file").change(function(e) {
				$("#filename").text(e.target.files[0].name);
			});
		}
	}

	var nameInput = {
		init: function() {
			$("#input-name").on("click", function() {
				$("#input-name").trigger("focus");
				nameInput.selectAll();
			});
			setTimeout(function(){
			    $("#input-name").trigger("click");
			});
		},

		selectAll: function() {
			setTimeout(function() {
				$("#input-name").select();
			});
		}
	};

	var searchResults = {
		init: function() {
			$("#search").click(function() {
				controller.search(document.getElementById("input-name").value);
			});
			$("#input-name").pressEnter(function() {
				controller.search(document.getElementById("input-name").value);
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
			$("#results-table thead").append("<tr><th>Table</td><td>Others at table</th></tr>");
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
			fileInput.init();
			nameInput.init();
			searchResults.init();
			if (typeof(Storage) !== "undefined") {
			    if (localStorage.getItem("fileType")) {
			    	$("#upload-text").css("display", "inline-block");
			    	if (localStorage.getItem("fileType") == "csv") {
			    		controller.readAndProcessCSV(localStorage.getItem("data"));
			    	}
			    	else if (localStorage.getItem("fileType") == "json") {
			    		controller.readAndProcessJson(JSON.parse(localStorage.getItem("data")));
			    	}
			    }
			    else {
			    	$("#upload-text").css("display", "none");
			    }
			} else {
			    console.log("No web storage support");
			}
		},

		search: function(value) {
			if (value != "") {
				setTimeout(function(){
				    $("#input-name").trigger("click");
				});
				searchResults.clear();
				var results = controller.getTableAndOthersAtTable(value);
				var toRender = searchResults.formatForDisplay(results);
				searchResults.render(toRender);
			}
		},

		getTableGivenName: function(name) {
			for (var i=0; i<data.allNames.length; i++) {
				if (data.allNames[i].toLowerCase() == name.toLowerCase()) {
					return data.nameToTable[data.allNames[i]];
				}
			}
			return [];
		},

		getNamesGivenTable: function(table) {
			if (data.tableToNames[table]) {
				return data.tableToNames[table].sort();
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
		    			var mapping = fileContents[i].replace(/"/g,"").trim().split(",");
			    		model.addTableToNameMapping(mapping[0], mapping[1]);
				    	model.addNameToTableMapping(mapping[1], mapping[0]);
		    		}
		    	}
		    	controller.saveData("csv", this.result);
		    	controller.startAutocomplete();
		    }
		    reader.readAsText(fileName);	
		},

		processJSON: function(fileName) {
			model.clear();
			var reader = new FileReader();
		    reader.onload = function() {
		    	var content = JSON.parse(this.result);
		    	for (var i = 0; i < content.length; i++) {
		    		model.addTableToNameMapping(content[i].table, content[i].name);
			    	model.addNameToTableMapping(content[i].name, content[i].table);
		    	}
		    	controller.saveData("json", this.result);
		    	controller.startAutocomplete();
		    }
		    reader.readAsText(fileName);
		},

		readAndProcessCSV: function(content) {
			model.clear();
			var fileContents = content.split("\n");
	    	for (var i = 1; i < fileContents.length; i++) {
	    		if (fileContents[i].indexOf(",")!=-1) {
	    			var mapping = fileContents[i].replace(/"/g,"").trim().split(",");
		    		model.addTableToNameMapping(mapping[0], mapping[1]);
			    	model.addNameToTableMapping(mapping[1], mapping[0]);
	    		}
	    	}
	    	controller.saveData("csv", content);
	    	controller.startAutocomplete();
		},

		readAndProcessJson: function(content) {
			model.clear();
	    	for (var i = 0; i < content.length; i++) {
	    		model.addTableToNameMapping(content[i].table, content[i].name);
		    	model.addNameToTableMapping(content[i].name, content[i].table);
	    	}
	    	controller.saveData("json", JSON.stringify(content));
	    	controller.startAutocomplete();
		},

		saveData: function(fileType, data) {
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("fileType", fileType);
				localStorage.setItem("data", data);
				$("#upload-text").css("display", "inline-block");
			}
		},

		startAutocomplete: function() {
			$('.typeahead').typeahead('destroy');
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
				$('.typeahead').typeahead('val', suggestion);
				controller.search(suggestion);
			});
		}
	};

	controller.init();
});
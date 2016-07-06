$(function() {
	var model = {

		init: function() {
			data = {
				existingStudents: [],
				newStudents: [],
				orgs: []
			};		
		},

		addExistingStudent: function(studentName, studentTraits, studentOrgs) {
			data.existingStudents.push({
				name: studentName,
				traits: studentTraits,
				orgs: studentOrgs
			});
		},

		addNewStudent: function(studentName, studentTraits) {
			data.newStudents.push({
				name: studentName,
				traits: studentTraits,
				orgs: [],
				matchPercentage: []
			});
		},

		addOrg: function(orgName) {
			data.orgs.push({
				name: orgName,
				traits: new Array(13).fill(0),
				students: []
			});
		},

		match: function() {
			var existing = data.existingStudents;
			var organizations = data.orgs;
			for (var e = 0; e < existing.length; e++) {
				var student = existing[e];
				for (var o = 0; o < student.orgs.length; o++) {
					var org = student.orgs[o];
					if (organizations[org].students.indexOf(e) == -1) {
						organizations[org].students.push(e);
					}
				}
			}

			for (var o = 0; o < organizations.length; o++) {
				var org = organizations[o];
				var students = org.students;
				for (var s = 0; s < students.length; s++) {
					var student = students[s];
					for (var t = 0; t < org.traits.length; t++) {
						org.traits[t] += existing[student].traits[t];
					}
				}
				for (var t = 0; t < org.traits.length; t++) {
					org.traits[t] /= parseFloat(students.length);
				}
			}				
			for (var n = 0; n < data.newStudents.length; n++) {
				var student = data.newStudents[n];
				var orgNearest = [];
				var v1 = student.traits;
				for (var o = 0; o < data.orgs.length; o++) {
					var v2 = data.orgs[o].traits;
					orgNearest.push(model.dist(v1, v2));
				}
				var top5 = [];
				while (top5.length < 5) {
					var topOrg = orgNearest.indexOf(Math.min.apply(Math, orgNearest));
					top5.push(topOrg);
					student.matchPercentage.push((100-orgNearest[topOrg]).toFixed(4));
					orgNearest[topOrg] = Math.max.apply(Math, orgNearest);
				}
				student.orgs = top5;
			}			
		},

		dist: function(v1, v2) {
			var sum = 0;
			v1.forEach(function(val, index) {
				sum += Math.pow(val - v2[index], 2);
			});
			return Math.sqrt(sum);
		}
	};

	var controller = {

		init: function() {
			model.init();
			inputView.init();
			matchResults.init();
			searchResults.init();
		},

		getExistingStudents: function() {
			return data.existingStudents;
		},

		getExistingStudent: function(index) {
			return data.existingStudents[index];
		},

		getNewStudents: function() {
			return data.newStudents;
		},

		getNewStudent: function(index) {
			return data.newStudents[index];
		},

		getOrgs: function() {
			return data.orgs;
		},

		getOrg: function(index) {
			return data.orgs[index];
		},

		readExistingStudentsFile: function(fileName) {
		    var reader = new FileReader();
		    reader.onload = function() {
		    	var fileContents = this.result.split("\n");
		    	for (var i = 0; i < fileContents.length-1; i++) {
		    		var studentInfo = fileContents[i].split(",");
		    		var clubsString = studentInfo[15].split(" ");
		    		var clubs = [];
		    		for (var c = 0; c < clubsString.length; c++) {
		    			clubs.push(parseInt(clubsString[c]));
		    		}
		    		model.addExistingStudent(studentInfo[1], [parseInt(studentInfo[2]), parseInt(studentInfo[3]), parseInt(studentInfo[4]), parseInt(studentInfo[5]), parseInt(studentInfo[6]), parseInt(studentInfo[7]), parseInt(studentInfo[8]), parseInt(studentInfo[9]), parseInt(studentInfo[10]), parseInt(studentInfo[11]), parseInt(studentInfo[12]), parseInt(studentInfo[13]), parseInt(studentInfo[14])], clubs);
		    	}
		   }
		   reader.readAsText(fileName);
		},

		readOrgsFile: function(fileName) {
			var reader = new FileReader();
			reader.onload = function() {
				var fileContents = this.result.split("\n");
				for (var i = 0; i < fileContents.length-1; i++) {
					var orgInfo = fileContents[i].split(",");
					model.addOrg(orgInfo[1]);
				}			
			}
			reader.readAsText(fileName);
		},

		readNewStudentsFile: function(fileName) {
		    var reader = new FileReader();
		    reader.onload = function() {
		    	var fileContents = this.result.split("\n");
		    	for (var i = 0; i < fileContents.length-1; i++) {
		    		var studentInfo = fileContents[i].split(",");
		    		model.addNewStudent(studentInfo[1], [parseInt(studentInfo[2]), parseInt(studentInfo[3]), parseInt(studentInfo[4]), parseInt(studentInfo[5]), parseInt(studentInfo[6]), parseInt(studentInfo[7]), parseInt(studentInfo[8]), parseInt(studentInfo[9]), parseInt(studentInfo[10]), parseInt(studentInfo[11]), parseInt(studentInfo[12]), parseInt(studentInfo[13]), parseInt(studentInfo[14])]);
		    	}
		   }
		   reader.readAsText(fileName);			
		},

		match: function() {
			model.match();
			matchResults.render();
		},

		getTrait: function(number) {
			switch(number)  {
				case 0:
					return "ethics";
					break;
				case 1:
					return "composure";
					break;
				case 2:
					return "sociability";
					break;
				case 3:
					return "cooperation";
					break;
				case 4:
					return "motivation";
					break;
				case 5:
					return "composure2";
					break;
				case 6:
					return "flexibility";
					break;
				case 7:
					return "practicality";
					break;
				case 8:
					return "curiosity";
					break;
				case 9:
					return "creativity";
					break;
				case 10:
					return "coaching";
					break;
				case 11:
					return "persuasiveness";
					break;
				case 12:
					return "analytical";
					break;
				default:
					break;
			}
		},

		clear: function() {
			model.data = {};
		},

		search: function(studentName) {
			var studentString = "";
			for (var s = 0; s < data.newStudents.length; s++) {
				var student = data.newStudents[s];
				if (student.name == studentName.toUpperCase()) {
					var clubsForStudent = student.orgs;
					var clubsString = "";
					for (var c = 0; c < clubsForStudent.length; c++) {
						var club = data.orgs[clubsForStudent[c]];
						clubsString += club.name + "<br>";
					}
					clubsString = clubsString.substring(0, clubsString.length-4);
					var matchString = "";
					for (var m = 0; m < student.matchPercentage.length; m++) {
						matchString += student.matchPercentage[m] + "%<br>";
					}
					matchString = matchString.substring(0, matchString.length-5) + "%";
					studentString += "<tr><td>" + student.name + "</td><td>" + clubsString + "</td><td>" + matchString + "</td></tr>";
					return studentString;
				}
			}
		}

	};

	var inputView = {
		init: function() {
			$("#match").click(function() {
				controller.clear();
				if (document.getElementById('file-name-orgs').files[0] != undefined && document.getElementById('file-name-existing').files[0] != undefined && document.getElementById('file-name-new').files[0] != undefined) {
					var existingStudentsFile = document.getElementById('file-name-existing').files[0];
					var newStudentsFile = document.getElementById('file-name-new').files[0];
					var orgsFile = document.getElementById('file-name-orgs').files[0];
					controller.readExistingStudentsFile(existingStudentsFile);
					controller.readNewStudentsFile(newStudentsFile);
					controller.readOrgsFile(orgsFile);
					controller.match();
				}
				else if (document.getElementById('file-name-orgs').files[0] == undefined && document.getElementById('file-name-existing').files[0] == undefined && document.getElementById('file-name-new').files[0] == undefined) {
					alert("Please upload all three CSVs to match new students to clubs");
				}
			});
		}
	};

	var matchResults = {
		init: function() {
			$("#clubs").click(function() {
				matchResults.displayClubs();
			});
			$("#students").click(function() {
				matchResults.displayStudents();
			});
		},

		displayClubs: function() {
			var addToTable = "";
			var organizations = controller.getOrgs();
			for (var o = 0; o < organizations.length; o++) {
				var org = organizations[o];
				var studentsInClub = org.students;
				var studentsString = "";			
				for (var s = 0; s < studentsInClub.length; s++) {
					studentsString += controller.getExistingStudent(studentsInClub[s]).name + ", ";
				}
				var prominentTraitsString = "";
				var temp = org.traits;
				for (var i = 0; i < 5; i++) {
					var maxIndex = temp.indexOf(Math.max.apply(Math, org.traits));
					prominentTraitsString += controller.getTrait(maxIndex) + ", ";
					temp[maxIndex] = Math.min.apply(Math, temp);
				}
				studentsString = studentsString.substring(0, studentsString.length-2);
				prominentTraitsString = prominentTraitsString.substring(0, prominentTraitsString.length-2);
				addToTable += "<tr><td><p>" + org.name + "</p><p>" + studentsInClub.length + " students</p></td><td>" + studentsString + "</td><td>" + prominentTraitsString + "</td></tr>";
			}
			$("#clubs-table tbody").append(addToTable);
		},

		displayStudents: function() {
			var addToTable = "";
			var newStudents = controller.getNewStudents();		
			for (var s = 0; s < newStudents.length; s++) {
				var student = controller.getNewStudent(s);
				var clubsForStudent = student.orgs;
				var clubsString = "";
				for (var c = 0; c < clubsForStudent.length; c++) {
					var club = controller.getOrg(clubsForStudent[c]);
					clubsString += club.name + ", ";
				}
				clubsString = clubsString.substring(0, clubsString.length-2);
				addToTable += "<tr><td><p>" + student.name + "</p><p>" + clubsForStudent.length + " clubs</p></td><td>" + clubsString + "</td></tr>";
			}				
			var existingStudents = controller.getExistingStudents();
			for (var s = 0; s < existingStudents.length; s++) {
				var student = controller.getExistingStudent(s);
				var clubsForStudent = student.orgs;
				var clubsString = "";
				for (var c = 0; c < clubsForStudent.length; c++) {
					var club = controller.getOrg(clubsForStudent[c]);
					clubsString += club.name + ", ";
				}
				clubsString = clubsString.substring(0, clubsString.length-2);
				addToTable += "<tr><td><p>" + student.name + "</p><p>" + clubsForStudent.length + " clubs</p></td><td>" + clubsString + "</td></tr>";
			}
			$("#students-table tbody").append(addToTable);
		},

		render: function() {
			var newStudents = controller.getNewStudents();
			for (var s = 0; s < newStudents.length; s++) {
				var student = controller.getNewStudent(s);
				var orgs = student.orgs;
				var orgString = "";
				for (o = 0; o < orgs.length; o++) {
					var org = student.orgs[o];
					orgString += controller.getOrg(org).name + "<br>";
				}
				var matchString = "";
				for (m = 0; m < student.matchPercentage.length; m++) {
					matchString += student.matchPercentage[m] + "%" + "<br>";
				}
				orgString = orgString.substring(0, orgString.length-1);
				matchString = matchString.substring(0, matchString.length-1);
				result = "<tr><td>" + student.name + "</td><td>" + orgString + "</td><td>" + matchString + "</td></tr>";
				$("#match-table tbody").append(result);
			}
		}
	};

	var searchResults = {
		init: function() {
			$("#search").click(function() {
				var toRender = controller.search(document.getElementById("search-box").value);
				searchResults.render(toRender);
			});
		},

		render: function(toRender) {
			$("#student-table thead").empty();
			$("#student-table tbody").empty();
			$("#student-table thead").append("<td>New Student Name</td><td>Suggested Clubs</td><td>Match Percentage</td></tr>");
			if (toRender == "") {
				$("#student-table tbody").append("<tr><td>No student found</td></tr>");
			}
			else {
				$("#student-table tbody").append(toRender);
			}
		}
	};

	controller.init();

});
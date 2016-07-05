$(document).ready(function() {
	var data = {
		existingStudents: [],
		newStudents: [],
		orgs: []
	};

	document.getElementById('match-button').addEventListener('click', match, false);

	function match() {
		if (document.getElementById('file-name-orgs').files[0] != undefined && document.getElementById('file-name-existing').files[0] != undefined && document.getElementById('file-name-new').files[0] != undefined) {
			readOrgsFile(document.getElementById('file-name-orgs').files[0]);
			readExistingStudentsFile(document.getElementById('file-name-existing').files[0]);
			readNewStudentsFile(document.getElementById('file-name-new').files[0]);

		if (data.existingStudents.length > 0 && data.newStudents.length > 0 && data.orgs.length > 0) {
			var traits = data.existingStudents[0].traits.length;
			for (var existingIndex = 0; existingIndex < data.existingStudents.length; existingIndex++) {
				var student = data.existingStudents[existingIndex];
				for (var orgIndex = 0; orgIndex < student.orgs.length; orgIndex++) {
					org = parseInt(student.orgs[orgIndex])
					data.orgs[org].students.push(existingIndex);
				}
			}
			for (var oIndex = 0; oIndex < data.orgs.length; oIndex++) {
				var org = data.orgs[oIndex];
				var students = org.students;
				for (sIndex = 0; sIndex < students.length; sIndex++) {
					var student = students[sIndex];
					for (var t = 0; t < traits; t++) {
						org.traits[t] += data.existingStudents[student].traits[t];
					}
				}
				for (var tIndex = 0; tIndex < traits; tIndex++) {
					org.traits[tIndex] /= parseFloat(org.students.length);
				}
			}
			for (var newIndex = 0; newIndex < data.newStudents.length; newIndex++) {
				var student = data.newStudents[newIndex];
				var orgNearest = [];
				var v1 = student.traits;
				for (var orgIndex = 0; orgIndex < data.orgs.length; orgIndex++) {
					var v2 = data.orgs[orgIndex].traits;
					orgNearest.push(dist(v1, v2));
				}
				var top5 = [];
				while (top5.length < 5) {
					var topOrg = orgNearest.indexOf(Math.min.apply(Math, orgNearest));
					top5.push(topOrg);
					student.matchPercentage.push((100-orgNearest[topOrg]).toFixed(4));
					orgNearest[topOrg] = Math.max.apply(Math, orgNearest);
				}
				student.orgs = top5;
				for (var topIndex = 0; topIndex < top5.length; topIndex++) {
					var org = top5[topIndex];
					data.orgs[org].students.push(student);
				}
			}
			for (var stud = 0; stud < data.newStudents.length; stud++) {
				var student = data.newStudents[stud];
				var orgs = student.orgs;
				var orgString = "";
				for (oIndex = 0; oIndex < orgs.length; oIndex++) {
					var org = student.orgs[oIndex];
					orgString += data.orgs[org].name + ", ";
				}
				var matchString = "";
				for (mIndex = 0; mIndex < student.matchPercentage.length; mIndex++) {
					matchString += student.matchPercentage[mIndex] + ", ";
				}
				orgString = orgString.substring(0, orgString.length-2);
				matchString = matchString.substring(0, matchString.length-2);
				result = "<tr><td>" + student.name + "</td><td>" + orgString + ", " + matchString + "</td></tr>";
				$("#match-table tbody").append(result);
			}
		}

		} else {
			alert('please upload all three CSV files to match new students to organizations');
		}
	}

	function readOrgsFile (file) {
		var reader = new FileReader();
		reader.onload = function() {
			var fileContents = this.result.split("\n");
			for (var i = 0; i < fileContents.length-1; i++) {
				var orgInfo = fileContents[i].split(",");
				var orgObject = {};
				orgObject["name"] = orgInfo[1];
				orgObject["traits"] = new Array(13).fill(0);
				orgObject["students"] = [];
				data.orgs.push(orgObject);
			}
		}
		reader.readAsText(file);
	}

	function readExistingStudentsFile (file) {   
	    var reader = new FileReader();
	    reader.onload = function() {
	    	var fileContents = this.result.split("\n");
	    	for (var i = 0; i < fileContents.length-1; i++) {
	    		var studentInfo = fileContents[i].split(",");
	    		var studentObject = {};
	    		studentObject["name"] = studentInfo[1];
	    		studentObject["traits"] = [parseInt(studentInfo[2]), parseInt(studentInfo[3]), parseInt(studentInfo[4]), parseInt(studentInfo[5]), parseInt(studentInfo[6]), parseInt(studentInfo[7]), parseInt(studentInfo[8]), parseInt(studentInfo[9]), parseInt(studentInfo[10]), parseInt(studentInfo[11]), parseInt(studentInfo[12]), parseInt(studentInfo[13]), parseInt(studentInfo[14])];
	    		studentObject["orgs"] = studentInfo[15].split(" ");
	    		data.existingStudents.push(studentObject);
	    	}
	   }
	   reader.readAsText(file);
	}

	function readNewStudentsFile (file) {   
	    var reader = new FileReader();
	    reader.onload = function() {
	    	var fileContents = this.result.split("\n");
	    	for (var i = 0; i < fileContents.length-1; i++) {
	    		var studentInfo = fileContents[i].split(",");
	    		var studentObject = {};
	    		studentObject["name"] = studentInfo[1];
	    		studentObject["traits"] = [parseInt(studentInfo[2]), parseInt(studentInfo[3]), parseInt(studentInfo[4]), parseInt(studentInfo[5]), parseInt(studentInfo[6]), parseInt(studentInfo[7]), parseInt(studentInfo[8]), parseInt(studentInfo[9]), parseInt(studentInfo[10]), parseInt(studentInfo[11]), parseInt(studentInfo[12]), parseInt(studentInfo[13]), parseInt(studentInfo[14])];
	    		studentObject["orgs"] = [];
	    		studentObject["matchPercentage"] = [];
	    		data.newStudents.push(studentObject);
	    	}
	   }
	   reader.readAsText(file);
	}

	function getTrait(number) {
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
	}

	function dist(v1, v2) {
		var sum = 0;
		v1.forEach(function(val, index) {
			sum += Math.pow(val - v2[index], 2);
		});
		return Math.sqrt(sum);
	}

});
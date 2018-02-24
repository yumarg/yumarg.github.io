$(document).ready(function() {

	$('[data-typer-targets]').typer();

    $('#home').click(function() {
        $('#homepage').css('display', 'block');
        $('#who').css('display', 'none');
        $('#what').css('display', 'none');
        $('#when').css('display', 'none');
        $('#where').css('display', 'none');
        $('#why').css('display', 'none');
    });

	$('.hobby').on('mouseenter', function() {
		console.log("enlarge");
		var fontSize = parseInt($(this).css("font-size"));
		fontSize += 2;
		$(this).css({"font-size": fontSize + "px"});
	});

	$('.hobby').on('mouseleave', function() {
		console.log("shrink");
		var fontSize = parseInt($(this).css("font-size"));
		fontSize -= 2;
		$(this).css({"font-size": fontSize + "px"});
	});

	var projects = [
	{
		"name": "Reuse",
        "url": "https://docs.google.com/presentation/d/1MTHYYev6VI_aiPXRhQX89M7QGqcS1Iu5apUkKaPcZpU/edit?usp=sharing",
        "date": "Aug 2017 to Present",
        "tools": "Figma, Swift, Xcode",
        "description": "Led a seven-member Design for America team in the design and development of a mobile app encouraging reusing on MIT's campus",
        "picture": "images/reuse.png",
        "types": "mobile app"
	},
	{
        "name": "SpeeDoodle",
        "url": "https://chrome.google.com/webstore/detail/speedoodle/lalbcphldbcignmifdmgjdidkegjhecd",
        "date": "Jan 2018",
        "tools": "HTML, CSS, JavaScript",
        "description": "Designed, developed, and distributed a chrome extension that allows a user to doodle on a New Tab page",
        "picture": "images/speedoodle.png",
        "types": "chrome extension, personal project"
    },  
    {
        "name": "Code is Art",
        "url": "http://margaretyu.me/codeisart",
        "date": "June 2017",
        "tools": "HTML, p5.js, Processing, JavaScript, Git",
        "description": "Designed and wrote code for an animated art piece",
        "picture": "images/codeisart.gif",
        "types": "personal project"
    },
    {
        "name": "ACCESS2",
        "url": "https://access2.herokuapp.com",
        "date": "October 2016",
        "tools": "HTML, CSS, JavaScript, jQuery, Node.js, Express.js, Heroku, Leaflet.js, Twilio API, Git",
        "description": "Built a web app for WHACK16 in a team of 2 that provides info about Wellesley College access van stops and can send a text when the van is approaching",
        "picture": "images/access2.gif",
        "types": "hackathon project, web app"
    },
    {
        "name": "DoneGood",
        "url": "http://donegood.co",
        "date": "Oct 2015 to Oct 2016",
        "tools": "HTML, CSS, JavaScript, Node.js, Express.js, Jade, MongoDB",
        "description": "Prototyped a web application for DoneGood, a startup that connects consumers with businesses that share their values",
        "picture": "images/donegood.PNG",
        "types": "startup project, web app"
    },            
    {
        "name": "S'mores",
        "url": "http://smoresplanner.herokuapp.com",
        "date": "Jan 2016",
        "tools": "HTML, CSS, JavaScript, jQuery, Node.js, Express.js, Handlebars.js, Heroku, Git",
        "description": "Built a weekly meal planning web application using fullstack web development tools",
        "picture": "images/smores.PNG",
        "types": "web app"
    },
    {
        "name": "Big Data Analytics for Andorra",
        "url": "http://web.mit.edu/margyu/www/hourly/hourly.html",
        "date": "Sept 2015 to Jan 2016",
        "tools": "Python, Processing, R, HTML, CSS, JavaScript, Leaflet.js",
        "description": "Performed data analysis and created data visualizations to understand Andorra's dynamics on tourism and human mobility",
        "picture": "images/andorra.PNG",
        "types": "research project, data viz"
    },            
    {
        "name": "Glance",
        "url": "http://viral.media.mit.edu",
        "date": "July 2015 to Aug 2015",
        "tools": "HTML, CSS, JavaScript, jQuery, Leaflet.js, Git",
        "description": "Designed and built a map visualization for exploring geographical and topical relationships between news articles",
        "picture": "images/glance.PNG",
        "types": "research project, data viz"
    },        
    {
        "name": "Learning Media",
        "url": "http://viral.media.mit.edu",
        "date": "Jan 2015 to June 2015",
        "tools": "HTML, CSS, Bootstrap, JavaScript, jQuery, D3.js, Git",
        "description": "Designed various UI features for the dashboard for Learning Media, a web application that enables users to customize how they experience different forms of media",
        "picture": "images/learningmedia.gif",
        "types": "research project, web app"
    },       
    {
        "name": "Guess It",
        "url": "http://margaretyu.me/GuessIt",
        "date": "June 2015",
        "tools": "HTML, CSS, JavaScript, jQuery, Git",
        "description": "Designed and wrote code for a number sequence guessing game",
        "picture": "images/guessit.PNG",
        "types": "personal project, web game"
    },      
    {
        "name": "College Kickstart",
        "url": "https://www.college-kickstart.com/",
        "date": "Jan 2015",
        "tools": "HTML, CSS, UI Kit, Google Visualization API, JavaScript, jQuery, Joomla!, PHP, MySQL",
        "description": "Analyzed data from and created data visualizations of Beta Testing results of the first version of College Kickstart, a web-based college application planning service",
        "picture": "images/collegekickstart.gif",
        "types": "intern project, data viz"
    },
    {
        "name": "MIT2048",
        "url": "http://margaretyu.me/MIT2048",
        "date": "June 2014",
        "tools": "HTML, CSS, JavaScript, jQuery, Git",
        "description": "Designed an MIT-Class-of-2018-themed 2048 game",
        "picture": "images/MIT2048.PNG",
        "types": "personal project, web game"
    }];

    var profiles = [
    {
        "name": "GitHub",
        "url": "https://github.com/yumarg",
        "icon": "fab fa-github fa-7x",
        "tooltip": "See my projects on GitHub",
        "color": "#333333"
    },
    {
        "name": "LinkedIn",
        "url": "https://www.linkedin.com/in/margyu",
        "icon": "fab fa-linkedin fa-7x",
        "tooltip": "See my profile on LinkedIn",
        "color": "#0077b5"
    },
    {
        "name": "Pinterest",
        "url": "https://pinterest.com/yumarg",
        "icon": "fab fa-pinterest fa-7x",
        "tooltip": "See my saved pins on Pinterest",
        "color": "#bd081c"
    },       
    {
        "name": "Instagram",
        "url": "https://instagram.com/themyuse",
        "icon": "fab fa-instagram fa-7x",
        "tooltip": "See my pictures on Instagram",
        "color": "#833ab4"
    },
    {
        "name": "Wordpress",
        "url": "https://fromthemuseinme.wordpress.com",
        "icon": "fab fa-wordpress fa-7x",
        "tooltip": "See my Wordpress website + blog",
        "color": "#21759b"
    }];

    var influences = [
    {
    	"type": "quote",
    	"text": "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    	"source": "2 Tim 1:7 NKJV",
    	"picture": ""
	},
	{
		"type": "quote",
		"text": "Let it go, let it leave, let it happen.<br/>Nothing in this world was promised or belonged to you anyway.",
		"source": "Rupi Kaur, Milk and Honey",
		"picture": ""
	},
	{
		"type": "pic",
		"text": "",
		"source": "",
		"picture": "images/chibirdmotivationalpenguin.gif"
	}];

	displayProjects(projects);
	displayProfiles(profiles);
	displayInfluences(influences);

	$('#nav-who').click(function() {
		$('#homepage').css('display', 'none');
		$('#who').css('display', 'block');
	});

	$('#nav-what').click(function() {
		$('#homepage').css('display', 'none');
		$('#what').css('display', 'block');
	});

	$('#nav-when').click(function() {
		$('#homepage').css('display', 'none');
		$('#when').css('display', 'block');
	});

	$('#nav-where').click(function() {
		$('#homepage').css('display', 'none');
		$('#where').css('display', 'block');
	});

	$('#nav-why').click(function() {
		$('#homepage').css('display', 'none');
		$('#why').css('display', 'block');
	});

	$('#who .left').click(function() {
		$('#who').css('display', 'none');
		$('#homepage').css('display', 'block');
	});

	$('#who .right').click(function() {
		$('#who').css('display', 'none');
		$('#what').css('display', 'block');
	});

	$('#what .left').click(function() {
		$('#what').css('display', 'none');
		$('#who').css('display', 'block');
	});

	$('#what .right').click(function() {
		$('#what').css('display', 'none');
		$('#when').css('display', 'block');
	});

	$('#when .left').click(function() {
		$('#when').css('display', 'none');
		$('#what').css('display', 'block');
	});

	$('#when .right').click(function() {
		$('#when').css('display', 'none');
		$('#where').css('display', 'block');
	});

	$('#where .left').click(function() {
		$('#where').css('display', 'none');
		$('#when').css('display', 'block');
	});

	$('#where .right').click(function() {
		$('#where').css('display', 'none');
		$('#why').css('display', 'block');
	});

	$('#why .left').click(function() {
		$('#why').css('display', 'none');
		$('#where').css('display', 'block');
	});

	$('#why .right').click(function() {
		$('#why').css('display', 'none');
		$('#homepage').css('display', 'block');
	});

	function showTools(tools) {
	    var add = "";
	    tools = tools.split(',');
	    $.each(tools, function(toolIndex, tool) {
	        add += "<div class='tool'>"+tool+"</div>";
	    });
	    return add;
	}

	function showTypes(types) {
	    var add = "";
	    types = types.split(',');
	    $.each(types, function(typeIndex, type) {
	        add += "<div class='type'>"+type+"</div>";
	    });
	    return add;
	}

	function displayProjects(projects) {
	    var projectsToAdd = "";
	    $.each(projects, function(projectsIndex, project) {
	        projectsToAdd += "<div class='project col-md-3 col-sm-6 col-xs-12 container'><a class='project-container' href='"+project.url+"' target='_blank' title='"+project.name+"'><div class='project-container'><div class='project-about'><p class='project-date'>"+project.date+"</p><p class='project-name'>"+project.name+"</p><div class='project-tools'>"+showTools(project.tools)+showTypes(project.types)+"</div></div><div style='background-image: url("+project.picture+"); background-size: 95%; background-position: center top; background-repeat: no-repeat' class='project-blurb'><p class='project-desc'>"+project.description+"</p></div></div></a></div>";
	    });
	    $("#projects").append(projectsToAdd);
	}

	function makeImg(icon, color) {
        return "<i style='color: "+color+"' class='"+icon+"'></i>";
    }

    function displayProfiles(profiles) {
        var profilesToAdd = "";
        $.each(profiles, function(profilesIndex, profile) {
            profilesToAdd += "<div class='profile col-lg-2 col-md-2 col-sm-12 col-xs-12 container'><a href='"+profile.url+"' target='_blank' title='"+profile.name+"' class='profile-container hint--bottom hint--bounce' data-hint='"+profile.tooltip+"'>"+makeImg(profile.icon, profile.color)+"</a></div>";
        });
        $("#profiles").append(profilesToAdd);
    }

    function displayInfluences(influences) {
    	var influencesToAdd = "";
    	$.each(influences, function(influencesIndex, influence) {
    		if (influence.type == "quote") {
    			influencesToAdd += "<div class='influence container'><p class='content'>\""+influence.text+"\"</p><p class='source'>- "+influence.source+"</p>";
    		} else if (influence.type == "pic") {
    			influencesToAdd += "<div class='influence container'><img src='"+influence.picture+"'/>";
    		}
    		if (influencesIndex != influences.length-1) {
    			influencesToAdd += "<div class='influence-divider'></div></div>"
    		}
    		else {
    			influencesToAdd += "</div";
    		}
    	});
    	$("#influences").append(influencesToAdd);
    }
});
function displayHeader(){
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    $('#header').prepend(formattedRole);
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    $('#header').prepend(formattedName);

    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    $("#topContacts").append(formattedMobile);
    $("#footerContacts").append(formattedMobile);

    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    $("#topContacts").append(formattedEmail);
    $("#footerContacts").append(formattedEmail);

    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github.name).replace("%url%", bio.contacts.github.url);
    $("#topContacts").append(formattedGithub);
    $("#footerContacts").append(formattedGithub);

    var formattedLinkedin = HTMLcontactGeneric.replace("%contact%", "linkedIn").replace("%data%", bio.contacts.linkedIn.name).replace("%url%", bio.contacts.linkedIn.url);
    $("#topContacts").append(formattedLinkedin); 
    $("#footerContacts").append(formattedLinkedin); 

    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter.name).replace("%url%", bio.contacts.twitter.url);
    $("#topContacts").append(formattedTwitter);
    $("#footerContacts").append(formattedTwitter);

    var formattedPic = HTMLbioPic.replace("%data%", bio.bioPic);
    $("#header").append(formattedPic);

    var formattedWelcomeMessage = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").append(formattedWelcomeMessage);

    var formattedSkillsStart = HTMLskillsStart;
    $("#header").append(formattedSkillsStart);

    var skillsHeader = bio.skills.sw.join(", ");
    var formattedSkills = HTMLskills.replace("%data%", skillsHeader); 
    $("#header").append(formattedSkills); 
    skillsHeader = bio.skills.hw.join(", ");
    formattedSkills = HTMLskills.replace("%data%", skillsHeader); 
    $("#header").append(formattedSkills);
    skillsHeader = bio.skills.business.join(", ");
    formattedSkills = HTMLskills.replace("%data%", skillsHeader)  ; 
    $("#header").append(formattedSkills);
} 
function displayWork(){
    for (job in work.jobs){
	$("#workExperience").append(HTMLworkStart);

	var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer).replace("%url%", work.jobs[job].url);
	var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
	var formattedEmployerTitle = formattedEmployer + formattedTitle;
	$(".work-entry:last").append(formattedEmployerTitle);

	var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
	$(".work-entry:last").append(formattedDates);

	var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
	$(".work-entry:last").append(formattedDescription);
    }
}
function displayProjects(){
    for (project in projects.projects){
	$("#projects").append(HTMLprojectStart);

	var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title).replace("%url%", projects.projects[project].url);
	$(".project-entry:last").append(formattedTitle);

	var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
	$(".project-entry:last").append(formattedDates);

	var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
	$(".project-entry:last").append(formattedDescription);

	if (projects.projects[project].images.length > 0){
	    for (image in projects.projects[project].images){
		var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
		$(".project-entry:last").append(formattedImage);
	    }
	}
    }
}
function displayEducation(){
    for (school  in education.schools){
	$("#education").append(HTMLschoolStart);

	var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name).replace("%url%", education.schools[school].url);
	var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
	var formattedNameDegree = formattedName + formattedDegree;
	$(".education-entry:last").append(formattedNameDegree);

	var formattedDate = HTMLschoolDates.replace("%data%", education.schools[school].years);
	$(".education-entry:last").append(formattedDate);

	var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
	$(".education-entry:last").append(formattedLocation);

	var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
	$(".education-entry:last").append(formattedMajor);
    }
}
function displayOnline(){
    $("#education").append(HTMLonlineClasses);
    $("#education").append(HTMLschoolStart);
    for (_class  in online.classes){

	var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", online.classes[_class].title).replace("%url%", online.classes[_class].url);
	var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", online.classes[_class].school);
	var formattedOnlineTitleSchool = formattedOnlineTitle + formattedOnlineSchool;
	$(".education-entry:last").append(formattedOnlineTitleSchool);
	var formattedOnlineDates = HTMLonlineDates.replace("%data%", online.classes[_class].date);
	$(".education-entry:last").append(formattedOnlineDates);
//	var formattedOnlineURL = HTMLonlineURL.replace("%data%", online.classes[_class].url);
//	$(".education-entry:last").append(formattedOnlineURL);
    }
}
function inName(){
    var name = bio.name.trim().split(" ");
    console.log(name);
    name[1] = name[1].toUpperCase();
    name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();

    return name[0] + " " + name[1];
}
$('#main').prepend(internationalizeButton);

//var skills = ['awesomeness' , 'programming' , 'teaching' , 'JS'];
//$('#main').append(skills);
//$('#main').append(skills[0]);

var bio = {
    "name" : "Javier Fraga",
    "age" : 32,
    "role" : "Developer (SW), Scrum Master, Project Manager",
    "contacts" : {
	"location" : "Dallas, TX",
	"mobile" : "+1 415 952 7314",
	"email" : "javier.s.fraga@gmail.com",
	"github" : {
	    "name" : "javalanche",
	    "url" : "https://github.com/javalanche",
	},
	"twitter" : {
	    "name" : "@jsfraga",
	    "url" : "https://twitter.com/jsfraga",
	},
	"linkedIn" : {
	    "name" : "Javier Fraga",
	    "url" : "https://www.linkedin.com/pub/javier-fraga"	
	}
    },
    "welcomeMessage" : "Electrical engineer with Bilingual MBA from top-tier program with international experience and experience with two world-class technology providers",
    "skills" : {
	"sw" : ['Front End Web Design' , 'Data Science' , 'Operating Systems', 'Continuous Integration' , 'Test-Drive Development'  ], 
	"hw" : ['Digital and Analog Circuit Design' , 'Verilog' ], 
	"business" : [ 'Project Management' , 'Scrum Agile' ,'Finance' , 'Accounting' , 'Strategy' ] 
    },
    "bioPic" : "images/javierFragaLinkedInPhoto.jpg"
   // "bioPic" : "images/fry.jpg"
};
console.log(bio.name);
console.log(bio.age);
var newEmail = bio.contacts.email.replace('gmail', 'att');
console.log(bio.contacts.email);
console.log(newEmail);
//var work = {};
//work.position = "Developer / Project Manager";
//work.employer = "AT&T";
//work.years = 0.5;
//$("#main").append(bio.name);
//$("#main").append(work["position"]);
//$("#main").append(education.name);
var work = {
    "jobs" : [
    {
	"employer" : "AT&T",
	"title" : "Developer (SW), Scrum Master, Project Manager",
	"dates" : "2014 - present",
	"location" : "Dallas, TX, USA",
	"description" : "fulltime employee working as an internal consultant in various projects in Responsive Web Design, API realization, and Cloud serving various roles as Project Manager, Scrum Master, and Developer",
	"url" : "https://www.att.com/"
    },
    {
	"employer" : "Intel Corporation",
	"title" : "Component Design Engineer (HW)",
	"dates" : "2005 - 2011",
	"location" : "Folsom, CA, USA",
	"description" : "fulltime employee designing graphics processor units (GPU), specializing in Low-Power Digital Design",
	"url" : "http://www.intel.com/"
    }
	]
}

var education = {
    "schools" : [
	    {
		"name" : "IESE Business School",
		"location" : "Barcelona, Spain",
		"degree" : "Masters",
		"major" : "MBA",
		"years" : "2011-2013",
		"url" : "http://www.iese.edu/"
	    },
	    {
		"name" : "ISE Business School",
		"location" : "São Paulo, Brazil",
		"degree" : "Masters Exchange Program",
		"major" : "MBA Exchange Program",
		"years" : "August-September 2012",
		"url" : "http://www.ise.org.br/"
	    },
	    {
		"name" : "The University of Texas at San Antonio",
		"location" : "San Antonio, Texas",
		"degree" : "Bachelor of Science",
		"major" : "Electrical Engineering",
		"years" : "2003-2005",
		"url" : "http://ece.utsa.edu"
	    }
	]
}

var online = {
    "classes" : [
          {
              "title" : "How to Use Git and GitHub",
              "school" : "Udacity",
              "date" : "2014",
              "url" : "https://www.udacity.com/course/ud775"
          },
          {
              "title" : "Intro to HTML and CSS",
              "school" : "Udacity",
              "date" : "2014",
              "url" : "https://www.udacity.com/course/ud304-nd"
          },
          {
              "title" : "JavaScript Basics",
              "school" : "Udacity",
              "date" : "2014",
              "url" : "https://www.udacity.com/course/ud804-nd"
          },
          {
              "title" : "Intro to jQuery",
              "school" : "Udacity",
              "date" : "2014",
              "url" : "https://www.udacity.com/course/ud245"
          },
          {
              "title" : "Programming Foundations with Python",
              "school" : "Udacity",
              "date" : "2014",
              "url" : "https://www.udacity.com/course/ud036"
          },
          {
              "title" : "Into to Data Science",
              "school" : "Udacity",
              "date" : "2014",
              "url" : "https://www.udacity.com/course/ud359-nd"
          },
          {
              "title" : "Intro to Machine Learning",
              "school" : "Udacity",
              "date" : "2014",
              "url" : "https://www.udacity.com/course/ud120-nd"
          }
      ]
}

var projects = {
    "projects" : [
	{
	    "title" : "Udacity Front End Web Developer Nanodegree Project 1: Mockup to Website",
	    "dates" : 2014,
	    "description" : "developed simple responsive website that display images, description and links to the portfolio projects using bootstrap",
	    "images" : [ "images/p1fullScreen.png", "images/p1halfScreen.png", "images/p1fourthScreena.png", "images/p1fourthScreenb.png" ],
	    "url" : "https://github.com/javalanche/P1MockUpToWebsite"
	}
    ]
}

displayHeader();
displayWork();
displayProjects();
displayEducation();
displayOnline();
$(document).click(function(loc){
	var x = loc.pageX;
	var y = loc.pageY;

	logClicks(x,y);
});
//google map
$("#mapDiv").append(googleMap);

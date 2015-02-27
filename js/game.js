var language;
var category;
var word;
var imageCounter = 1;

$(document).ready(function()
	{
		startDiv=document.getElementById('start');
		prepareDiv=document.getElementById('prepare');
		prepareDiv.style.display= 'none';
		gameDiv=document.getElementById('gameArea');
		gameDiv.style.display= 'none';
		
		$("#image1")
		.css("right","0")
		for (var i = 2; i <= 7 ; i++) {
			$("#image"+i)
			.css("display","none")
			.css("right","0")
		}

		$("#start button")
		.hover(function(){
			$(this)
			.animate({width: "25%", height:"33%"}, 300)
		},function(){
			$(this)
			.animate({width: "23%", height:"30%"}, 300)
		})

		$("#but1")
		.click(function(){
			language = "tr";
			startDiv.style.display="none";
			prepareDiv.style.display= 'block';

			$("body")
			.css("background-color","66FFCC")

		})

		$("#but2")
		.click(function(){
			language ="eng";
			startDiv.style.display="none";
			prepareDiv.style.display= 'block';

			$("body")
			.css("background-color","66FFCC")

			$("#select")
			.html("Please select a category")

			$("#newGame")
			.html("New Game")
			selects = ["Animal", "City", "Goods", "Country", "Plant"]
			for (var i = 1; i < 6; i++) {
				$("#b"+i)
				.html(selects[i-1])			
			};		
		})

		$("#prepare button")
		.hover(function(){
			$(this)
			.animate({width: "11%", height:"9%"}, 100)
		},function(){
			$(this)
			.animate({width: "10%", height:"7%"}, 100)
		})
		.click(function(){
			category = $(this).html();
			if (category=="Hayvan" || category=="Animal") {
				word = animal();
			}else if (category=="Şehir"|| category=="City") {
				word = city();
			}else if (category=="Eşya"|| category=="Goods") {
				word = goods();
			}else if (category=="Ülke"|| category=="Country") {
				word = country();
			}else if (category=="Bitki"|| category=="Plant") {
				word = plant();
			}
			for (var i = 1; i <= word.length; i++) {
				$("#h"+i)
				.css("background-color","blue")
				.css("color","yellow")
				.css("width","80px")
				.css("height","80px")
				.css("font-size","40px")
				.css("font-weight","bold")
				.css("text-align","center")
				.css("padding-top","30px")
				.css("display","block")
			}

			prepareDiv.style.display= 'none';
			inputObject=document.getElementById('letter');
			if (language=="tr") {
				inputObject.placeholder = "Harf giriniz.";
				$("#gameText")
				.html("Bir " + category)
				$("#entered")
				.html("Girilen harfler: ")
			}
			else{
				inputObject.placeholder = "Enter a letter";
				$("#entered")
				.html("Entered letters: ")
				if (category=="Animal") {
					$("#gameText")
					.html("An " + category)
				}
				else{
					$("#gameText")
					.html("A " + category)
				}
			}
			gameArea.style.display = "block";	
		})

		$("#footer img")
		.hover(function(){
			$(this)
			.animate({width: "40px", height:"40px"}, 150)
		},function(){
			$(this)
			.animate({width: "30px", height:"30px"}, 150)
		})
		
		$("#newGame")
		.click(function(){
			gameDiv.style.display= 'none';
			prepareDiv.style.display="block";
		})

		$("#letter")
		.keyup(function(){
			letter = $(this).val();
			document.getElementById('letter').value=""; 
			evaluate(letter);
		})
	
		function evaluate(l){
			flag = false;
			if (l.length>1) {
				if (language=="tr") 
					alert("Lütfen sadece harf giriniz. Ve boş girmeyiniz")
				else
					alert("Please enter a letter");
			}
			if (!isLetter(l)) {
				if (language=="tr") 
					alert("Lütfen sadece harf giriniz. Ve boş girmeyiniz")
				else
					alert("Please enter a letter");
			}
			else{
				for (var i = 1; i <= word.length; i++) {
					if (word[i-1] == l || word[i-1] == l.toUpperCase()) {
						$("#h"+i)
						.html(l);
						flag=true;
					};
				}	
				if (!flag) { //harf yoksa
					var textP = document.getElementById('entered');
					textP.innerHTML = textP.innerHTML + "  " +l;
					$("#image"+imageCounter)
					.css("display","none")
					imageCounter++;
					$("#images")
					.css("text-align","right")
					$("#image"+imageCounter)
					.css("display","inline-block")
					if (imageCounter==7) {
						gameover();
					};
				}else { //harf varsa
					var end = true;
					for (var i = 1; i <= word.length; i++) {
						var divLetter = document.getElementById('h'+i).innerHTML;
						if (divLetter.length==0) {
							end = false;
						}
					}
					if (end) {
						won();
					};
				}
			}
		}
		function won(){
			if (language=="tr") 
				swal("İyi iş!", "Tebrikler", "success")
			else
				swal("Good job!", "Congratulations", "success")
			resetGame();
		}
		function gameover(){
			if (language=="tr") 
				sweetAlert("Oyun Bitti", "Kelime: "+ word, "error");
			else
				sweetAlert("Game Over", "The word: "+ word, "error");
			resetGame();
		}
		function resetGame(){
			imageCounter = 1;
			$("#entered")
			.html("")
			$("#image1")
				.css("display","block")
			for (var i = 2; i <= 7 ; i++) {
				$("#image"+i)
				.css("display","none")
			}
			for (var i = 1; i <= 10; i++) {
				$("#h"+i)
				.html("")
				.css("display","none");
			}
			gameDiv.style.display= 'none';
			prepareDiv.style.display="block";
		}
		function isLetter(char){	//harf girip girmediğini kontrol eden fonksiyon
			if(char=="") return true;
			var letter_pattern = /^[a-züöçğşıİÜĞÇŞÖ\s]+$/i;
			var ok = letter_pattern.test(char); 
		    if (ok)
		        return true;
		    else 
		        return false;
		}
	})
	
function city(){
	if (language=="tr") {
		array = ["İstanbul", "Eskişehir", "Ankara", "Kayseri", "Trabzon", "Bursa", "Çankırı",
		"Sinop", "Antalya", "Mersin", "İzmir", "Muğla", "Aydın", "Hakkari", "Rize", "Balıkesir", 
		"Çanakkale", "Yalova", "Samsun", "Erzincan", "Erzurum", "Karabük", "Bartın", "Denizli",
		"Diyarbakır", "Adana", "Adıyaman", "Afyon", "Malatya", "Manisa"];	
	}
	else{
		array = ["London", "istanbul", "Moscow", "Paris", "Manchester", "Madrid", "Barcelona",
		"Athenian", "Berlin", "Pekin", "Shanghai", "Karachi", "Beijing", "Delhi", "Milano", "Tianjin",
		"Amsterdam", "Mumbai", "Bern", "Rome", "Shenzhen", "Tokyo", "Bangkok", "Singapore", "Yokohama",
		"Santiago", "Liverpool", "Poznan", "Lyon", "Frankfurt"];
	}
	return array[Math.floor(Math.random() * 30)];
}

function animal(){
	if (language=="tr") {
		array = ["penguen", "panda", "kırlangıç", "bukalemun", "zürafa", "papağan", "zebra",
		"ördek", "kartal", "salyangoz", "maymun", "balina", "panter", "kaplan", "geyik", "kanarya", 
		"kertenkele", "karınca", "köpek", "sinek", "pire", "şahin", "eşek", "domuz", "keçi", 
		"akbaba", "koyun", "tilki", "ceylan", "çakal"];
	}
	else{
		array = ["penguin", "panda", "swallow", "chameleon", "giraffe", "parrot", "zebra",
		"duck", "eagle", "snails", "monkey", "whale", "panther", "tiger", "deer", "canary", 
		"lizard", "ant", "dog", "fly", "flea", "hawk", "donkey", "pork", "goat",
		"vulture", "sheep", "fox", "gazelle", "coyote"];
	}
	return array[Math.floor(Math.random() * 30)];
}

function goods(){
	if (language=="tr") {
		array = ["masa", "sandalye", "kanepe", "askı", "vazo" , "bavul", "süpürge", "pantolon",
		"bilgisayar", "halı", "lamba", "şemsiye", "sehpa", "koltuk", "minder", "avize", "tencere"
		, "ranza", "sürahi", "çaydanlık" , "bardak" , "peçete" , "havlu" , "bornoz" ,"perde"
		, "kaşık", "çatal", "bıçak", "kumanda", "fırın"];
	}
	else{
		array = ["table", "chair", "couch", "hanger", "vase", "suitcase", "broom", "pants"
		, "computer", "carpet", "lamp", "umbrella", "stand", "seat", "cushion", "chandelier", "pot",
		"bunk", "pitcher", "teapot", "cup", "napkin", "towel", "bathrobe", "curtain",
		"spoon", "fork", "knife", "command", "oven"];
	}
	return array[Math.floor(Math.random() * 30)];
}

function country(){
	if (language=="tr") {
		array = ["Türkiye", "Amerika", "İngiltere", "İspanya", "Fransa", "Almanya", "İsveç", "Arjantin",
			"Brezilya", "Rusya", "Litvanya", "Yunanistan", "Şili", "Portekiz", "Danimarka", "Macaristan", 
			"Belçika", "Avusturya", "Venezuela", "Irak", "Gana", "Gürcistan", "Paraguay", 
			"Japonya", "Hollanda", "Azerbeycan", "Pakistan", "Suriye", "Romanya", "Moldova"];
	}
	else{
		array =["Turkey", "America", "England", "Spain", "France", "Germany", "Sweden", "Argentina", 
			"Brasil", "Russia", "Lithuania", "Greece", "Chile", "Portugal", "Denmark", "Hungary",
			"Belgium", "Austria", "Venezuela", "Iraq", "Ghana", "Georgia", "Paraguay",
			"Japan", "Kenya", "Azerbaijan", "Pakistan", "Syria", "Romania", "Moldova"];
	}	
	return array[Math.floor(Math.random() * 30)];
}

function plant(){
	if (language=="tr") {
		array = ["nane", "kekik", "papatya", "roka", "maydanoz", "marul", "lale", "kardelen", 
			"dereotu", "fesleğen", "ıspanak", "pırasa", "lahana", "karnıbahar", "brokoli", 
			"domates", "biber", "patlıcan", "avokado", "ananas", "armut", "portakal", "greyfurt",
			 "kestane", "kivi", "kiraz", "karpuz", "şalgam", "haşhaş", "kereviz"];
	}
	else{
		array = ["mint", "thyme", "daisy", "arugula", "parsley", "lettuce", "tulip", "snowdrop",
		"dill", "basil", "spinach", "leek", "cabbage", "cauliflower", "broccoli",
		"tomatoes", "pepper", "aubergine", "avocado", "pineapple", "pear", "orange", "grapefruit",
		"chestnut", "kiwi", "cherry", "watermelon", "turnip", "poppy", "celery"];
	}
	return array[Math.floor(Math.random() * 30)];
}
	
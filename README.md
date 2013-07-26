Beispiel für einen Test mit Jasmine
===================================

Dieses Projekt ist ein Beispiel für einen Test mit dem BDD-Framework Jasmine.

Das gängige Framework, um Unit-Tests mit JavaScript zu schreiben, war [JsUnit](http://www.jsunit.net/ "Homepage von JsUnit") von Edward Hieatt. Dieses ist nicht zu verwechseln mit einem weiteren Test-Framework, das jsUnit (mit einem kleinen j) heißt, aber von Jörg Schaible entwickelt wurde. In diesem Artikel ist das Test-Framework mit dem großen J gemeint.

JsUnit ist inzwischen fast zehn Jahre alt. Sein größter Nachteil ist, dass es nur im Web-Browser läuft. Unit-Tests finden bei JsUnit in einem Testkontext statt, das mit einer HTML-Seite die Voraussetzungen für die Durchführung von Unit-Tests herstellt. Da JavaScript-Module inzwischen auch in Kontexten außerhalb des Browsers (z.B. mit Node.js oder auf dem Smartphone für Apps) eingesetzt werden, wurde die Arbeit an JsUnit eingestellt und sein Nachfolger, das Framework Jasmine, eingeführt.

[![](http://blog.holisticon.de/wp-content/uploads/2012/01/jasmine_logo.png "Jasmine Logo")](http://blog.holisticon.de/wp-content/uploads/2012/01/jasmine_logo.png)[Jasmine](http://pivotal.github.com/jasmine/ "Jasmine auf GitHub") hat keine Abhängigkeiten zum Webbrowser als Ablaufumgebung. Daher kann es nicht nur im Browser (z.B. in einer statischen Webseite als Testumgebung), sondern auch außerhalb, z.B. auf einem Continuous Integration-Server oder einer serverseitigen Laufzeitumgebung wie Node.js verwendet werden. Im folgenden Beispiel möchte ich aber der Einfachheit halber den Browser als Laufzeitumgebung verwenden.

Bei Jasmine handelt es sich um ein BDD-Framework. Es bietet also nicht nur klassische Unit-Tests, sondern folgt den Paradigmen von "[Specification by Example](http://en.wikipedia.org/wiki/Behavior_Driven_Development "BDD in der Wikipedia")".

Um Jasmine zu verwenden, muss man es zunächst [herunterladen](http://pivotal.github.com/jasmine/download.html "Download-Link für Jasmine") und auspacken. Im Wurzel-Verzeichnis befindet sich ein HTML-Dokument „SpecRunner.html“. Dies ist ein einfaches HTML-Dokument, das man im Browser öffnen kann, um Jasmine-Tests im Browser durchführen zu lassen. In diesen Spec-Runner bindet man nun sowohl seine zu testenden Source-Dateien als auch Spec-Dateien ein.


	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	  "http://www.w3.org/TR/html4/loose.dtd">
	<html>
	<head>
	  <title>Jasmine Spec Runner</title>
	  <link rel="shortcut icon" type="image/png" href="lib/jasmine-1.1.0/jasmine_favicon.png">
	  <link rel="stylesheet" type="text/css" href="lib/jasmine-1.1.0/jasmine.css">
	  <script type="text/javascript" src="lib/jasmine-1.1.0/jasmine.js"></script>
	  <script type="text/javascript" src="lib/jasmine-1.1.0/jasmine-html.js"></script>
	  <!-- include source files here... -->
	  <script src="src/bar.js"></script>
	  <!-- include spec files here... -->
	  <script src="spec/barSpec.js"></script>
	  <script type="text/javascript">
	    // Jasmine delivered Code
	  </script>
	</head>
	<body>
	</body>
	</html>

Die Source-Datei "bar.js" implementiert dabei die Bar, die bereits im [vorherigen Blogbeitrag](http://blog.holisticon.de/2011/10/behavioural-driven-development-mit-jasmine-und-javascript-teil-1/ "Behavioural Driven Development mit Jasmine und JavaScript (Teil 1)") beschrieben wurde.

	var Drink = function() {
	    this.ingredients = undefined;
	}

	var WodkaLemon = function() {
	    this.ingredients = "Wodka and Lemon";
	}
	WodkaLemon.prototype = new Drink();

	var CampariOrange = function() {
	    this.ingredients = "Campari and Orange";
	};
	CampariOrange.prototype = new Drink();

	var CubaLibre = function() {
	    this.ingredients = "Cola and Rum";
	};
	CubaLibre.prototype = new Drink();

	var menu = {
	    wodkaLemon: {
	        price: 4.50,
	        size: '4cl',
	        name: "Wodka Lemon"
	    },
	    campariOrange: {
	        price: 4.50,
	        size: '4cl',
	        name: "Campari Orange"
	    },
	    cubaLibre: {
	        price: 5.00,
	        size: '4cl',
	        name: "Cuba Libre"
	    }
	};

	var Order = function Order(){
	    this.items = [];
	}

	Order.prototype.add = function(drink) {
	    this.items.push(drink);
	}

	var barkeeper = {
	    accept : function(order) {
	        throw "not implemented yet";
	    }
	}

Diese Bar möchten wir jetzt mit Jasmine testen.

Die erste Spec ist folgende:
`
In a given Order
you should find an added Wodka Lemon
`

Diese Spec implementiert man in Jasmine ganz einfach:

	describe("In a given Order", function() {
	  it("you should find an added Wodka Lemon", function() {
	    var order = new Order();
	    order.add(menu.wodkaLemon);
	    expect(order.items).toContain(menu.wodkaLemon);
	  });
	});

Zunächst wird die Bedingung für die Spec geschaffen. Es wird eine neue Bestellung (Order) erstellt und dieser Bestellung wird ein Wodka Lemon hinzugefügt. Anschließend wird die Erwartung an die Bestellung mit der Expect-Methode überprüft: "Die Order soll einen Wodka Lemon enthalten."

Wenn man die Spec ausführt, dann wird der Specrunner grün und gibt als erfolgreich verifizierte Spec den oben angegebenen Text aus:
`
In a given Order
you should find an added Wodka Lemon
`

Als zweite Spec möchten wir nicht nur testen, dass ein der Bestellung hinzugefügter Wodka Lemon sich auch in der Bestellung findet, sondern dass der Barkeeper diesen auch für uns mixt. Die passende Spec dazu lautet:
`
A Barkeeper
should return an ordered Wodka Lemon
`

Wenn wir diese Spec implementieren möchten, haben wir im Moment aber noch ein Problem. Der Barkeeper ist in unserem System (noch) gar nicht implementiert. Dies könnte daran liegen, dass der Barkeeper ein Drittsystem ist oder dass wir in unserer Bar noch gar keinen Barkeeper eingestellt haben:

	var barkeeper = {
	    accept : function(order) {
	        throw "not implemented yet";
	    }
	}

Daher müssen wir den Barkeeper wegmocken. Dafür bietet Jasmine sogenannte Spione (Spies). Spione können Funktionen, die sie beobachten, komplett ersetzen. Dazu auch hier ein Beispiel:

	describe("Barkeeper", function() {
	   it("should return an ordered Wodka Lemon", function() {
	    var order = new Order();
	    order.add(menu.wodkaLemon);
	    spyOn(barkeeper, "accept").andReturn([new WodkaLemon()]);
	    var drinks = barkeeper.accept(order);
	    expect(drinks).toContain(new WodkaLemon());
	   })
	});

Über die spyOn-Funktion wird die Accept-Methode des Barkeepers ersetzt.

Jasmine bietet noch sehr viel mehr Möglichkeiten. So lassen sich Specs in Suiten gruppieren, die sich wiederum ineinander schachteln lassen. Es gibt Methoden, die Testobjekte für eine ganze Suite vorbereiten und sie anschließend auch wieder aufräumen.

Wie bereits angemerkt, kann man Jasmine zum Testen von Node-Anwendungen, die nicht im Browser, sondern auf dem Server laufen, verwenden. Dazu gibt es das Modul „[jasmine-node](https://github.com/mhevery/jasmine-node "Jasmine Node.js-Modul")“.

Verteilte Tests mit Googles [JsTestDriver](http://code.google.com/p/js-test-driver "Google JsTestDriver") lassen sich auch mit Jasmine über einen [Adapter](https://github.com/ibolmo/jasmine-jstd-adapter "Jasmine JSTestDriver Adapter") ausführen.

Jasmine ist nicht das einzige BDD-Framework für JavaScript. Zurzeit wird beispielsweise Cucumber, das De-Facto-Framework für BDD, hin zu JavaScript [portiert](https://github.com/cucumber/cucumber-js "CucumberJS").

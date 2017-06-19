var Coca = {};

(function (cartola) {

	var numRodadas = 38;

	//Nome do time com os numeros das rodadas que pagou
	var timesPagantes = {
		Pró-Palestra: [],
		Traga Café: [],
		Boston Colossenses: [7, 8],
		I.B.A Futebol Clube: [5, 10],
		Guardatodas Esporte Clube: [3, 4, 9],
		Evolust_FC: [6, 11],
		moisesfcfernando: [1, 2],
		igor victorr: [3, 5, 9]
		Enterdi Melão F.C: []
	};

	function montaMural() {
		var linhaNormal = '<td></td>';
		var linhaCoca = '<td style="text-align: center"><img src="img/coca.png" style="width: 10px;"></td>';

		var pagantes = '';
		for (var k in timesPagantes) {
			pagantes += '<tr><td>' + getNameTime(k) + '</td>'
			for (var i = 1; i <= numRodadas; i++) {
				var rodadas = timesPagantes[k];
				var linhapagou = false;
				for (var r = 0; r < rodadas.length; r++) {
					if (rodadas[r] == i) {
						linhapagou = true;
						pagantes += linhaCoca;
					}
				}
				if (!linhapagou) {
					pagantes += linhaNormal;
				}
			}
			pagantes += '</tr>';
		}
		return pagantes;
	}

	function imagensMural() {
		var larguraPagina = $('#mural').width();
		var qtdeImagens = 10;
		var limite = false;
		for (var i = 0; i < qtdeImagens; i++) {
			if (limite) {
				break
			}
			$.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=shame', function (data) {
				var larguraCorrente = $('#mural-vergonha-zoeira').width();
				if (larguraPagina < larguraCorrente) {
					limite = true
				}
				$('#mural-vergonha-zoeira').append('<img src="' + data.data.image_url + '" style="height: 100px;">');
			});
		}
	}

	function getNameTime(time) {
		switch (time) {
			case "Pró-Palestra":
				return decodeURIComponent(escape("Pró-Palestra"));
				break;
			case "Enter di Melão F.C":
				return decodeURIComponent(escape("Enter di Melão F.C"));
				break;
			case "Traga Café":
				return decodeURIComponent(escape("Traga Café"));
				break;
			case "Boston Colossenses":
				return decodeURIComponent(escape("Boston Colossenses"));
				break;
			case "I.B.A Futebol Clube":
				return decodeURIComponent(escape("I.B.A Futebol Clube"));
				break;
			case "Guardatodas Esporte Clube":
				return decodeURIComponent(escape("Guardatodas Esporte Clube"));
				break;
			case "Evolust_FC":
				return decodeURIComponent(escape("Evolust_FC"));
				break;
			case "moisesfcfernando":
				return decodeURIComponent(escape("moisesfcfernando"));
				break;
			case "igor victorr";
				return decodeURIComponent(escape("igor victorr"));
		}
	}

	cartola.initialize = function () {
		$(document).ready(function () {
			$('#mural-vergonha > tbody').append(montaMural());

			$('#mural-vergonha').show();
			$('#spinner').hide();


			//imagensMural();
		});
	}
}(Coca));

Coca.initialize();

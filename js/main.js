var Narnia = {};

(function (cartola) {
console.log('ok');
    var qtdeTimesProcessados = 0;
    var finalizouProcessamento = false;

    var times = ['traga-cafe', 'pro-palestra', 'enter-di-melao-f-c', 'evolust-fc', 'JL_guimaraes', 'boston-colossenses', 'melanfutclube-fc', 'i-b-a-futebol-clube', 'igor-victorr', 'moisesfcfernando', 'yes-fcclube','guardatodas-esporte-clube'];
    var qtdeTimesProcessados = 0;
    var atletas_pontuados = [];
    var total_pontos = 0.00;

    function get_pontuacao_rodada(nome_time, handleData) {
        $.getJSON("https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/time/slug/" + nome_time, function(data){
            handleData(data);
        });
    }
 
       function get_pontuacao_atletas() {
        $.getJSON("https://cors-anywhere.herokuapp.com/https://api.cartolafc.globo.com/atletas/pontuados").complete(function(data) {
            if (data && data.responseJSON && data.responseJSON.atletas) {
                atletas_pontuados = data.responseJSON.atletas;
            }
            for (var i = 0; i < times.length; i++) {
                qtdeTimesProcessados++;
                get_pontuacao_rodada(times[i], montaTime);
            }
        });

    }
  function montaTime(data) {
        var imgEscudo = data.time.url_escudo_png;
        var imgPerfil = data.time.foto_perfil;

        var nome = data.time.nome;
        var nome_cartola = data.time.nome_cartola;
        var pontos = data.pontos.toFixed(2);
        var patrimonio = data.patrimonio;

        var atletas_html = createAtletasTimeHtml(data.atletas, data.posicoes);
        var parcial_rodada = total_pontos.toFixed(2);
        var slug_time = data.time.slug;
        var pontos_ordenacao = (total_pontos == 0.00 && !mercadoFechado) ? pontos : total_pontos;
        var pro = data.time.assinante == true ? '<img src="https://cartolafc.globo.com/dist/0.6.9/img/selo-cartoleiro-pro.svg" class="cartola-pro">' : '';

        $('#narnia-table').append('<tr class="' + slug_time + '" data-row="' + slug_time + '" data-total="' + pontos_ordenacao + '"><td colspan="1"><div class="col-xs-12">' + pro + '<img src="' + imgEscudo + '" style="width: 50px;"><img style="width: 30px;position: absolute;left: 45px;top: 25px;" src="' + imgPerfil + '" class="img-circle"></div></td><td colspan="3"><h3>' + nome + '</h3><p>' + nome_cartola + '</p></td><td colspan="2"><p class="ponto" style="text-align: center">' + pontos + '</p></td><td colspan="2" style="text-align: center"><p class="pontoparcial">' + parcial_rodada + '</p></td><td colspan="2" style="text-align: center;"><p class="patrimonio">' + patrimonio + '</p></td><td colspan="2" style="text-align: center" class="coca"></td></tr>');
        if (atletas_html != '')
            $('#narnia-table').append('<tr class="' + slug_time + '"	>' + atletas_html + '</tr>');

        total_pontos = 0.00;
    }

    function createAtletasTimeHtml(atletas_time, posicoes) {
        var atletas = '';
        for (var i = 0; i < atletas_time.length; i++) {
            atletas += getTemplateAtleta(atletas_time[i], posicoes);
        }
        return atletas;
    }

    function getTemplateAtleta(data) {
        var atletaPontuado = atletas_pontuados[data.atleta_id];
        var pontuacao = 0.00;

        if (typeof atletaPontuado !== 'undefined') {
            pontuacao = atletaPontuado.pontuacao;
            total_pontos += pontuacao;
        }

        Var foto =  dados . Foto ;
        Se (foto ==  null ) foto =  ' ' ;
        Var posicao = posicoes [ dados . Posicao_id ]. Abreviacao ;

        Retornar  ' <td> <div class = "col-xs-12"> '  +
            ' <P style = "font-size: small"> '  +  data . Apelido  +  ' ( '  + posicao +  ' ) '  +  ' </ p> '  +
            ' <Img style = "width: 40px;" src = " '  +  foto . substituir ( " FORMATO " , " 140x140 " ) +  ' "> '  +
            ' <P> '  + pontuacao +  ' <p> '  +
            ' </ Div> </ td> ' ;
    }

    Função  quem_paga () {
        Var menorObj =  $ (classeOrdenação). Primeiro ();
        Var menorValor =  parseFloat ( $ (classeOrdenação). Primeiro (). Text ());
        $ (ClasseOrdenação). Cada ( função ( i , obj ) {
            Se ( parseFloat ( $ (obj). Text ()) < menorValor) {
                MenorObj = obj;
                MenorValor =  parseFloat ( $ (obj). Text ());
            }
        })

        Var parent =  $ (menorObj). Pai (). Pai ();
        Pai . AddClass ( ' paga-coca ' );
        $ . Get ( ' http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=coca-cola ' , função ( dados ) {
            Pai . encontrar ( ' .coca ' ). Anexar ( ' <img src = " '  +  dados . Dados . Image_url  +  ' " style = "height: 100px;"> ' )
        })
    }

    Função  mito () {
        Var theLegend =  $ ( ' # narnia-table> tbody> tr ' ) [ 0 ];
        $ (TheLegend). AddClass ( ' mito ' );
        $ . Get ( ' http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=win ' , função ( dados ) {
            $ (TheLegend). encontrar ( ' .coca ' ). Anexar ( ' <img src = " '  +  dados . Dados . Image_url  +  ' " style = "height: 100px;"> ' )
        })
    }

    Função  ordena () {
        Var rows =  $ ( ' # narnia-table> tbody> tr ' );
        Var data_row = [], data_total = [], data_row_attr =  ' ' , data_total_attr =  ' ' ;
        para ( var i =  0 ; i <  fileiras . comprimento ; i ++ ) {
            Data_row_attr =  $ (linhas [i]). Dados ( ' linha ' );
            Data_total_attr =  $ (linhas [i]). Dados ( ' total ' );

            Se ( typeof data_row_attr ! ==  ' indefinido ' ) data_row . empurrão (data_row_attr);
            Se ( typeof data_total_attr ! ==  ' indefinido ' ) data_total . Push (data_total_attr);
        }
        Var arrr = [];
        Para ( var h =  0 ; h <  data_row . Length ; h ++ ) {
            Arrr [h +  ' - '  + data_total [h]] = data_row [h];
        }

        Var ordenado = [];
        Data_total =  data_total . Classificar ( função ( a , b ) {
            Retornar b - a;
        })
        Para ( var t =  0 ; t <  data_total . Length ; t ++ ) {
            Para ( var x =  0 ; x <  data_total . Length ; x ++ ) {
                Var arrr2 = arrr [x +  ' - '  + data_total [t]];
                Se (( typeof arrr2 ! ==  ' indefinido ' ) && ( ordenado . IndexOf (arrr2) ==  - 1 ))
                    Ordenado . Empurrar (arrr2);
            }
        }

        Var row_o =  ' ' ;
        $ (Ordenado). Cada ( função ( i , obj ) {
            Row_o =  $ ( " # narnia-table> tbody>. "  + Obj);
            $ ( ' # Narnia-table> tbody ' ). Anexar (row_o);
        })
    }

    Cartola . Inicializar  =  função () {
        $ ( Documento ). Pronto ( function () {
            Get_status_mercado ();
            Get_pontuacao_atletas ();
        }). AjaxStop ( function () {
            Se ( ! Processado &&  times . Length  == timesProcessados) {
                processado =  verdadeiro ;
                Quem_paga ();
                Ordena ();
                Mito ();
                $ ( ' # Narnia-table ' ). Show ();
                $ ( ' #spinner ' ). Hide ();
            }
        })
    }
}(Nárnia));


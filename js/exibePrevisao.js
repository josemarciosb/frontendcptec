$(function () {
    $("#enviarId").click(function () {
        $("#resultado").html("");

        var idcity = document.getElementById("idcity").value;

        $.ajax({
            type: "GET",
            url: "http://servicos.cptec.inpe.br/XML/cidade/7dias/" + idcity + "/previsao.xml",
            dataType: "xml",
            success: function (data) {
                var resultado;
               
                
                $(data).find("cidade").each(function () {
                    var nameCity = $(this).find("nome").text() + ' - ' + $(this).find("uf").text();
                    document.getElementById("nameCity").innerHTML = nameCity;
                });

                $(data).find("cidade").find("previsao").each(function () {

                    resultado = '<strong>Dia: </strong>' + $(this).find("dia").text() + '<br />';
                    resultado = resultado + '<strong>Temp. max: </strong>' + $(this).find("maxima").text() + '<br />';
                    resultado = resultado + '<strong>Temp. min: </strong>' + $(this).find("minima").text() + '<br />';
                    resultado = resultado + '<strong>IUV: </strong>' + $(this).find("iuv").text() + '<br /><br />';

                    $("#resultado").append(resultado);


                });
            }
        });
    });
});

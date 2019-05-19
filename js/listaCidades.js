$(document).ready(function () {
    function parse(document) {
        var texto = [];
        var ids = [];

        $(document).find("cidades").find("cidade").each(function () {

            texto.push($(this).find('nome').text() + ',' + $(this).find('uf').text());
            ids.push($(this).find('id').text());

            $("input#city").autocomplete({
                source: texto,
                minLength: 1,
                select: function (event, ui) {
                    var pos = texto.indexOf(ui.item.value);
                    var id = ids[pos];

                    $("#idcity").val(id);

                }
            });


        });
    }
    $('#city').keypress(function () {
        var city = $(this).val();

        city = removeAcentos(city);
        
        $.ajax({
            url: 'http://servicos.cptec.inpe.br/XML/listaCidades?city=' + city,
            dataType: "xml",
            success: parse,
            error: function () {
                alert("Erro.");
            }
        });
    });

    // Remove acentos de strings
    function removeAcentos(s) {
        return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }


})